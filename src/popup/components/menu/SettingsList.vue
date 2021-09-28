<template>
  <section class="mt-2 h-full flex flex-col bg-blue-100 rounded-2xl">
    <ul class="w-full my-2">
      <li
        class="
          p-2
          rounded-xl
          flex
          items-center
          justify-between
          cursor-pointer
          hover:bg-blue-300
        "
        v-for="item in items"
        :key="item"
        @click="this.$router.push(item.to)"
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
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AccountsList',
  setup() {
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

    return {
      items,
      accountNameSymbol
    }
  }
})
</script>

<style></style>
