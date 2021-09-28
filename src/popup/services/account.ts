import { wallet } from '@vite/vitejs'

export function createRandom(): any {
  const newWallet = {
    mnemonic: wallet.createWallet(128).mnemonics,
    ...wallet.createWallet().deriveAddress(0)
  }
  return newWallet
}

export function createFromMnemonic(mnemonic: string): any {
  const fromMnemonic = {
    mnemonic: wallet.getWallet(mnemonic).mnemonics,
    ...wallet.getWallet(mnemonic).deriveAddress(0)
  }
  return fromMnemonic
}

export function createMnemonic(): any {
  return wallet.createMnemonics()
}

export function validateMnemonic(phrase: string): any {
  return wallet.validateMnemonics(phrase)
}

export function createFromPrivateKey(privateKey: string): unknown {
  return wallet.createAddressByPrivateKey(privateKey)
}
