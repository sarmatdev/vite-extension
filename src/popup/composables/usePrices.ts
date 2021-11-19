import useNumbers from '@/composables/useNumbers'
import store from '@/store'

export default function usePrices() {
  const { frac } = useNumbers()

   function forPrice(price) {
    return  price ? `$ ${Math.trunc(price)},${frac(price)}` : price
  }

  return {
    forPrice
  }
}
