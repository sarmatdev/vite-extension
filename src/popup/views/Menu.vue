<template>
  <div class="h-14 pb-2 flex items-center bg-blue-200 rounded-b-lg px-2">
    <BaseToggle icon="chevron-left" to="/home" />
    <p class="text-black text-lg font-bold m-auto">Account</p>
  </div>
  <div class="px-2 m-auto h-full">
    <AccountsList />
    <SettingsList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AccountsList from '@/components/menu/AccountsList.vue'
import SettingsList from '@/components/menu/SettingsList.vue'

export default defineComponent({
  name: 'Menu',
  components: {
    AccountsList,
    SettingsList
  }
})
</script>

<style></style>
