<template>
  <div class="text-center p-2 mb-2">
    <h1 class="text-gray-600 text-2xl font-black">Wallet creation</h1>
    <div class="flex justify-around items-center mx-6">
      <span
        class="cursor-pointer"
        :class="step == 1 ? 'font-bold' : 'font-light'"
        >Create mnemonic</span
      >
      <BaseIcon name="chevron-right" />
      <span
        class="cursor-pointer"
        :class="step == 2 ? 'font-bold' : 'font-light'"
        >Confirm mnemonic</span
      >
    </div>
  </div>
  <component @nextStep="nextStep" :is="currentStep"> </component>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import CreateMnemonic from '@/components/common/CreateWallet/CreateMnemonic.vue'
import ConfirmMnemonic from '@/components/common/CreateWallet/ConfirmMnemonic.vue'

export default defineComponent({
  name: 'Create wallet',
  emits: ['nextStep'],
  components: {
    ConfirmMnemonic,
    CreateMnemonic
  },
  setup() {
    const store = useStore()

    const step = ref(1)
    const currentStep = computed(() => {
      switch (step.value) {
        case 1:
          return 'CreateMnemonic'
        case 2:
          return 'ConfirmMnemonic'
        default:
          return 'CreateMnemonic'
      }
    })

    const agree = ref(false)
    const mnemonicForConfirm = ref('')

    function nextStep(value: number): void {
      step.value = value
    }

    return {
      store,
      step,
      agree,
      nextStep,
      mnemonicForConfirm,
      currentStep
    }
  }
})
</script>

<style lang="scss">
.create-wallet {
  .mnemonic {
    height: 60%;
  }
}
</style>
