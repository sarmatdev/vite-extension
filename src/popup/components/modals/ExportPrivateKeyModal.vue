<template>
  <BaseModal :open="open" @close="closeModal">
    <template v-slot:header> Export Private Key </template>
    <template v-slot:default>
      <BaseInput
        passwordInput
        label="Password"
        placeholder="Password"
        v-model="passwordConfirm"
      />
      <div class="break-word">{{ privateKey }}</div>
    </template>
    <template v-slot:footer>
      <div class="flex gap-4 justify-between">
        <BaseButton block outline> Cancel </BaseButton>
        <BaseButton block @click="exportPrivateKey"> Export </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

import { decryptKeyStore } from '../../../services/CryptoService'

export default defineComponent({
  name: 'ExportPrivaKeyModal',
  setup() {
    const store = useStore()

    const open = ref(false)
    const passwordConfirm = ref('')
    const privateKey = ref('')

    const password = computed(() => store.getters['settings/password'])
    const active = computed(() => store.getters['wallets/active'])

    const isPasswordValid = computed(
      () => password.value === passwordConfirm.value
    )

    function closeModal() {
      open.value = false
    }

    function exportPrivateKey() {
      if (isPasswordValid.value) {
        privateKey.value = decryptKeyStore(
          active.value.keystore,
          password.value
        )
      }
    }

    onBeforeUnmount(() => {
      passwordConfirm.value = ''
      privateKey.value = ''
    })

    return {
      open,
      closeModal,
      exportPrivateKey,
      passwordConfirm,
      privateKey
    }
  }
})
</script>

<style></style>
