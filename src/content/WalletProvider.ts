'use strict'
import { Transaction } from '@harmony-js/transaction'
import { StakingTransaction } from '@harmony-js/staking'
import { sign } from '@harmony-js/crypto'
import {
  THIRDPARTY_FORGET_IDENTITY_REQUEST,
  THIRDPARTY_GET_ACCOUNT_REQUEST,
  THIRDPARTY_PERSONAL_SIGN_REQUEST,
  THIRDPARTY_SIGN_REQUEST,
  FACTORYTYPE,
  LOGIN_REJECT,
  SIGN_REJECT,
  SIGNOUT_SUCCEED
} from '../types'
import networkConfig from '../config'
import {
  sendAsyncMessageToContentScript,
  getTxnInfo,
  checkTransactionType
} from './messageHandler'
const AppInfo = require('../app.json')

interface Network {
  chain_url: string
  net_version: number
  blockchain: string
  chain_id: number
}

class WalletProvider {
  isOneWallet: boolean
  version: string
  network: Network
  constructor() {
    const mainnet = networkConfig.networks[0]
    this.version = AppInfo.version
    this.isOneWallet = true
    this.network = {
      blockchain: 'harmony',
      chain_url: mainnet.apiUrl,
      chain_id: mainnet.chainId,
      net_version: 1
    }
  }
  async forgetIdentity() {
    return new Promise(async (resolve) => {
      await sendAsyncMessageToContentScript({
        type: THIRDPARTY_FORGET_IDENTITY_REQUEST
      })
      resolve(SIGNOUT_SUCCEED)
    })
  }
  getAccount() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await sendAsyncMessageToContentScript({
          type: THIRDPARTY_GET_ACCOUNT_REQUEST
        })
        if (res.rejected) {
          if (res.message) return reject(res.message)
          return reject(LOGIN_REJECT)
        }
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  }
  sign(msgData: string | Uint8Array, prefixMsg = 'Ethereum Signed Message') {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await sendAsyncMessageToContentScript({
          type: THIRDPARTY_PERSONAL_SIGN_REQUEST,
          payload: {
            msgData,
            prefixMsg
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
  signTransaction(
    transaction: Transaction | StakingTransaction,
    updateNonce?: boolean,
    encodeMode?: string,
    blockNumber?: string,
    shardID?: number
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const parsedTxn: any = await getTxnInfo(transaction)
        if (!parsedTxn)
          return reject(
            "Sorry. Currently, onewallet doesn't support signing the CreateValidator and EditValidator transaction"
          )
        const txnType = checkTransactionType(transaction)
        const res = await sendAsyncMessageToContentScript({
          type: THIRDPARTY_SIGN_REQUEST,
          payload: {
            ...parsedTxn,
            params: { updateNonce, encodeMode, blockNumber, shardID }
          }
        })
        if (res.rejected) {
          if (res.message) return reject(res.message)
          return reject(SIGN_REJECT)
        }
        let signedTransaction: any
        if (txnType == FACTORYTYPE.TRANSACTION) {
          const { txParams } = res
          signedTransaction = transaction as Transaction
          signedTransaction.setParams({
            ...signedTransaction.txParams,
            from: txParams.from,
            nonce: txParams.nonce,
            signature: txParams.signature,
            rawTransaction: txParams.rawTransaction,
            unsignedRawTransaction: txParams.unsignedRawTransaction
          })
        } else {
          const { txParams } = res
          signedTransaction = transaction as StakingTransaction
          signedTransaction.setFromAddress(txParams.from)
          signedTransaction.setNonce(txParams.nonce)
          signedTransaction.setUnsigned(txParams.unsignedRawTransaction)
          signedTransaction.setSignature(txParams.signature)
          signedTransaction.setRawTransaction(txParams.rawTransaction)
        }
        resolve(signedTransaction)
      } catch (err) {
        reject(err)
      }
    })
  }
}

const walletProvider = new WalletProvider()
export default walletProvider
