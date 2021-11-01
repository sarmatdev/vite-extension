import { HARMONY_REQUEST_TYPE, HARMONY_RESPONSE_TYPE } from '../types'
import {
  FACTORYTYPE,
  ONEWALLET_SERVICE_EVENT_REQUEST,
  ONEWALLET_SERVICE_EVENT_RESPONSE,
  POPUP_CLOSED
} from '../types'

const unWrapMessageFromContentScript = (data: any) => data.message
const filterExtensionMessage = (callback: any) => (message: any) => {
  if (message === undefined) return
  const { detail } = message
  if (!detail) return
  if (detail.type && detail.type === HARMONY_RESPONSE_TYPE) {
    callback(detail)
  }
}

const waitForResponse = (type: any) => {
  return new Promise((resolve) => {
    const handler = filterExtensionMessage((data: any) => {
      const message = unWrapMessageFromContentScript(data)
      if (message.type === type) {
        resolve(message.payload)
      }
      window.removeEventListener(ONEWALLET_SERVICE_EVENT_RESPONSE, handler)
    })
    window.addEventListener(ONEWALLET_SERVICE_EVENT_RESPONSE, handler)
  })
}

const sendMessageToContentScript = (payload: any) => {
  window.dispatchEvent(
    new CustomEvent(ONEWALLET_SERVICE_EVENT_REQUEST, {
      detail: {
        type: HARMONY_REQUEST_TYPE,
        payload
      }
    })
  )
}

export const sendAsyncMessageToContentScript = async (payload: any) => {
  sendMessageToContentScript(payload)

  const response: any = await Promise.race([
    waitForResponse(`${payload.type}_RESPONSE`),
    waitForResponse(POPUP_CLOSED)
  ])

  return response
}

export const checkTransactionType = (transaction: any) => {
  if (transaction.stakeMsg && transaction.directive !== undefined)
    return FACTORYTYPE.STAKINGTRANSACTION
  return FACTORYTYPE.TRANSACTION
}
