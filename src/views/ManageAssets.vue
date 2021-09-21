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
        {{ filter ? 'All assets added' : 'value of length' }}
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
          class="w-full cursor-pointer"
          v-for="asset in assets"
          :key="asset.address"
          @click="check = !check"
        >
          <div class="flex justify-between items-center p-3">
            <img class="h-10" :src="asset.logoURI" alt="" />
            <div class="text-left">
              <p class="text-white font-semibold">
                {{ asset.amount + ' ' + asset.symbol }}
              </p>
              <p>{{ compressAddress(asset.address) }}</p>
            </div>
            <BaseIcon v-if="check" class="text-white" name="check-circle" />
            <BaseIcon v-if="!check" class="text-white" name="circle" />
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
import { defineComponent, ref } from 'vue'
import { compressAddress } from '@/helpers/string'

export default defineComponent({
  name: 'ManagseAssets',
  setup() {
    const navRoute = ref('Search')
    const filter = ref('')

    const assets = ref([
      {
        symbol: 'USDC',
        name: 'USD Coin',
        amount: 6,
        logoURI:
          'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
        address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        amount: 6,
        logoURI:
          'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
        address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        amount: 6,
        logoURI:
          'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
        address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        amount: 6,
        logoURI:
          'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
        address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        amount: 6,
        logoURI:
          'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
        address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        amount: 6,
        logoURI:
          'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
        address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        amount: 6,
        logoURI:
          'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
        address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
      }
    ])

    const check = ref(false)

    return { navRoute, filter, assets, compressAddress, check }
  }
})
</script>
