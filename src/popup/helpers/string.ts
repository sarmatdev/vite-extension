export function accountNameSymbol(name: string): string {
  return name.charAt(0)
}

export function compressAddress(
  address: string,
  leftOffset = 10,
  rightOffet = 5
): string {
  return (
    address.substr(0, leftOffset) +
    '...' +
    address.substr(address.length - rightOffet, address.length)
  )
}
