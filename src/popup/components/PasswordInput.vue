<template>
  <BaseInput
    :icon="inputIcon"
    :type="inputType"
    :errors="errors"
    @iconEvent="showPassword = !showPassword"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'PasswordInput',
  props: {
    errors: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const showPassword = ref(false)

    const inputType = computed(() => {
      return showPassword.value ? 'text' : 'password'
    })
    const inputIcon = computed(() => {
      return showPassword.value ? 'eye-off' : 'eye'
    })

    return {
      showPassword,
      inputType,
      inputIcon
    }
  }
})
</script>
