<template>
  <div class="home">
    <BaseInput icon="search" placeholder="take" />
    <BaseSelect label="For Example" :options="[1, 2, 3, 4, 5]" />
    <BaseCheckBox
      label="For Example"
      placeholder="take"
      v-model="number"
      :options="['I confirm declaration']"
    />
    <BaseTextarea label="For Example" placeholder="take" class="mx-2" />
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    const number = ref(null)
    return {
      number
    }
  }
})
</script>
