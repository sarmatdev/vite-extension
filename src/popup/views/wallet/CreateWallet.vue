<template>
  <div class="p-2">
    <h1 class="my-4">Create wallet</h1>
    <main v-if="scene == 1">
      <section class="h-full w-full flex flex-col space-y-4">
        <BaseWarning name="info">
          Write down or copy this phrase in the correct order and keep it in a
          safe place.
        </BaseWarning>

        <BaseTextarea
          label="Your recovery phrase"
          class="mt-4"
          v-model="mnemonic"
          readonly
        />

        <BaseButton color="gradient" rounded size="s" class="mx-auto">
          <BaseIcon class="mr-0.5" size="s" name="copy" />
          Copy
        </BaseButton>
        <BaseCheckbox v-model="agree">
          I understand that if i lose my recovery phrase, i will not beable to
          access my funds.
        </BaseCheckbox>
      </section>
      <section
        class="
          text-sm
          w-full
          px-4
          py-8
          fixed
          bottom-0
          right-0
          bg-blue-300
          rounded-t-md
        "
      >
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
          <ul class="space-x-2 flex flex-wrap justify-center">
            <li
              v-for="(mnemonicItem, idx) in randomMnemonic"
              :key="idx"
              @click="addMnemonic(mnemonicItem)"
              :disabled="mnemonicForConfirm.includes(mnemonicItem)"
              :class="
                mnemonicForConfirm.includes(mnemonicItem)
                  ? 'bg-gray-300 cursor-default'
                  : 'cursor-pointer btn-grad'
              "
              class="border text-gray-600 rounded-2xl py-1 px-4 mb-2"
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
import { defineComponent, ref, computed } from 'vue'
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
    console.log(mnemonic)

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

.btn-grad {
  background-image: linear-gradient(
    to right,
    #000046 0%,
    #1cb5e0 51%,
    #000046 100%
  );
}

.btn-grad {
  background-image: linear-gradient(
    to right,
    #1fa2ff 0%,
    #12d8fa 51%,
    #1fa2ff 100%
  );
}

.btn-grad {
  background-image: linear-gradient(
    to right,
    #1c92d2 0%,
    #f2fcfe 51%,
    #1c92d2 100%
  );
}
.btn-grad {
  transition: 0.5s;
  background-size: 200% auto;
  box-shadow: 0 0 20px #eee;
}

.btn-grad:hover {
  background-position: right center; /* change the direction of the change here */
}
</style>
