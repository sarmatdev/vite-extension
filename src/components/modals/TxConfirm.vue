<template>
  <transition
    enter-active-class="transition duration-200 ease-out transform"
    enter-class="-translate-y-3 scale-95 opacity-0"
    enter-to-class="translate-y-0 scale-100 opacity-100"
    leave-active-class="transition duration-200 ease-in transform"
    leave-class="translate-y-0 opacity-200"
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
        <img
          class="h-8"
          src="@/assets/images/logo-blue1.svg"
          alt="Token Logo"
        />
        <h3 class="text-2xl font-bold mt-2">0.001 VITE</h3>
        <div class="mt-4 flex items-center">
          <div class="p-2 text-left bg-blue-100 rounded-lg">
            <p>From</p>
            {{
              compressAddress('0xd69401e5b2f93eb66e585711ec4cefd6e8c8346d', 5)
            }}
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
            {{
              compressAddress('0xd69401e5b2f93eb66e585711ec4cefd6e8c8346d', 5)
            }}
          </div>
        </div>
      </section>
      <footer class="grid grid-cols-2 gap-4 p-4">
        <base-button @click="closeModal" outline>Cancel</base-button>
        <base-button>Send</base-button>
      </footer>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { compressAddress } from '@/helpers/string'

export default defineComponent({
  name: 'TxConfirm',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const showModal = ref(false)

    function closeModal() {
      console.log('close')
      emit('close')
    }

    watch(
      () => props.show,
      (show) => {
        console.log(show)
        showModal.value = show
      }
    )

    return {
      showModal,
      closeModal,
      compressAddress
    }
  }
})
</script>

<style></style>
