<template>
  <div class="p-2 h-full">
    <section class="flex flex-col space-y-6 mt-10">
      <h1>Create Password</h1>
      <p class="text-center mx-8 ">
        Save the password to a safe place. You will need it to unlock your
        wallet.
      </p>
      <PasswordInput
        @input="cpV$.password.$touch"
        v-model="state.password"
        label="Password"
        placeholder="Input the password"
        :errors="passwordErrors"
      />
      <PasswordInput
        @input="cpV$.repeatPassword.$touch"
        v-model="state.repeatPassword"
        class="mt-2"
        label="Confirm password"
        placeholder="Confirm the password"
        :errors="repeatPasswordErrors"
      />
    </section>
    <section
      class="w-full px-4 py-8 fixed bottom-0 right-0 rounded-xl bg-blue-300"
    >
      <BaseButton @click="savePassword" block color="blue"> Create </BaseButton>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import PasswordInput from '@/components/PasswordInput.vue'
import useValidate from '@/composables/useValidate'

export default defineComponent({
  name: 'CreatePassword',
  components: {
    PasswordInput
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const state = reactive({
      password: 'qwertyqwe',
      repeatPassword: 'qwertyqwe'
    })

    const { cpV$, passwordErrors, repeatPasswordErrors } = useValidate(state)

    function savePassword() {
      cpV$.value.$touch()
      if (!cpV$.value.password.$error && !cpV$.value.repeatPassword.$error) {
        store.dispatch('settings/storePassword', state.password).finally(() => {
          console.log('stored')
          router.push(route.redirectedFrom)
        })
      }
    }

    return {
      cpV$,
      state,
      savePassword,
      passwordErrors,
      repeatPasswordErrors
    }
  }
})
</script>

<style></style>
