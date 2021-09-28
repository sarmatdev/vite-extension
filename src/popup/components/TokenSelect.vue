<template>
  <div
    class="relative"
    @click="showSelect = !showSelect"
    v-click-outside="closeSelect"
  >
    <base-input v-bind="$props" icon="chevron-down" />
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="showSelect"
        class="
          w-full
          py-1
          px-2
          bg-white
          rounded-md
          border-2
          absolute
          top-16
          right-0
        "
      >
        LIST
      </div>
    </transition>
  </div>

  <!-- <div class="flex flex-col relative">
    <label class="text-base text-gray-600 cursor-pointer" v-if="label">{{
      label
    }}</label>
    <div
      @click="showSelect = !showSelect"
      class="
        flex
        justify-between
        items-center
        cursor-pointer
        h-10
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
        @click="$emit('iconEvent', $event.target)"
        :name="icon"
        size="sm"
        class="cursor-pointer"
      />
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="showSelect"
        class="
          w-full
          p-1
          bg-pink-50
          rounded-md
          border-2
          absolute
          top-16
          right-0
        "
      >
        LIST
      </div>
    </transition>
  </div> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TokenSelect',
  props: {
    label: {
      type: String
    }
  },
  setup() {
    const showSelect = ref(false)

    function closeSelect() {
      showSelect.value = false
    }

    return {
      showSelect,
      closeSelect
    }
  }
})
</script>

<style></style>
