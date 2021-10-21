<template>
  <div class="h-12 flex items-center justify-between px-2 shadow">
    <router-link to="/" @click="openInTab">
      <img class="h-8" src="assets/images/logo-blue1.svg" alt="" />
    </router-link>
    <NetworkSelect />
    <base-button to="/menu" color="white" circle flat>
      <base-icon name="menu" size="lg" />
    </base-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NetworkSelect from '@/components/NetworkSelect.vue'
export default defineComponent({
  name: 'Header',
  components: {
    NetworkSelect
  },
  setup() {
    function openInTab() {
      chrome.tabs.create({
        url: 'index.html#/'
      })
    }

    return {
      openInTab
    }
  }
})
</script>

<style></style>
