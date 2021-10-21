import { computed } from 'vue';
import {useStore} from 'vuex'
import useNumbers from '@/composables/useNumbers'
import {IVitexToken} from '@/types'

export default function usePrices() {

    const store = useStore()

    function loadPrices() {
        store.dispatch('account/fetchPrices')
    }

    
    const prices = computed(() => store.getters['account/prices'])

    const {frac} = useNumbers()

      function forPrice(token: IVitexToken) {
        const priceList = prices.value.find((el: any) =>
          el.tokenId.includes(token.tokenId)
        ).usdRate

        return priceList ? `$ ${Math.trunc(priceList)},${frac(priceList)}` : ''
      }


    return {
        prices,
        loadPrices,
        forPrice
    }
}