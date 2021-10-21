<template>
  <div class="max-w-sm mx-auto cursor-pointer">
    <label class="inline-flex items-center cursor-pointer">
      <input
        @change="$emit('update:modelValue', $event.target.checked)"
        v-bind="$attrs"
        type="checkbox"
        class="
          cursor-pointer
          text-blue-500
          w-4
          h-4
          mr-2
          focus:ring-blue-400 focus:ring-opacity-25
          border border-gray-300
          rounded
        "
      />
      <slot />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue', 'change']
})
</script>

<style scoped>
.checkbox-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.checkbox-form .answers {
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
}

.checkbox-form label {
  margin-left: 1em;
}

.checkbox-form .item {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 1em;
  height: 25px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
}

.checkbox-form .item input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-form .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  @apply border-2 border-gray-400;
}

.checkbox-form .item input:checked ~ .checkmark {
  @apply border-blue-300;
}

.checkbox-form .checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.checkbox-form .item input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-form .item .checkmark:after {
  @apply border-2 border-blue-400 left-1.5 top-0.5;
  width: 8px;
  height: 12px;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
