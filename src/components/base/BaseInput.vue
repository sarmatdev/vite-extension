<template>
  <div class="flex flex-col">
    <label
      @click="this.$refs.input.focus()"
      class="text-base text-gray-600 cursor-pointer"
      v-if="label"
      >{{ label }}</label
    >
    <div
      :class="{ 'border-blue-300': focusStatus }"
      class="
        flex
        justify-between
        items-center
        p-1
        bg-white
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
        v-if="icon"
        @click="$emit('iconEvent', $event.target)"
        :name="icon"
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
    icon: String,
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
