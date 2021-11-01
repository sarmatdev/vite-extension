import {
  HARMONY_REQUEST_TYPE,
  HARMONY_RESPONSE_TYPE,
  THIRDPARTY_FORGET_IDENTITY_REQUEST,
  THIRDPARTY_GET_ACCOUNT_REQUEST,
  THIRDPARTY_SIGN_REQUEST,
  THIRDPARTY_SIGNATURE_KEY_SUCCESS_RESPONSE,
  THIRDPARTY_SIGNATURE_KEY_REJECT_RESPONSE,
  THIRDPARTY_PERSONAL_SIGN_SUCCESS_RESPONSE,
  THIRDPARTY_PERSONAL_SIGN_REJECT_RESPONSE,
  GET_WALLET_SERVICE_STATE,
  THIRDPARTY_SIGN_CONNECT,
  THIRDPARTY_PERSONAL_SIGN_CONNECT,
  THIRDPARTY_PERSONAL_SIGN_REQUEST,
  THIRDPARTY_GET_ACCOUNT_SUCCESS_RESPONSE,
  THIRDPARTY_GET_ACCOUNT_CONNECT,
  APP_CONNECT,
  THIRDPARTY_GET_ACCOUNT_REJECT_RESPONSE,
  GET_TAB_ID_INNER_EVENT_REQUEST,
  POPUP_CLOSED
} from '../types'
import walletAPI from '@/services/walletAPI'

function externalMessageListener(message, sender, sendResponse) {
  console.log('externalMessageListener')
  const { messageSource, payload } = message

  if (!messageSource || !payload || messageSource !== HARMONY_REQUEST_TYPE) {
    return false
  }
  const { type } = payload
  console.log('type')
  switch (type) {
    case THIRDPARTY_GET_ACCOUNT_REQUEST:
      walletAPI.getAccount(sender)
      break
    default:
      console.warn('Unknown message from content script - ', message)
  }

  sendResponse()
  return true
}

// Listen messages from extension (e.g popup)
function internalMessageListener(message, sender, sendResponse) {
  const { messageSource, action, payload } = message
  if (messageSource && messageSource !== HARMONY_RESPONSE_TYPE) {
    return false
  }
  switch (action) {
    case THIRDPARTY_GET_ACCOUNT_SUCCESS_RESPONSE:
      console.log('onGetAccountSuccess')
      break
    case THIRDPARTY_GET_ACCOUNT_REJECT_RESPONSE:
      console.log('onGetAccountReject')
      break
    default:
      console.log('Unknown internal action received - ', action)
  }
  sendResponse()
  return true
}

//disconnect listener when the popup is close
function onConnectListener(externalPort) {
  const name = externalPort.name
  externalPort.onDisconnect.addListener(async function () {
    console.log('onConnectListener')
  })
}

export function getTabId({ action }, sender, sendResponse) {
  if (action !== GET_TAB_ID_INNER_EVENT_REQUEST) {
    return false
  }

  sendResponse(sender.tab.id)
  return true
}

export function setupExtensionMessageListeners() {
  chrome.runtime.onMessage.addListener(getTabId)
  chrome.runtime.onMessage.addListener(externalMessageListener)
  chrome.runtime.onMessage.addListener(internalMessageListener)
  chrome.runtime.onConnect.addListener(onConnectListener)
}
