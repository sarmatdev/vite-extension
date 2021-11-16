<template>
  <div @scroll="scroll" class="h-80 overflow-y-auto">
    <div
      v-for="token in tokens.slice(0, endToken)"
      :key="token.tokenId"
      @click="selectToken(token)"
      class="w-full cursor-pointer transition-all"
      :class="
        hasCheck(token) && selector
          ? 'bg-blue-400 '
          : 'bg-blue-200 hover:bg-blue-300'
      "
    >
      <div class="flex items-center p-3 justify-between">
        <div class="flex items-center space-x-5">
          <img width="40" :src="token.urlIcon" :alt="token.originalSymbol" />
          <div class="text-left">
            <p class="text-black font-semibold">
              {{ balance + ' ' + token.originalSymbol }}
            </p>
            <p>{{ selector ? compressAddress(token.tokenId) : token.name }}</p>
          </div>
        </div>
        <!-- <p class="font-semibold text-black">{{ forPrice(token) }}</p> -->
        <div v-if="selector">
          <BaseIcon
            v-if="hasCheck(token)"
            class="text-black"
            name="check-circle"
          />
          <BaseIcon v-else class="text-black" name="circle" />
        </div>
      </div>
      <hr v-if="selector" class="bg-white text-white border-none h-0.5" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, ComputedRef, onMounted } from 'vue'
import { useStore } from 'vuex'
import { IVitexToken } from '@/types'
import { compressAddress } from '@/helpers/string'
import usePrices from '@/composables/usePrices'

export default defineComponent({
  name: 'TokenList',
  props: {
    tokens: {
      type: Array,
      default: () => []
    },
    selector: {
      type: Boolean,
      default: false
    },
    balance: {
      type: [Number, String],
      default: 0
    }
  },
  setup(props, { emit }) {
    const store = useStore()

    const endToken = ref(5)

    function scroll() {
      if (props.tokens.length > endToken.value) {
        endToken.value++
      }
    }

    const selectedTokens: ComputedRef<Array<IVitexToken>> = computed(() => {
      return store.getters['account/selectedTokens']
    })

    function hasCheck(token: IVitexToken): boolean {
      return !!selectedTokens.value.find((el: IVitexToken) =>
        el.tokenId.includes(token.tokenId)
      )
    }

    function selectToken(token: IVitexToken): void {
      if (props.selector) {
        hasCheck(token)
          ? store.commit('account/removeSelectedTokens', token)
          : store.commit('account/addSelectedTokens', token)
      } else {
        emit('select', token)
      }
    }

    const { loadPrices, forPrice } = usePrices()

    // loadPrices()

    return {
      hasCheck,
      selectToken,
      compressAddress,
      forPrice,
      endToken,
      scroll
    }
  }
})
</script>