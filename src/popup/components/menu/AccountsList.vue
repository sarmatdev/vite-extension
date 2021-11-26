<template>
  <section
    class="
      p-4
      mt-2
      text-black text-lg
      flex flex-col
      items-start
      bg-blue-100
      rounded-2xl
    "
  >
    <div class="flex items-center">
      <base-icon size="xl" name="user" />
      <h2 class="text-lg">My Accounts</h2>
    </div>
    <ul class="w-full mt-2 h-full min-h-full max-h-40 overflow-scroll">
      <li
        class="
          p-2
          rounded-lg
          flex
          items-center
          justify-between
          cursor-pointer
          hover:bg-blue-300
        "
        v-for="account in accounts"
        :key="account.address"
        @click="selectActive(account.address)"
      >
        <div class="flex">
          <div
            class="
              h-10
              w-10
              flex
              items-center
              justify-center
              rounded-lg
              bg-purple-300
              text-white text-xl
            "
          >
            {{ accountNameSymbol(account.name) }}
          </div>
          <div class="ml-2">
            <h3 class="leading-none">
              {{ account.name }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ compressAddress(account.address, 10, 5) }}
            </p>
          </div>
        </div>
        <base-icon
          v-if="account.address === active.address"
          name="check"
          size="xl"
        />
        <BaseButton
          @click.stop="deleteAccount(account.address)"
          size="xs"
          outline
        >
          <BaseIcon name="trash-2" size="xs" />
        </BaseButton>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { accountNameSymbol, compressAddress } from '@/helpers/string'
import { useWeb3 } from '@/composables/useWeb3'

export default defineComponent({
  name: 'AccountsList',
  setup() {
    const store = useStore()

    const accounts = computed(() => {
      return store.getters['wallets/accounts']
    })

    const active = computed(() => {
      return store.getters['wallets/active']
    })

    function selectActive(address: string): void {
      store.commit('wallets/setActive', address)
    }

    function deleteAccount(address: string): void {
      store.commit('wallets/deleteWallet', address)
    }

    const web3 = useWeb3()

    watch(
      () => active.value,
      (newAccount, oldAccount) => {
        if (oldAccount === newAccount) return
        store.commit('settings/setLoaded', false)
        web3.fetchFullTokenInfo(active.value.address)
        web3.getTxsList(active.value.address)
        setTimeout(() => {
          store.commit('settings/setLoaded', true)
        }, 1000)
      }
    )

    return {
      accounts,
      active,
      selectActive,
      deleteAccount,
      accountNameSymbol,
      compressAddress
    }
  }
})
</script>

<style></style>
