import { getExchangeRate } from '@/api/exchange-rate.api'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { IToken, IVitexToken } from '@/types'

export default function useApi() {
  function forUrlIcon(token: IToken): string {
    const store = useStore()
    const tokens = computed(() => {
      return store.getters['account/vitexTokens']
    })

    const urlIcon = tokens.value.find(
      (el: IVitexToken) => el.tokenId === token.tokenId
    ).urlIcon

    return urlIcon
  }

  async function forPrice(tkn: IToken): Promise<string | number> {
    const priceList = await getExchangeRate(tkn.tokenId)
    return priceList.data.usdRate
  }

  return {
    forUrlIcon,
    forPrice
  }
}
