/* eslint-disable no-async-promise-executor */
import { sendAsyncMessageToContentScript } from './messageHandler'
import {
  THIRDPARTY_GET_ACCOUNT_REQUEST,
  THIRDPARTY_PERSONAL_SIGN_REQUEST
} from '../types'

class WalletProvider {
  isVitewallet: boolean
  buidl: string
  constructor() {
    this.isVitewallet = true
    this.buidl = 'buidl'
  }

  getAccount() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await sendAsyncMessageToContentScript({
          type: THIRDPARTY_GET_ACCOUNT_REQUEST
        })
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  }
  sign(msgData: string | Uint8Array) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await sendAsyncMessageToContentScript({
          type: THIRDPARTY_PERSONAL_SIGN_REQUEST,
          payload: {
            msgData
          }
        })
        if (res.rejected) {
          if (res.message) return reject(res.message)
          return reject('User rejected the personal sign request')
        }
        if (res.data) {
          resolve(res.data)
        } else reject('Sign failed. Something went wrong')
      } catch (err) {
        reject(err)
      }
    })
  }
}

export const walletProvider = new WalletProvider()
