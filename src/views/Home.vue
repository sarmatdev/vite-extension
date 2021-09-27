<template>
  <div class="home">
    <AccountInfo />
    <div class="flex mx-3 space-x-3 mb-3">
      <BaseButton to="/send" color="blue" size="lg"> Send </BaseButton>
      <BaseButton color="blue" size="lg"> Receive </BaseButton>
    </div>
    <div class="fixed inset-x-0 top-2/4 bottom-0 rounded-t-2xl bg-blue-200">
      <div class="flex justify-between">
        <BaseLink
          v-for="(navItem, idx) in ['Assets', 'Activity']"
          :key="idx"
          @click="navRoute = navItem"
          :active="navRoute === navItem"
          >{{ navItem }}
        </BaseLink>
      </div>
      <div v-if="navRoute === 'Assets'" class="overflow-y-scroll h-60">
        <span
          v-for="selectedToken in selectedTokens"
          :key="selectedToken.tokenId"
          class="
            flex
            py-2.5
            px-2.5
            cursor-pointer
            transition
            duration-100
            ease-in-out
            hover:bg-blue-300
          "
        >
          <img class="h-10" src="../assets/images/logo-blue1.svg" alt="" />
          <div class="ml-2 leading-tight">
            <span class="font-bold text-black"
              >0 {{ selectedToken.tokenSymbol }}</span
            >
            <span class="block"> {{ selectedToken.tokenName }}</span>
          </div>
        </span>
        <BaseToggle
          class="
            fixed
            z-10
            right-1/2
            bottom-9
            transform
            translate-x-2/4 translate-y-2/4
          "
          icon="plus"
          to="/manage-assets"
        />
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
                class="text-black"
                name="send"
              />
              <BaseIcon
                v-if="activityMockItem.status === 'Pending'"
                class="text-black"
                name="clock"
              />
              <div class="text-left flex flex-col">
                <span class="text-black font-semibold">
                  {{ activityMockItem.blockType }}
                </span>
                <span>
                  {{ activityMockItem.status }}
                </span>
              </div>
              <div class="text-right">
                <p class="text-black font-semibold">
                  {{ activityMockItem.amount + ' ' + activityMockItem.token }}
                </p>
                <p>From: {{ compressAddress(activityMockItem.address) }}</p>
                <p>To: {{ compressAddress(activityMockItem.toAddress) }}</p>
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
import { defineComponent, ref, computed, onBeforeMount } from 'vue'
import useTokens from '@/composables/useTokens'
import { useStore } from 'vuex'
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
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('account/fetchTokens')
    })

    const selectedTokens = computed(() => {
      return store.getters['account/selectedTokens']
    })
    console.log(selectedTokens)
    loadNativeAssetBalance()
    getTokenInfoList()

    const navRoute = ref('Assets')

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
      selectedTokens,
      navRoute,
      activityMock,
      compressAddress
    }
  }
})
</script>
