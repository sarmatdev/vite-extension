import {
  THIRDPARTY_GET_ACCOUNT_REQUEST_RESPONSE,
  THIRDPARTY_SIGN_REQUEST_RESPONSE,
  HARMONY_RESPONSE_TYPE,
  THIRDPARTY_PERSONAL_SIGN_REQUEST_RESPONSE,
  FROM_BACK_TO_POPUP,
  CLOSE_WINDOW
} from '../types'
import * as storage from './storage'

export const msgToContentScript = (type, payload) => ({
  type: HARMONY_RESPONSE_TYPE,
  message: {
    type,
    payload
  }
})

export const getHostNameFromTab = (tab) => {
  const url = new URL(tab.url)
  const hostname = url.hostname

  // fail rather than return an empty response
  if (!hostname) {
    throw new Error('cannot get hostname from tab ' + JSON.stringify(tab))
  }

  return hostname
}

class WalletAPI {
  params: any
  txnInfo: any
  signData: any
  type: any
  sender: any
  host: any
  activeSession: any
  constructor() {
    this.params = null
    this.txnInfo = null
    this.signData = null
    this.type = null
    this.sender = null
    this.host = ''
    this.activeSession = null
  }
  getState = () => {
    return {
      type: this.type,
      host: this.host,
      txnInfo: this.txnInfo,
      signData: this.signData,
      params: this.params,
      session: this.activeSession
    }
  }
  sendMessageToInjectScript = (type, payload) => {
    if (!payload) {
      payload = {}
    }

    payload.sender = this.sender
    chrome.tabs.sendMessage(this.sender, msgToContentScript(type, payload))
  }
  openPopup = async (route, width, height) => {
    chrome.windows.getCurrent({ windowTypes: ['normal'] }, function (window) {
      chrome.windows.create({
        url: `chrome-extension://${chrome.runtime.id}/index.html#/${route}`,
        type: 'popup',
        left: screen.width / 2 - width / 2 + window.left,
        top: screen.height / 2 - height / 2 + window.top,
        width: width,
        height: height
      })
    })
  }
  getAccount = async (sender) => {
    try {
      const store = this.getVuexStore()
      this.sender = sender.tab.id
      this.host = getHostNameFromTab(sender.tab)
      const session = await this.getSession(this.host)
      if (session.exist) {
        const account = store.wallets.active
        if (!account) {
          await this.removeSession(this.host)
        } else {
          this.sendMessageToInjectScript(
            THIRDPARTY_GET_ACCOUNT_REQUEST_RESPONSE,
            { name: account.name, address: account.address }
          )
          return
        }
      }
      this.openPopup('login', 400, 640)
    } catch (err) {
      this.sendMessageToInjectScript(THIRDPARTY_GET_ACCOUNT_REQUEST_RESPONSE, {
        rejected: true,
        message: JSON.stringify(err)
      })
    }
  }
  sign = async (sender, payload) => {
    try {
      const store = this.getVuexStore()
      this.sender = sender.tab.id
      this.host = getHostNameFromTab(sender.tab)
      this.signData = payload
      const session = await this.getSession(this.host)
      if (session.exist) {
        const account = store.wallets.active
        if (!account) {
          this.sendMessageToInjectScript(
            THIRDPARTY_PERSONAL_SIGN_REQUEST_RESPONSE,
            {
              rejected: true,
              message:
                'The account is found in the session but not in the extension. Please use forgetIdentity first to sign out'
            }
          )
          return
        }
        this.activeSession = session
        this.openPopup('personal-sign', 400, 640)
      } else {
        this.sendMessageToInjectScript(
          THIRDPARTY_PERSONAL_SIGN_REQUEST_RESPONSE,
          {
            rejected: true,
            message:
              'The account is not selected. Please use getAccount first to sign the transaction'
          }
        )
      }
    } catch (error) {
      this.sendMessageToInjectScript(
        THIRDPARTY_PERSONAL_SIGN_REQUEST_RESPONSE,
        {
          rejected: true,
          message: JSON.stringify(error)
        }
      )
    }
  }
  removeSession = async (host) => {
    const sessionList = await this.getHostSessions()
    const existIndex = sessionList.findIndex((elem) => elem.host === host)
    if (existIndex >= 0) {
      sessionList.splice(existIndex, 1)
      await storage.saveValue({
        session: sessionList
      })
    }
  }
  getVuexStore = () => {
    try {
      if (!window.localStorage.vuex) throw new Error('Vuex Store is not found')
      const vuex = JSON.parse(window.localStorage.vuex)
      if (!vuex || !vuex.wallets)
        throw new Error('Wallet is not defined in the vuex store')
      return vuex
    } catch (err) {
      console.error(err)
    }
  }
  getHostSessions = async () => {
    const currentSession = await storage.getValue('session')
    let sessionList = []
    // @ts-ignore
    if (currentSession && Array.isArray(currentSession.session))
      // @ts-ignore
      sessionList = currentSession.session
    return sessionList
  }
  getSession = async (hostname) => {
    const sessionList = await this.getHostSessions()
    const existIndex = sessionList.findIndex((elem) => elem.host === hostname)
    if (existIndex >= 0) {
      return {
        exist: true,
        ...sessionList[existIndex]
      }
    }
    return {
      exist: false
    }
  }
  /*
  humor grunt praise industry deal bracket tide jeans differ vanish thunder actor
  */
  onGetSignatureKeySuccess = (payload) => {
    this.sendMessageToInjectScript(THIRDPARTY_SIGN_REQUEST_RESPONSE, payload)
    this.closeWindow()
  }
  onGetSignatureKeyReject = ({ message }) => {
    this.sendMessageToInjectScript(THIRDPARTY_SIGN_REQUEST_RESPONSE, {
      rejected: true,
      message
    })
    this.closeWindow()
  }
  onPersonalSignSuccess = async (payload) => {
    this.sendMessageToInjectScript(
      THIRDPARTY_PERSONAL_SIGN_REQUEST_RESPONSE,
      payload
    )
    this.closeWindow()
  }
  onPersonalSignReject = async ({ message }) => {
    this.sendMessageToInjectScript(THIRDPARTY_PERSONAL_SIGN_REQUEST_RESPONSE, {
      rejected: true,
      message
    })
    this.closeWindow()
  }
  onGetAccountSuccess = async (payload) => {
    const sessionList = await this.getHostSessions()
    const newHost = {
      host: this.host,
      account: payload
    }
    sessionList.push(newHost)
    await storage.saveValue({
      session: sessionList
    })
    this.sendMessageToInjectScript(
      THIRDPARTY_GET_ACCOUNT_REQUEST_RESPONSE,
      payload
    )
    this.closeWindow()
  }
  onGetAccountReject = ({ message }) => {
    this.sendMessageToInjectScript(THIRDPARTY_GET_ACCOUNT_REQUEST_RESPONSE, {
      rejected: true,
      message
    })
    this.closeWindow()
  }
  closeWindow = () => {
    chrome.runtime.sendMessage({
      type: FROM_BACK_TO_POPUP,
      action: CLOSE_WINDOW
    })
  }
}

const walletAPI = new WalletAPI()

export default walletAPI
