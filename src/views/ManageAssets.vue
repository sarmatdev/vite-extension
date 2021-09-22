<template>
  <div>
    <div class="fixed inset-x-0 top-0 z-50 bg-blue-900 flex p-2 items-center">
      <BaseToggle icon="chevron-left" to="/" />
      <span class="ml-20 text-white"> Asset Management </span>
    </div>
    <div class="flex justify-between bg-blue-900">
      <BaseLink
        v-for="(navItem, idx) in ['Search', 'Your assets']"
        :key="idx"
        @click="navRoute = navItem"
        :active="navRoute === navItem"
        >{{ navItem }}
      </BaseLink>
    </div>
    <template v-if="navRoute === 'Search'">
      <div class="rounded-b-2xl bg-blue-900 p-3">
        <BaseInput
          v-model="filter"
          class="mx-3 my-8"
          placeholder="Asset filter..."
        />
      </div>
      <p class="text-center my-4">
        {{
          filter
            ? `${filteredTokens.length} of ${tokens.length}`
            : 'All assets added'
        }}
      </p>
      <div
        class="
          fixed
          inset-x-0
          bottom-0
          rounded-t-2xl
          bg-blue-900
          overflow-y-scroll
          h-80
        "
      >
        <div
          v-for="token in filteredTokens"
          :key="token.tokenId"
          @click="selectToken(token)"
          class="w-full cursor-pointer"
          :class="hasCheck(token) ? 'bg-blue-700' : 'hover:bg-blue-800'"
        >
          <div class="flex justify-between items-center p-3">
            <img class="h-10" src="../assets/images/logo-blue1.svg" alt="" />
            <div class="text-left">
              <p class="text-white font-semibold">
                {{ 0 + ' ' + token.tokenSymbol }}
              </p>
              <p>{{ compressAddress(token.tokenId) }}</p>
            </div>
            <BaseIcon
              v-if="hasCheck(token)"
              class="text-white"
              name="check-circle"
            />
            <BaseIcon
              v-if="!hasCheck(token)"
              class="text-white"
              name="circle"
            />
          </div>
          <hr class="bg-white text-white border-none h-0.5" />
        </div>
      </div>
    </template>
    <div v-if="navRoute === 'Your assets'">
      <div class="rounded-b-2xl bg-blue-900 px-3 pt-8 h-96">
        <BaseInput placeholder="Contract address" />
      </div>
      <div class="px-3 py-8">
        <BaseButton color="blue" size="lg">Add asset</BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { compressAddress } from '@/helpers/string'

export default defineComponent({
  name: 'ManagseAssets',
  setup() {
    const store = useStore()
    const navRoute = ref('Search')

    const tokens = computed(() => {
      return store.getters['account/tokens']
    })

    const filter = ref('')
    const filteredTokens = computed(() => {
      return tokens.value.filter(
        (el: any) =>
          el.tokenName.toLowerCase().includes(filter.value.toLowerCase()) ||
          el.tokenSymbol.toLowerCase().includes(filter.value.toLowerCase())
      )
    })

    const selectedTokens = computed(() => {
      return store.getters['account/selectedTokens']
    })

    function hasCheck(token: any): boolean {
      return selectedTokens.value.filter((el: any) =>
        el.tokenId.includes(token.tokenId)
      ).length
    }
    function selectToken(token: any): void {
      if (hasCheck(token)) {
        store.commit('account/removeSelectedTokens', token)
      } else {
        store.commit('account/addSelectedTokens', token)
      }
      console.log(selectedTokens.value)
    }

    return {
      navRoute,
      filter,
      selectedTokens,
      compressAddress,
      hasCheck,
      selectToken,
      filteredTokens
    }
  }
})
</script>
