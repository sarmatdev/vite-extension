/* eslint-disable prettier/prettier */ /* eslint-disable prettier/prettier */
<template>
  <div class="base-icon inline-block">
    <img
      :src="require(`@/assets/icons/${name}.svg`)"
      :width="iconSize"
      :height="iconSize"
      :alt="`${name} icon`"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'BaseIcon',
  props: {
    name: { type: String, required: true },
    size: {
      type: String,
      default: 'md',
      validator: (val: string): boolean => {
        return ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'].includes(val)
      }
    }
  },
  setup(props) {
    const iconSize = computed(() => {
      switch (props.size) {
        case 'xxs':
          return '8'
        case 'xs':
          return '12'
        case 'sm':
          return '16'
        case 'lg':
          return '24'
        case 'xl':
          return '28'
        default:
          return '20'
      }
    })

    return { iconSize }
  }
})
</script>
