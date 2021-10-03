<template>
  <div class="px-2">
    <h1 class="text-center text-2xl">Welcome to</h1>
    <img
      class="mt-12 mb-6"
      src="assets/images/vite-logo-blue@2x.png"
      width="360"
      alt="Welcome Image"
    />
    <div>
      <p class="">You can import an existing wallet or create a new one</p>
    </div>
    <div class="flex justify-around items-center space-x-3">
      <BaseButton size="lg" color="blue" to="/create-wallet">Create</BaseButton>
      <BaseButton size="lg" color="blue" outline to="/import-wallet"
        >Import</BaseButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
