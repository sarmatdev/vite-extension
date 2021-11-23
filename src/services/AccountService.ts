import { wallet } from '@vite/vitejs'
import {
  encryptString,
  decryptString,
  encryptKeyStore,
  decryptKeyStore
} from './CryptoService'

function isValidAddress(address: string) {
  return wallet.isValidAddress(address)
}

export function validateMnemonic(mnemonic) {
  return wallet.validateMnemonics(mnemonic)
}

export function createFromMnemonic(mnemonic: string): any {
  try {
    return wallet.getWallet(mnemonic).deriveAddress(0)
  } catch (error) {
    return error
  }
}

export function createFromPrivateKey(privateKey: string) {
  try {
    return wallet.createAddressByPrivateKey(privateKey)
  } catch (error) {
    return error
  }
}

export function createRandom() {
  return wallet.createSeed(128)
}

export function validatePrivateKey(privateKey) {
  try {
    const account = createFromPrivateKey(privateKey)
    const address = account.address
    return isValidAddress(address)
  } catch (e) {
    return false
  }
}

export async function createAccountFromMnemonic(
  name: string,
  mnemonic: string,
  password: string
) {
  const account = {
    mnemonic: wallet.getWallet(mnemonic).mnemonics,
    ...wallet.getWallet(mnemonic).deriveAddress(0)
  }
  const keystore = encryptString(mnemonic, password)

  return {
    name,
    address: account.address,
    keystore
  }
}

export function createAccount(
  name: string,
  privateKey: string,
  password: string
) {
  const account = createFromPrivateKey(privateKey)
  const keystore = encryptKeyStore(account.privateKey, password)

  return {
    name,
    address: account.address,
    keystore
  }
}

export function getAddressFromPrivateKey(privateKey) {
  return true
}

export async function getBalance(address, shardId) {
  return true
}

export function checkAddress(address) {
  return true
}
