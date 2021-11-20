import useNumbers from '@/composables/useNumbers'
import store from '@/store'

export default function usePrices() {
  const { frac } = useNumbers()

  function forPrice(price, balance?) {
    if (balance) {
      const balanceUsd = price * balance
      return `$${Math.trunc(balanceUsd)}${
        frac(balanceUsd) ? ',' + frac(balanceUsd) : ''
      }`
    }
    return price
      ? `1 ≈ $${Math.trunc(price)}${frac(price) ? ',' + frac(price) : ''}`
      : ''
  }
  function forAmount(a) {
    return a ? `${Math.trunc(a)}${frac(a) ? ',' + frac(a) : ''}` : ''
  }
  return {
    forPrice,
    forAmount
  }
}
