<template>
  <div class="relative">
    <label
      for="input"
      class="block pl-1 font-semibold cursor-pointer text-gray-700"
      >{{ label }}</label
    >
    <div class="relative rounded-md shadow-sm">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="input"
        class="
          block
          w-full
          pr-10
          border-gray-300
          font-medium
          text-sm text-gray-900
          placeholder-gray-400
          transition-all
          focus:outline-none focus:ring-blue-500 focus:border-blue-500
          caret-blue-600
          hover:ring-gray-900 hover:border-gray-900
          rounded-md
        "
        :type="type"
        :placeholder="placeholder"
      />
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <BaseIcon
          v-if="icon"
          @click="$emit('iconEvent', $event.target)"
          :name="icon"
          class="h-4 w-4 cursor-pointer"
          aria-hidden="true"
        />
      </div>
    </div>
    <ul
      v-if="errors.length"
      class="absolute left-0 -bottom-5 font-medium text-sm text-red-600"
    >
      <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useFocus from '@/composables/useFocus'
export default defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: [String, Number],
    label: String,
    placeholder: String,
    icon: String,
    type: {
      type: String,
      default: 'text'
    },
    disabled: String,
    errors: {
      type: Array,
      default: () => {
        return []
      }
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
