<template>
  <div :tabindex="tabindex" class="base-textarea">
    <label @click="this.$refs.textarea.focus()" class="base-textarea__label">{{
      label
    }}</label>
    <textarea
      class="base-textarea__field"
      :class="{ 'border-blue-300': focusStatus }"
      :value="modelValue"
      @focus="focusChange"
      @blur="focusChange"
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
    tabindex: {
      type: Number,
      default: 0
    },
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

<style lang="scss">
.base-textarea {
  @apply flex flex-col items-start;
  &__label {
    @apply text-gray-600 text-left font-medium cursor-pointer;
  }
  &__field {
    @apply w-full border-2 text-gray-600 px-5 py-2.5 outline-none rounded-md font-medium resize-none h-24;
  }
}
</style>
