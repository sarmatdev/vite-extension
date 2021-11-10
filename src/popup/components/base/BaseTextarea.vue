<template>
  <div>
    <label class="block pl-1 font-medium cursor-pointer text-gray-700">{{
      label
    }}</label>
    <textarea
      class="
        block
        w-full
        border-gray-300
        font-medium
        text-grey-900
        placeholder-gray-400
        focus:outline-none focus:ring-blue-500 focus:border-blue-500
        caret-blue-600
        rounded-md
      "
      :class="{ 'border-blue-300': focusStatus }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      ref="textarea"
      type="text"
      :placeholder="placeholder"
      :readonly="readonly"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useFocus from '@/composables/useFocus'
export default defineComponent({
  name: 'BaseTextarea',
  props: {
    modelValue: [String, Number],
    placeholder: String,
    label: String,
    readonly: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { focusStatus, focusChange } = useFocus()
    return {
      focusStatus,
      focusChange
    }
  }
})
</script>
