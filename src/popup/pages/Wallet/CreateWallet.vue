<template>
  <div class="p-2">
    <main v-if="scene == 1">
      <section class="h-full">
        <div class="w-full flex items-center justify-center">
          <img
            class="h-16"
            src="assets/images/logo-blue.svg"
            alt="Token Logo"
          />
        </div>
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
          bg-blue-100
          rounded-t-md
        "
      >
        <input type="checkbox" v-model="agree" />

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
        <section class="grid grid-cols-1 gap-y-8">
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
          <div
            class="
              flex
              space-x-3
              rounded-md
              w-full
              p-2
              fixed
              bottom-0
              right-0
              bg-blue-300
            "
          >
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

export default defineComponent({
  name: 'CreateWallet',
  emits: ['nextStep'],
  setup() {
    const store = useStore()
    const router = useRouter()

    let scene = ref(1)
    const wallet = createRandom()
    console.log('✅wallet', wallet)
    const mnemonic = wallet.mnemonic
    const randomMnemonic = computed(() => {
      return mnemonic
        .split(' ')
        .sort(() => Math.round(Math.random() * 100) - 50)
    })
    const accountsNum = computed(() => store.getters['wallets/accountsNum'])
    const agree = ref(false)

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

    return {
      store,
      scene,
      router,
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
<style scoped>
.button-group {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}
.error {
  color: red;
  font-size: 10px;
  margin-top: 5px;
}
.account-name {
  font-size: 1rem;
  color: black;
  margin-bottom: 30px !important;
}
.account-name > input {
  margin-top: 15px !important;
}
.copy-tag {
  color: blue;
}
.check-label {
  font-size: 0.75rem;
  margin: 0.75rem 0 1rem;
  color: #757575;
  cursor: pointer;
}
</style>
