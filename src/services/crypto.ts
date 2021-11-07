import * as aes from 'aes-js'

export function encryptString(data: any, salt: string): string {
  const textBytes = aes.utils.utf8.toBytes(data)
  const aesCtr = new aes.ModeOfOperation.ctr(aes.utils.utf8.toBytes(salt))
  const encrypted = aesCtr.encrypt(textBytes)

  return aes.utils.hex.fromBytes(encrypted)
}

export function decryptString(data: any, salt: string): string {
  const encryptedBytes = aes.utils.hex.toBytes(data)
  const aesCtr = new aes.ModeOfOperation.ctr(aes.utils.utf8.toBytes(salt))
  const decryptedBytes = aesCtr.decrypt(encryptedBytes)

  return aes.utils.utf8.fromBytes(decryptedBytes)
}
