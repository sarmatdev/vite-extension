<template>
  <div class="px-6 border text-center flex flex-col space-y-3">
    <div class="flex w-full justify-center items-center mr-2">
      <img class="w-8" src="assets/images/logo-blue.svg" />
      <div class="font-semibold text-blue-900">
        <span class="text-3xl"
          >{{ forAmount(balance) ? forAmount(balance).split(',')[0] : 0
          }}<span class="text-xl">{{
            forAmount(balance) ? ',' + forAmount(balance).split(',')[1] : ''
          }}</span>
          VITE</span
        >
      </div>
    </div>

    <BaseTooltip placement="bottom">
      <template v-slot:activator>
        <div
          @click="copyAddress"
          class="
            p-2
            rounded-xl
            cursor-pointer
            hover:shadow-xl
            active:bg-blue-300
            hover:bg-blue-100
            transition
            duration-100
            ease-in-out
          "
        >
          <p class="font-semibold text-blue-900 text-2xl">
            {{ active.name }}
          </p>
          <p class="font-semibold text-sm">
            {{ active.address ? compressAddress(active.address, 10, 5) : '' }}
          </p>
        </div>
      </template>
      <div
        v-text="copiedAddress ? 'Copied' : 'Copy address'"
        class="w-20 text-center"
      />
    </BaseTooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useNumbers } from '@/composables/useNumbers'
import { compressAddress } from '@/helpers/string'
import { useClipboard } from '@/composables/useClipboard'
import { usePrices } from '@/composables/usePrices'

export default defineComponent({
  name: 'AccountInfo',
  setup() {
    const store = useStore()
    const { toNum, frac } = useNumbers()

    const copiedAddress = ref(false)

    const balance = computed(() => store.getters['account/balance'])
    const active = computed(() => store.getters['wallets/active'])

    const { writeClipboard } = useClipboard()

    function copyAddress() {
      writeClipboard(active.value.address)
      copiedAddress.value = true
      setTimeout(() => {
        copiedAddress.value = false
      }, 1000)
    }

    const { forAmount } = usePrices()

    return {
      copiedAddress,
      balance,
      active,
      toNum,
      frac,
      compressAddress,
      copyAddress,
      forAmount
    }
  }
})
</script>

<style></style>
