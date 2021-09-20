import BigNumber from 'bignumber.js'

BigNumber.config({
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  EXPONENTIAL_AT: 1e9,
  DECIMAL_PLACES: 18
})

export default function useNumbers() {
  function toNum(value: string, decimals: number): BigNumber {
    return new BigNumber(value).div(`1e${decimals}`)
  }

  return { toNum }
}
