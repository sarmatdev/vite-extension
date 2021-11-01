import {
  THIRDPARTY_FORGET_IDENTITY_REQUEST_RESPONSE,
  THIRDPARTY_GET_ACCOUNT_REQUEST_RESPONSE,
  THIRDPARTY_SIGN_REQUEST_RESPONSE,
  HARMONY_RESPONSE_TYPE,
  THIRDPARTY_PERSONAL_SIGN_REQUEST_RESPONSE,
  FROM_BACK_TO_POPUP,
  CLOSE_WINDOW
} from '../../types'

class WalletAPI {
  getAccount = (sender) => {
    console.log('getAccount from service')
  }
}

const walletAPI = new WalletAPI()

export default walletAPI
