<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="showModal"
      class="
        w-full
        fixed
        z-10
        inset-x-0
        bottom-0
        rounded-t-2xl
        ring-1 ring-gray-300
        bg-white
        h-3/4
        flex flex-col
        justify-between
        px-2
        py-4
        duration-1000
      "
    >
      <header class="border-b py-4 px-2 flex items-center justify-between">
        <h1 class="m-auto">Confirm Transaction</h1>
        <BaseToggle @click="closeModal" icon="x" />
      </header>
      <section class="px-2 flex flex-col items-center">
        <img width="80" :src="token.urlIcon" alt="Token Logo" />
        <h3 class="text-2xl font-bold mt-2">
          {{ props.params?.amount + ' ' + token.originalSymbol }}
        </h3>
        <div class="mt-4 flex space-x-2 relative">
          <div class="p-2 text-left bg-blue-100 rounded-lg">
            <p>From</p>
            {{ compressAddress(currentAddress) }}
          </div>
          <div
            class="
              h-6
              w-6
              flex
              items-center
              justify-center
              bg-blue-500
              rounded-full
              leading-none
              text-white
              absolute
              left-32
              top-4
            "
          >
            <base-icon name="arrow-right" size="sm"></base-icon>
          </div>
          <div class="p-2 text-right bg-blue-100 rounded-lg">
            <p>To</p>
            {{ compressAddress(props.params?.toAddress) }}
          </div>
        </div>
      </section>
      <base-button @click="send" :loading="loading" color="gradient"
        >Сonfirm</base-button
      >
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType, computed } from 'vue'
import { compressAddress } from '@/helpers/string'
import { useWeb3, SendTokens } from '@/composables/useWeb3'
import { useNumbers } from '@/composables/useNumbers'
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
    const { sendTokens } = useWeb3()
    const { formatUnits } = useNumbers()
    const store = useStore()
    const showModal = ref(false)
    const loading = ref(false)
    const currentAddress = computed(
      () => store.getters['wallets/active'].address
    )
    function closeModal() {
      emit('close')
    }
    //@ts-ignore
    const token = computed(() => props.params.token)
    //@ts-ignore
    const toAddress = computed(() => props.params.toAddress)
    //@ts-ignore
    const amount = computed(() => props.params.amount)
    function send() {
      loading.value = true
      sendTokens({
        toAddress: toAddress.value,
        amount: formatUnits(amount.value, 18),
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
      showModal,
      closeModal,
      send,
      compressAddress,
      props,
      loading,
      token,
      currentAddress
    }
  }
})
</script>

<style>
.fade-enter-active {
  animation: fade-in 1s;
}
.fade-leave-active {
  animation: fade-out 1s;
}
@keyframes fade-in {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}

@keyframes fade-out {
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
