<template>
  <div :class="`base__warning--${warningType}`" class="base__warning">
    <div :class="`base__warning--${position}__container`">
      <BaseIcon
        :class="`base__warning--${position}__icon`"
        :name="warningType"
      />
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'BaseWarning',
  props: {
    position: {
      type: String,
      default: 'vertically',
      validator: (value: string) => ['vertically', 'horizontal'].includes(value)
    },
    name: {
      type: String,
      default: 'alert-triangle',
      validator: (value: string) => ['info', 'error'].includes(value)
    }
  },
  setup(props) {
    const warningType = computed(() => {
      switch (props.name) {
        case 'info':
          return 'alert-circle'
        case 'error':
          return 'alert-triangle'
        default:
          return 'alert-triangle'
      }
    })
    return {
      warningType
    }
  }
})
</script>

<style lang="scss">
.base__warning {
  @apply rounded-2xl p-2.5 text-xs font-light;
  &--vertically {
    &__container {
      @apply flex flex-col justify-center text-center;
    }
    &__icon {
      @apply w-8 h-8 mx-auto;
    }
  }
  &--horizontal {
    &__container {
      @apply flex items-center;
    }
    &__icon {
      @apply w-8 h-8 my-auto mr-3 p-1;
    }
  }
  &--alert-triangle {
    @apply bg-red-200 text-red-400 bg-opacity-20;
  }
  &--alert-circle {
    @apply bg-yellow-200 text-yellow-400 bg-opacity-20;
  }
}
</style>
