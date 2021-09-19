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
              {{ compressAddress(account.address) }}
            </p>
          </div>
        </div>
        <base-icon name="check" size="xl" class="text-blue-600" />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AccountsList',
  setup() {
    const accounts = [
      {
        name: 'Test',
        address: '0xE721FD46d55033CE834AEeFaF5cC88DAC1be3304'
      },
      {
        name: 'Alan',
        address: '0xE721FD46d55033CE834AEeFaF5cC88DAC1be3304'
      },
      {
        name: 'Sarmat',
        address: '0xE721FD46d55033CE834AEeFaF5cC88DAC1be3304'
      }
    ]

    function accountNameSymbol(name: string): string {
      return name.charAt(0)
    }

    function compressAddress(address: string, leftOffset = 15, RightOffet = 5) {
      return (
        address.substr(0, leftOffset) +
        '...' +
        address.substr(address.length - RightOffet, address.length)
      )
    }

    return {
      accounts,
      accountNameSymbol,
      compressAddress
    }
  }
})
</script>

<style></style>
