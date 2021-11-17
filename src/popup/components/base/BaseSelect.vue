<template>
  <div
    class="mt-10 relative w-full text-center outline-none"
    :tabindex="tabindex"
    @blur="open = false"
  >
    <label
      @click="open = true"
      class="absolute left-0 -top-8 py-2 text-base text-black cursor-pointer"
      >{{ label }}</label
    >

    <div
      class="text-black py-2 border-2 rounded-md cursor-pointer"
      :class="{ 'border-blue-500': open }"
      @click="open = !open"
    >
      {{ !selected ? placeholder : selected }}
      <BaseIcon
        class="absolute right-3 top-3 z-20 transition-all"
        :class="{ 'transform rotate-180': open }"
        name="chevron-down"
      />
    </div>

    <div
      class="
        rounded-md
        absolute
        left-0
        right-0
        top-12
        z-10
        bg-white
        shadow-select
        overflow-hidden
      "
      :class="{ hidden: !open }"
    >
      <div
        class="py-2 select-none text-black cursor-pointer hover:bg-blue-300"
        v-for="(option, idx) of options"
        :key="idx"
        @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
  name: 'BaseSelect',
  props: {
    label: String,
    modelValue: String,
    options: {
      type: Array,
      required: true
    },
    tabindex: {
      type: Number,
      default: 0
    },
    placeholder: String
  },
  setup(props, { emit }) {
    const selected = ref(null)
    const open = ref(false)

    function selectOption(option: any): void {
      selected.value = option
      open.value = false
      emit('update:modelValue', option)
    }

    return {
      selected,
      open,
      selectOption
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-select {
  @apply relative w-full text-center outline-none;
}

.items {
  @apply rounded-b-md absolute left-0 right-0 top-7 bg-white border-2 border-t-0 border-blue-300 overflow-hidden;
}

.item {
  padding-left: 8px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #b68a28;
  }
}
</style>
