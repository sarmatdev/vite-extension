<template>
  <div class="auth-page"></div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { setStorageItem, getStorageItem } from './services/storage'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'AuthRoute',
  setup() {
    const AppState = getStorageItem('AppState')
    const store = useStore()
    const router = useRouter()
    const password = computed(() => store.getters['settings/password'])
    const timeout = computed(() => store.getters['settings/timeout'])
    const accounts = computed(() => store.getters['wallets/accounts'])

    if (AppState) {
      const lastClosed = AppState
      if (lastClosed && accounts.value.length && password.value) {
        const now = Date.now()
        //@ts-ignore
        const offset = now - lastClosed
        if (offset >= timeout.value) {
          store.dispatch('settings/storeIsLocked', true)
          router.push('/lock')
        }
      }
    }
    setStorageItem('AppState', { ...AppState, lastOpened: Date.now() })
    router.push('/home')
  }
})
</script>
<style></style>
