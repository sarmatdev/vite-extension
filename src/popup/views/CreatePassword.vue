<template>
  <div class="p-2 h-full">
    <section class="flex flex-col space-y-6 mt-10">
      <h1 class="text-gray-600 text-2xl font-black text-center cursor-default">
        Create Password
      </h1>
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
      class="
        px-2
        py-8
        fixed
        inset-x-0
        bottom-0
        rounded-t-2xl
        bg-blue-200
        flex
        items-center
      "
    >
      <BaseButton @click="savePassword" block color="blue"> Create </BaseButton>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
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

    const state = reactive({
      password: '',
      repeatPassword: ''
    })

    const { cpV$, passwordErrors, repeatPasswordErrors } = useValidate(state)

    function savePassword() {
      cpV$.value.$touch()
      if (!cpV$.value.password.$error && !cpV$.value.repeatPassword.$error) {
        store.dispatch('settings/storePassword', state.password).finally(() => {
          console.log('stored')
        })
        router.push('/home')
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
