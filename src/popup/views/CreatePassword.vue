<template>
  <div class="p-2 h-full flex flex-col justify-between">
    <section>
      <h1 class="text-lg">Create Password</h1>
      <PasswordInput
        v-model="password"
        label="Password"
        placeholder="Input the password"
      />
      <PasswordInput
        v-model="passwordConfirm"
        class="mt-2"
        label="Confirm password"
        placeholder="Input the password"
      />
    </section>
    <section class="w-full p-2 fixed bottom-0 right-0">
      <BaseButton @click="savePassword" block outline> Create </BaseButton>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import PasswordInput from '@/components/PasswordInput.vue'

export default defineComponent({
  name: 'CreatePassword',
  components: {
    PasswordInput
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const password = ref('')
    const passwordConfirm = ref('')

    function savePassword() {
      store.dispatch('auth/storePassword', password.value).finally(() => {
        console.log('stored')
      })
      router.push('/')
    }

    return {
      password,
      passwordConfirm,
      savePassword
    }
  }
})
</script>

<style></style>
