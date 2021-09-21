<template>
  <div class="home">
    <AccountInfo />
    <div class="flex mx-3 space-x-3 mb-3">
      <BaseButton color="blue" size="lg"> Send </BaseButton>
      <BaseButton color="blue" size="lg"> Receive </BaseButton>
    </div>
    <div class="fixed inset-x-0 top-2/4 bottom-0 rounded-t-2xl bg-blue-900">
      <div class="flex justify-between text-base font-bold text-center">
        <span
          v-for="(navItem, idx) in ['Assets', 'Activity']"
          :key="idx"
          @click="navRoute = navItem"
          :class="navRoute === navItem ? 'text-white ' : 'text-blue-500'"
          class="w-full cursor-pointer"
        >
          <p class="py-3">{{ navItem }}</p>
          <hr
            :class="navRoute === navItem ? 'bg-white' : 'bg-blue-500'"
            class="border-none h-0.5"
        /></span>
      </div>
      <div v-if="navRoute === 'Assets'" class="overflow-y-scroll h-60">
        <span
          v-for="asset in assets"
          :key="asset.address"
          class="
            flex
            py-2.5
            px-2.5
            cursor-pointer
            transition
            duration-100
            ease-in-out
            hover:bg-blue-800
          "
        >
          <img class="h-10" :src="asset.logoURI" alt="" />
          <div class="ml-2 leading-tight">
            <span class="font-bold text-white">0 {{ asset.symbol }}</span>
            <span class="block"> {{ asset.name }}</span>
          </div>
        </span>
        <div
          class="
            bg-blue-800
            rounded-lg
            w-10
            h-10
            flex
            justify-center
            items-center
            fixed
            right-1/2
            bottom-9
            transform
            translate-x-2/4 translate-y-2/4
            cursor-pointer
            transition
            duration-100
            ease-in-out
            hover:bg-blue-600
          "
        >
          <BaseIcon class="text-white" name="plus" />
        </div>
      </div>
      <div
        v-if="navRoute === 'Activity'"
        class="overflow-y-scroll h-60 text-sm"
      >
        <div v-for="(activityMockItem, idx) in activityMock" :key="idx">
          <div class="p-3">
            <span class="text-left">
              {{ activityMockItem.timestamp }}
            </span>
            <div class="flex justify-between items-center">
              <BaseIcon
                v-if="activityMockItem.status === 'Completed'"
                class="text-white"
                name="send"
              />
              <BaseIcon
                v-if="activityMockItem.status === 'Pending'"
                class="text-white"
                name="clock"
              />
              <div class="text-left flex flex-col">
                <span class="text-white font-semibold">
                  {{ activityMockItem.blockType }}
                </span>
                <span>
                  {{ activityMockItem.status }}
                </span>
              </div>
              <div class="text-right flex flex-col">
                <span class="text-white font-semibold">
                  {{ activityMockItem.amount + ' ' + activityMockItem.token }}
                </span>
                <span>
                  From: {{ compressAddress(activityMockItem.address) }}
                </span>
                <span>
                  To: {{ compressAddress(activityMockItem.toAddress) }}
                </span>
              </div>
            </div>
          </div>
          <hr class="bg-white border-none h-0.5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTokens } from '@/composables/useTokens'
import AccountInfo from '@/components/AccountInfo.vue'
import { compressAddress } from '@/helpers/string'

export default defineComponent({
  name: 'Home',
  components: {
    AccountInfo
  },
  setup() {
    const { loadNativeAssetBalance, getTokenInfoList } = useTokens()
    const name = ref('test')

    loadNativeAssetBalance()
    getTokenInfoList()

    const navRoute = ref('Assets')

    const assets = ref([
      {
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        logoURI:
          'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png'
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        logoURI:
          'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png'
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        logoURI:
          'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png'
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        logoURI:
          'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png'
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        logoURI:
          'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png'
      }
    ])

    const activityMock = [
      {
        blockType: 'Send',
        address: '0xd69401e5b2f93eb66e585711ec4cefd6e8c8346d',
        toAddress: '0xd69401e5b2f93eb66e585711ec4cefd6e8c8346d',
        token: 'BNB',
        amount: '10',
        hash: '66e585711ec4cefd6e8c8346d66e585711ec4cefd6e8c8346d66e585711ec4cefd6e8c8346d',
        timestamp: '9/21/2021, 12:41:12',
        status: 'Pending'
      },
      {
        blockType: 'Send',
        address: '0xd69401e5b2f93eb66e585711ec4cefd6e8c8346d',
        toAddress: '0xd69401e5b2f93eb66e585711ec4cefd6e8c8346d',
        token: 'BNB',
        amount: '10',
        hash: '66e585711ec4cefd6e8c8346d66e585711ec4cefd6e8c8346d66e585711ec4cefd6e8c8346d',
        timestamp: '9/21/2021, 12:41:12',
        status: 'Completed'
      },
      {
        blockType: 'Send',
        address: '0xd69401e5b2f93eb66e585711ec4cefd6e8c8346d',
        toAddress: '0xd69401e5b2f93eb66e585711ec4cefd6e8c8346d',
        token: 'BNB',
        amount: '10',
        hash: '66e585711ec4cefd6e8c8346d66e585711ec4cefd6e8c8346d66e585711ec4cefd6e8c8346d',
        timestamp: '9/21/2021, 12:41:12',
        status: 'Completed'
      },

      {
        blockType: 'Send',
        address: '0xd69401e5b2f93eb66e585711ec4cefd6e8c8346d',
        toAddress: '0xd69401e5b2f93eb66e585711ec4cefd6e8c8346d',
        token: 'BNB',
        amount: '10',
        hash: '66e585711ec4cefd6e8c8346d66e585711ec4cefd6e8c8346d66e585711ec4cefd6e8c8346d',
        timestamp: '9/21/2021, 12:41:12',
        status: 'Completed'
      }
    ]

    return {
      name,
      assets,
      navRoute,
      activityMock,
      compressAddress
    }
  }
})
</script>
