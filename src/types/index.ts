export interface Account {
  name: string
  address: string
  privateKey: string
  salt: string
}

export interface IToken {
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
  totalSupply: string
}

export interface IMarket {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
}
