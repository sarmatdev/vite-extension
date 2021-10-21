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
  }
  
  export interface tokenPrices {
    tokenId: 'tti_564954455820434f494e69b5'
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