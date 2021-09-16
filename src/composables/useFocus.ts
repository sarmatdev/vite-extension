import { ref } from 'vue'

export default function useFocus() {
  const focusStatus = ref(false)
  function focusChange() {
    focusStatus.value = !focusStatus.value
  }

  return {
    focusStatus,
    focusChange
  }
}
