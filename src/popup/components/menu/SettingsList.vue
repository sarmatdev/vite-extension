<template>
  <section class="mt-2 h-full flex flex-col bg-blue-100 rounded-2xl">
    <ul class="w-full">
      <li
        class="list-item"
        v-for="(item, i) in items"
        :key="i"
        @click="$router.push(item.to)"
      >
        <div class="flex items-center text-gray-600">
          <BaseIcon :name="item.icon" size="xl" />
          <div class="ml-2">
            <h3 class="leading-none text-xl font-medium">
              {{ item.title }}
            </h3>
          </div>
        </div>
        <base-icon name="chevron-right" size="xl" class="text-blue-600" />
      </li>
      <li class="list-item" @click="openNewTab">
        <div class="flex items-center text-gray-600">
          <BaseIcon name="maximize" size="xl" />
          <div class="ml-2">
            <h3 class="leading-none text-xl font-medium">Open in a new tab</h3>
          </div>
        </div>
        <base-icon name="chevron-right" size="xl" class="text-blue-600" />
      </li>
      <li class="list-item" @click="lockWallet">
        <div class="flex items-center text-gray-600">
          <BaseIcon name="lock" size="xl" />
          <div class="ml-2">
            <h3 class="leading-none text-xl font-medium">Lock</h3>
          </div>
        </div>
        <base-icon name="chevron-right" size="xl" class="text-blue-600" />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { openNewTab } from '../../../utils'

export default defineComponent({
  name: 'AccountsList',
  setup() {
    const store = useStore()
    const router = useRouter()

    const items = [
      {
        title: 'Add account',
        icon: 'plus',
        to: '/create-wallet'
      },
      {
        title: 'Import wallet',
        icon: 'download',
        to: '/import-wallet'
      }
    ]

    function accountNameSymbol(name: string): string {
      return name.charAt(0)
    }

    function lockWallet() {
      store.dispatch('settings/setLockState', true)
      router.push({ path: '/lock' })
    }

    return {
      items,
      accountNameSymbol,
      openNewTab,
      lockWallet
    }
  }
})
</script>

<style scoped>
.list-item {
  @apply px-2 py-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-blue-300;
}
</style>
