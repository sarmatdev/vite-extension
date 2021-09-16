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
        v-if="icon"
        @click="this.$refs.input.focus()"
        :name="icon"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    }
  },
  setup() {
    let focusStatus = ref(false)
    function focusChange() {
      focusStatus.value = !focusStatus.value
    }

    return {
      focusStatus,
      focusChange
    }
  }
})
</script>
