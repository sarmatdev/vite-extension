<template>
  <div
    class="mt-10 relative w-full text-center outline-none"
    :tabindex="tabindex"
    @blur="open = false"
  >
    <label
      @click="open = true"
      class="absolute left-0 -top-8 py-2 text-base text-gray-600 cursor-pointer"
      >{{ label }}</label
    >

    <div
      class="p-1 text-gray-600 border-2 rounded-md cursor-pointer"
      :class="{ 'border-2 border-blue-300 border-b-0': open }"
      @click="open = !open"
    >
      {{ !selected ? options[0] : selected }}
      <BaseIcon
        class="absolute right-2 top-2"
        :class="{ 'transform rotate-180': open }"
        name="chevron-down"
      />
    </div>

    <div
      class="
        rounded-b-md
        absolute
        left-0
        right-0
        top-7
        bg-white
        border-2 border-t-0 border-blue-300
        overflow-hidden
      "
      :class="{ hidden: !open }"
    >
      <div
        class="p-l-4 select-none cursor-pointer hover:bg-blue-300"
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
    }
  },
  setup(props, { emit }) {
    const selected = ref(null)
    const open = ref(false)

    function selectOption(option: any): void {
      selected.value = option
      open.value = false
      emit('update:modelValue', option)
    }

    onMounted(() => {
      emit('update:modelValue', props.options[0])
    })

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
