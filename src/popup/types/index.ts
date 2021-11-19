export interface Account {
  name: string
  address: string
  privateKey: string
  salt: string
}

export interface IVitexToken {
  tokenId: string
  name: string
  symbol: string
  originalSymbol: string
  totalSupply: string
  owner: string
  tokenDecimals: number
  urlIcon: string
  price?: string | number
  balance?: string | number
}

export interface tokenPrices {
  tokenId: string
  tokenSymbol: string
  usdRate: string | number
  cnyRate: string | number
  rubRate: string | number
  krwRate: string | number
  tryRate: string | number
  vndRate: string | number
  eurRate: string | number
  gbpRate: string | number
  btcRate: string | number
}

export interface AccountBalance {
  tokenId: {
    balance: string
    tokenInfo: {
      decimals: number
      index: number
      isOwnerBurnOnly: boolean
      isReIssuable: boolean
      maxSupply: string
      owner: string
      ownerBurnOnly: boolean
      tokenId: string
      tokenName: string
      tokenSymbol: string
      tokenSymbolView: string
      totalSupply: string
    }
  }
}
