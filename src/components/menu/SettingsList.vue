<template>
  <section
    class="h-full mt-2 flex flex-col items-start bg-blue-100 rounded-t-2xl"
  >
    <ul class="w-full h-full min-h-full overflow-scroll">
      <li
        class="
          p-2
          rounded-2xl
          flex
          items-center
          justify-between
          cursor-pointer
          hover:bg-blue-300
        "
        v-for="item in items"
        :key="item"
      >
        <div class="flex items-center text-gray-600">
          <base-icon name="plus" size="xl" />
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
        title: 'Add Account',
        icon: 'plus',
        to: '/create-account'
      },
      {
        title: 'Add Account',
        icon: 'plus',
        to: '/create-account'
      },
      {
        title: 'Add Account',
        icon: 'plus',
        to: '/create-account'
      },
      {
        title: 'Add Account',
        icon: 'plus',
        to: '/create-account'
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
