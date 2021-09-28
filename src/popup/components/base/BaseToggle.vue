<template>
  <div
    @click="this.$router.push(to)"
    class="
      bg-blue-300
      rounded-lg
      w-10
      h-10
      flex
      justify-center
      items-center
      cursor-pointer
      transition
      duration-100
      ease-in-out
      hover:bg-blue-400
    "
  >
    <BaseIcon class="text-black" :name="icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseToggle',
  props: {
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
})
</script>
