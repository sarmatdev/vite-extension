<template>
  <div class="welcome">
    <img
      class="mt-12 mb-6"
      src="../assets/images/vite-logo.png"
      width="360"
      alt="Welcome Image"
    />
    <div>
      <h1 class="text-gray-600 font-black text-lg">Wallet is not connected</h1>
      <p class="my-20">You can import an existing wallet or create a new one</p>
    </div>
    <div class="flex justify-around items-center space-x-3">
      <BaseButton size="lg" color="blue" to="/create-wallet">Create</BaseButton>
      <BaseButton size="lg" color="blue" to="/import-wallet">Import</BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss">
.welcome {
  @apply text-center flex flex-col p-3;
  &__hero {
  }
}
</style>
