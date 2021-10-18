<template>
  <section class="p-2 absolute inset-0 bg-white">
    <div class="text-left mt-32">
      <div class="flex items-center">
        <h1 class="text-gray-600 text-base font-black cursor-default">
          Welcome back to
        </h1>
        <img
          class="ml-2"
          :src="require('@/assets/images/vite-logo.png')"
          width="90"
          alt="Welcome Image"
        />
      </div>
      <p>Secure and trusted crypto wallet</p>
    </div>
    <div
      class="
        fixed
        px-2
        py-10
        space-y-5
        inset-x-0
        bottom-0
        rounded-t-2xl
        bg-blue-200
        flex flex-col
      "
    >
      <PasswordInput
        @input="lV$.password.$touch"
        v-model="state.password"
        label="Password"
        placeholder="Input the password"
        :errors="unLockErrors"
      />
      <BaseButton @click="unLock" color="blue" size="lg" block
        >Unlock</BaseButton
      >
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import PasswordInput from '@/components/PasswordInput.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import useValidate from '@/composables/useValidate'

export default defineComponent({
  name: 'Lock',
  components: {
    PasswordInput
  },
  setup() {
    const router = useRouter()

    const state = reactive({
      password: ''
    })

    const store = useStore()

    const { lV$, unLockErrors } = useValidate(state)

    function unLock(): void {
      lV$.value.$touch()
      if (!lV$.value.password.$error) {
        store.dispatch('settings/storeIsLocked', false).finally(() => {
          console.log('stored')
        })
        router.push('/home')
      }
    }

    return {
      state,
      lV$,
      unLockErrors,
      unLock
    }
  }
})
</script>
