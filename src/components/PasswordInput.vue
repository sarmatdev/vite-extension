<template>
  <div class="flex flex-col relative">
    <label
      @click="this.$refs.input.focus()"
      class="absolute left-0 -top-8 py-2 text-base text-gray-600 cursor-pointer"
      >{{ label }}</label
    >
    <div
      :class="{ 'border-blue-300': focusStatus }"
      class="
        flex
        justify-between
        items-center
        p-1
        text-gray-600
        border-2
        rounded-md
      "
    >
      <input
        :value="modelValue"
        @focus="focusChange"
        @blur="focusChange"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="input"
        class="w-full bg-white p-1.5 rounded-lg text-xs outline-none"
        :type="type"
        :placeholder="placeholder"
      />
      <BaseIcon
        v-if="passwordVisible"
        @click="$emit('iconEvent', $event.target)"
        name="eye-off"
        size="sm"
        class="cursor-pointer"
      />
      <BaseIcon
        v-if="!passwordVisible"
        @click="$emit('iconEvent', $event.target)"
        name="eye"
        size="sm"
        class="cursor-pointer"
      />
    </div>
    <ul v-if="errors.length" class="absolute top-10 text-red-400 text-sm">
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
    passwordVisible: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    errors: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props) {
    const { focusStatus, focusChange } = useFocus()
    return {
      focusStatus,
      focusChange
    }
  }
})
</script>
