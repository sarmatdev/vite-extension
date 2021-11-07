<template>
  <transition
    enter-active-class="transition duration-100 ease-out transform"
    enter-class="-translate-y-3 scale-95 opacity-0"
    enter-to-class="translate-y-0 scale-100 opacity-100"
    leave-active-class="transition duration-100 ease-in transform"
    leave-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-3 opacity-0"
  >
    <div
      role="dialog"
      v-if="showModal"
      class="
        w-full
        absolute
        z-10
        inset-x-0
        bottom-0
        rounded-t-2xl
        bg-white
        h-3/4
      "
    >
      <header class="border-b p-4 flex items-center justify-between">
        <h2 class="text-lg font-bold m-auto">Confirm Transaction</h2>
        <base-button @click="closeModal" size="xs" squared
          ><base-icon name="x"
        /></base-button>
      </header>
      <section class="p-4 flex flex-col items-center">
        <img class="h-8" :src="params.urlIcon" alt="Token Logo" />
        <h3 class="text-2xl font-bold mt-2">{{ props.params?.amount }} VITE</h3>
        <div class="mt-4 flex items-center">
          <div class="p-2 text-left bg-blue-100 rounded-lg">
            <p>From</p>
            {{ compressAddress(active.address, 10) }}
          </div>
          <div
            class="
              h-8
              w-8
              flex
              items-center
              justify-center
              bg-blue-500
              rounded-full
              leading-none
              text-white
            "
          >
            <base-icon name="arrow-right" size="lg"></base-icon>
          </div>
          <div class="p-2 text-right bg-blue-100 rounded-lg">
            <p>To</p>
            {{ compressAddress(props.params?.toAddress, 10) }}
          </div>
        </div>
      </section>
      <footer class="grid grid-cols-2 gap-4 p-4">
        <base-button @click="closeModal" outline>Cancel</base-button>
        <base-button @click="send" :loading="loading">Send</base-button>
      </footer>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, PropType } from 'vue'
import { compressAddress } from '@/helpers/string'
import { useWeb3, SendTokens } from '@/composables/useWeb3'
import useNumbers from '@/composables/useNumbers'
import config from '@/config'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'TxConfirm',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object as PropType<SendTokens>
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const { sendTokens } = useWeb3()
    const { formatUnits } = useNumbers()
    const showModal = ref(false)
    const loading = ref(false)

    const active = computed(() => store.getters['wallets/active'])

    function closeModal() {
      emit('close')
    }

    function send() {
      loading.value = true
      sendTokens({
        toAddress: props.params?.toAddress,
        amount: formatUnits(props.params?.amount, 18),
        tokenId: config.nativeAsset.tokenId
      })
        .then((res) => {
          console.log('✅', res)
          closeModal()
        })
        .catch((e) => {
          console.log('🚨', e)
        })
        .finally(() => {
          loading.value = false
        })
    }

    watch(
      () => props.show,
      (show) => {
        showModal.value = show
      }
    )

    return {
      active,
      showModal,
      closeModal,
      send,
      compressAddress,
      props,
      loading
    }
  }
})
</script>

<style></style>
