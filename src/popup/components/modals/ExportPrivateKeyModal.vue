<template>
  <BaseModal :open="open" @close="closeModal">
    <template v-slot:header> Export Private Key </template>
    <BaseInput
      @input="lV$.password.$touch"
      v-model="state.password"
      label="Password"
      placeholder="Input the password"
      :errors="unLockErrors"
      passwordInput
    />
    <div class="break-word">{{ privateKey }}</div>
    <template v-slot:footer>
      <div class="flex gap-4 justify-between">
        <BaseButton block outline> Cancel </BaseButton>
        <BaseButton block @click="exportPrivateKey"> Export </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeUnmount, reactive } from 'vue'
import { useStore } from 'vuex'
import { useValidate } from '../../composables/useValidate'
import { decryptKeyStore } from '../../../services/CryptoService'

export default defineComponent({
  name: 'ExportPrivaKeyModal',
  setup() {
    const store = useStore()

    const open = ref(false)
    const state = reactive({ password: '' })
    const privateKey = ref('')

    const password = computed(() => store.getters['settings/password'])
    const active = computed(() => store.getters['wallets/active'])

    const { lV$, unLockErrors } = useValidate(state)

    function closeModal() {
      open.value = false
    }

    function exportPrivateKey() {
      if (!lV$.value.password.$error) {
        privateKey.value = decryptKeyStore(
          active.value.keystore,
          password.value
        )
      }
    }

    onBeforeUnmount(() => {
      state.password = ''
      privateKey.value = ''
    })

    return {
      open,
      closeModal,
      exportPrivateKey,
      state,
      privateKey,
      lV$,
      unLockErrors
    }
  }
})
</script>

<style></style>
