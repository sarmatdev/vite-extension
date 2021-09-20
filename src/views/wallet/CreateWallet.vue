<template>
  <div>
    <div class="text-center p-2 mb-2">
      <h1 class="text-gray-600 text-2xl font-black cursor-default">
        Wallet creation
      </h1>
      <div class="flex justify-around items-center mx-6">
        <span
          class="cursor-default"
          :class="step == 1 ? 'font-bold' : 'font-light'"
          >Create mnemonic</span
        >
        <BaseIcon name="chevron-right" />
        <span
          class="cursor-default"
          :class="step == 2 ? 'font-bold' : 'font-light'"
          >Confirm mnemonic</span
        >
      </div>
    </div>
    <main v-if="step == 1" class="create_wallet">
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
    <transition name="slide">
      <main v-if="step == 2" class="confirm_mnemonic">
        <section class="text-center grid grid-cols-1 gap-y-8 p-3">
          <BaseInput
            v-model="walletName"
            placeholder="Name"
            label="Set the wallet name"
          ></BaseInput>
          <BaseTextarea
            label="You must write the phrase in the correct order"
            v-model="mnemonicForConfirmString"
          ></BaseTextarea>
          <ul class="grid grid-cols-3 gap-2">
            <li
              v-for="(mnemonicItem, idx) in randomMnemonic"
              :key="idx"
              @click="addMnemonic(mnemonicItem)"
              :disabled="mnemonicForConfirm.includes(mnemonicItem)"
              :class="
                mnemonicForConfirm.includes(mnemonicItem)
                  ? 'bg-gray-300 cursor-default'
                  : 'cursor-pointer hover:border-blue-300'
              "
              class="border text-gray-600 rounded-xl"
            >
              {{ mnemonicItem }}
            </li>
          </ul>
          <div class="flex space-x-3">
            <BaseButton @click="clearMnemonic" color="blue" size="lg"
              >Clear</BaseButton
            >
            <BaseButton
              @click="saveWallet"
              color="blue"
              size="lg"
              :disabled="!mnemonicConfirmed"
              >Create Wallet</BaseButton
            >
          </div>
        </section>
      </main>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { createRandom, validateMnemonic } from '@/services/account'
import useVuelidate from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'

export default defineComponent({
  name: 'CreateWallet',
  emits: ['nextStep'],
  setup() {
    const store = useStore()
    const router = useRouter()
    let step = ref(1)
    const wallet = createRandom()
    const mnemonic = wallet.mnemonic
    const randomMnemonic = computed(() => {
      return mnemonic
        .split(' ')
        .sort(() => Math.round(Math.random() * 100) - 50)
    })
    console.log(mnemonic)
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

    function continueToConfirm() {
      v$.value.$touch()
      if (!v$.value.password.$error && !v$.value.repeatPassword.$error) {
        step.value = 2
      }
    }

    const mnemonicForConfirm = ref([])
    const mnemonicForConfirmString = computed(() => {
      return mnemonicForConfirm.value.join(' ')
    })

    function clearMnemonic() {
      mnemonicForConfirm.value = []
    }

    function addMnemonic(item: string): void {
      //@ts-ignore
      if (!mnemonicForConfirm.value.includes(item)) {
        //@ts-ignore
        mnemonicForConfirm.value.push(item)
      }
    }

    const mnemonicConfirmed = computed(() => {
      return validateMnemonic(mnemonicForConfirm.value.join(' '))
    })

    const nextWalletName = computed(() => {
      return `Wallet ${store.getters['wallets/accountsNum']}`
    })
    const walletName = ref(nextWalletName.value)

    function saveWallet() {
      store.dispatch('wallets/storeWallet', {
        name: walletName.value,
        address: mnemonicConfirmed.value.address,
        privateKey: mnemonicConfirmed.value.privateKey
      })

      router.push('/')
    }

    return {
      store,
      step,
      router,
      v$,
      state,
      mnemonic,
      randomMnemonic,
      continueToConfirm,
      agree,
      passwordErrors,
      repeatPasswordErrors,
      walletName,
      mnemonicForConfirm,
      clearMnemonic,
      addMnemonic,
      mnemonicForConfirmString,
      mnemonicConfirmed,
      saveWallet
    }
  }
})
</script>

<style>
.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>
