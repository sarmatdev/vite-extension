<template>
  <Header />

  <div class="home flex flex-col h-full">
    <AccountInfo class="mt-6" />
    <div class="flex mx-3 space-x-3 mt-10">
      <BaseButton to="/send" color="blue" size="lg"> Send </BaseButton>
      <BaseButton to="/recieve" color="blue" size="lg"> Receive </BaseButton>
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
        <TokenList :tokens="selectedTokens" />
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
        <TransactionList />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import useTokens from '@/composables/useTokens'
import { useStore } from 'vuex'
import AccountInfo from '@/components/AccountInfo.vue'
import TokenList from '@/components/lists/TokenList.vue'
import TransactionList from '@/components/lists/TransactionList.vue'
import Header from '@/components/Header.vue'

export default defineComponent({
  name: 'Home',
  components: {
    AccountInfo,
    TokenList,
    TransactionList,
    Header
  },
  setup() {
    const { loadNativeAssetBalance, getTokenInfoList } = useTokens()
    const name = ref('test')
    const store = useStore()

    const selectedTokens = computed(() => {
      return store.getters['account/selectedTokens']
    })
    loadNativeAssetBalance()
    getTokenInfoList()

    const navRoute = ref('Assets')

    return {
      name,
      selectedTokens,
      navRoute
    }
  }
})
</script>
