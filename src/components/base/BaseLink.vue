<template>
  <div class="text-base font-semibold text-center w-full">
    <span
      :class="active ? 'text-white ' : 'text-blue-500'"
      class="w-full cursor-pointer"
    >
      <p class="py-3"><slot /></p>
      <hr
        :class="active ? 'bg-white' : 'bg-blue-500'"
        class="border-none h-0.5"
    /></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseLink',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
})
</script>
