import { wallet, utils, accountBlock } from '@vite/vitejs'
import { encryptString, encryptKeyStore } from './CryptoService'

export function isValidAddress(address: string) {
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

export function sign(hex, privateKey: string) {
  const hexPaylod = utils._Buffer.from(hex).toString('hex')
  const sign = utils.ed25519.sign(hexPaylod, privateKey)

  return sign
}

export async function signAccountBlock(tx, provider, privateKey) {
  const myAccountBlock = accountBlock
    .createAccountBlock('send', {
      address: tx.address,
      toAddress: tx.toAddress,
      tokenId: tx.tokenId,
      amount: tx.amount
    })
    .setProvider(provider)
    .setPrivateKey(privateKey)

  await myAccountBlock.autoSetPreviousAccountBlock()

  const result = await myAccountBlock.sign()

  return result
}
