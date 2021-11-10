<template>
  <div class="p-2">
    <main v-if="scene == 1">
      <section class="h-full">
        <BaseWarning name="info">
          Write down or copy this phrase in the correct order and keep it in a
          safe place.
        </BaseWarning>

        <BaseTextarea class="mt-4" v-model="mnemonic" readonly />

        <BaseButton outline class="mt-4" size="xs">
          <BaseIcon class="mr-0.5" size="xs" name="copy" />
          Copy
        </BaseButton>
      </section>
      <section
        class="
          text-sm
          w-full
          p-2
          fixed
          bottom-0
          right-0
          bg-blue-300
          rounded-t-md
        "
      >
        <BaseCheckbox v-model="agree">
          I understand that if you lose your recovery phrase, you will not
          beable to access my funds
        </BaseCheckbox>

        <BaseButton
          color="blue"
          size="lg"
          @click="continueToConfirm"
          :disabled="!agree"
          >Continue</BaseButton
        >
      </section>
    </main>
    <transition name="slide">
      <main v-if="scene == 2" class="confirm_mnemonic">
        <section class="grid grid-cols-1 gap-y-8 p-3">
          <BaseInput
            v-model="name"
            placeholder="Name"
            label="Set the wallet name"
          ></BaseInput>
          <BaseTextarea
            label="You must write the phrase in the correct order"
            v-model="mnemonicForConfirmString"
            readonly
          ></BaseTextarea>
          <ul class="grid grid-cols-3 gap-2 text-center">
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
            <BaseButton
              @click="clearMnemonic"
              color="blue"
              size="lg"
              :disabled="!mnemonicForConfirm.length"
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
import {
  createRandom,
  validatePrivateKey,
  createFromMnemonic
} from '../../../services/AccountService'
import useVuelidate from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'

export default defineComponent({
  name: 'CreateWallet',
  emits: ['nextStep'],
  setup() {
    const store = useStore()
    const router = useRouter()
    let scene = ref(1)
    const wallet = createRandom()
    const mnemonic = wallet.mnemonic
    const randomMnemonic = computed(() => {
      return mnemonic
        .split(' ')
        .sort(() => Math.round(Math.random() * 100) - 50)
    })
    const accountsNum = computed(() => store.getters['wallets/accountsNum'])
    const agree = ref(false)

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

    function continueToConfirm() {
      scene.value = 2
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
      return validatePrivateKey(mnemonicForConfirmString.value)
    })

    const fromMnemonic = computed(() => {
      return createFromMnemonic(mnemonic)
    })

    const name = ref(`Wallet ${accountsNum.value + 1}`)

    function saveWallet() {
      store.dispatch('wallets/storeWallet', {
        name: name.value,
        address: fromMnemonic.value.address,
        privateKey: fromMnemonic.value.privateKey
      })

      router.push('/')
    }

    const passwordVisible = ref(false)
    const repeatPasswordVisible = ref(false)

    return {
      store,
      scene,
      router,
      v$,
      state,
      passwordVisible,
      repeatPasswordVisible,
      mnemonic,
      randomMnemonic,
      continueToConfirm,
      agree,
      wallet,
      name,
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
