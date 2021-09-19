<template>
  <main class="create_wallet">
    <section class="text-center grid grid-cols-1 gap-y-4 mb-6">
      <div class="p-2">
        <BaseInput
          v-model="state.password"
          @input="v$.password.$touch()"
          class="mt-6 mb-14"
          placeholder="Input the password"
          label="Password"
          :errors="passwordErrors"
        />
        <BaseInput
          v-model="state.repeatPassword"
          @input="v$.repeatPassword.$touch()"
          placeholder="Confirm the password"
          label="Confirm password"
          :errors="repeatPasswordErrors"
        />
      </div>
      <p class="text-sm mx-2.5">
        Write down or copy this phrase in the correct order and keep it in a
        safe place.
      </p>
      <BaseTextarea class="mx-6" v-model="mnemonic" readonly />
      <button
        class="
          mx-auto
          text-blue-600
          px-1
          flex
          justify-between
          items-center
          hover:text-blue-500
        "
      >
        <BaseIcon class="mr-0.5" name="copy" />
        Copy
      </button>
    </section>
    <div class="text-sm p-2">
      <BaseCheckBox
        class="mb-2"
        v-model="agree"
        :options="[
          'I understand that if you lose your recovery phrase, you will not beable to access my funds'
        ]"
      />

      <BaseButton
        color="blue"
        size="lg"
        @click="continueToConfirm"
        :disabled="!agree.length"
        >Continue</BaseButton
      >
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { createRandom } from '@/services/account'
import useVuelidate from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'

export default defineComponent({
  name: 'CreateWallet',
  emits: ['nextStep'],
  setup(_, { emit }) {
    const wallet = createRandom()
    const mnemonic = wallet.mnemonics
    const agree = ref([])

    const state = reactive({
      password: '',
      repeatPassword: ''
    })
    const rules = computed(() => {
      const localRules = {
        password: { required, minLength: minLength(8) },
        repeatPassword: {
          required,
          sameAs: sameAs(state.password)
        }
      }

      return localRules
    })
    const v$ = useVuelidate(rules, state)

    const passwordErrors = computed(() => {
      const errors: Array<string> = []
      if (v$.value.password.$dirty) {
        if (!v$.value.password.required.$response) {
          errors.push('This field is required.')
        }
        if (!v$.value.password.minLength.$response) {
          errors.push('Min legth 8')
        }
      }
      return errors
    })

    const repeatPasswordErrors = computed(() => {
      const errors: Array<string> = []
      if (v$.value.repeatPassword.$dirty) {
        if (
          !v$.value.repeatPassword.required.$response &&
          v$.value.repeatPassword.sameAs.$response
        ) {
          errors.push('This field is required.')
        }
        if (!v$.value.repeatPassword.sameAs.$response) {
          errors.push('Password mismath')
        }
      }
      return errors
    })

    async function continueToConfirm() {
      v$.value.$touch()
      if (!v$.value.password.$error && !v$.value.repeatPassword.$error) {
        emit('nextStep', 2)
      }
    }

    return {
      v$,
      state,
      mnemonic,
      continueToConfirm,
      agree,
      passwordErrors,
      repeatPasswordErrors
    }
  }
})
</script>
