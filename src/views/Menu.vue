<template>
  <div>
    <div class="h-14 flex items-center bg-gray-400 rounded-b-lg px-2">
      <base-button to="/" size="xs" color="blue" squared>
        <base-icon name="chevron-left" />
      </base-button>
      <p class="text-white">Account</p>
    </div>
    <section
      class="
        px-2
        h-14
        mt-2
        text-black text-lg
        flex flex-col
        items-start
        bg-gray-300
        rounded-2xl
      "
    >
      <div class="px-2">
        <base-icon size="lg" name="user" />
        My Account
      </div>
      <div>*list of accounts*</div>
    </section>

    <section
      class="
        px-2
        h-full
        mt-2
        text-black text-lg
        flex flex-col
        items-start
        bg-gray-300
        rounded-t-2xl
      "
    >
      <div class="flex align-center">
        <base-icon size="xl" name="plus" /> <span>Add Account</span>
      </div>
      <div class="flex align-center">
        <base-icon size="xl" name="download" /> <span>Import Account</span>
      </div>
      <div class="flex align-center">
        <base-icon size="xl" name="settings" /> <span>Settings</span>
      </div>
      <div class="flex align-center">
        <base-icon size="xl" name="lock" /> <span>Lock</span>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Menu'
})
</script>

<style></style>
