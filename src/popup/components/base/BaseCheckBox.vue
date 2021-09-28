<template>
  <div>
    <div class="checkbox-form">
      <div class="answers">
        <label v-for="(option, idx) of options" :key="idx" class="item">
          <span :for="option">{{ option }}</span>
          <input
            :id="option"
            v-model="checked"
            type="checkbox"
            :value="option"
            @change="onChange"
          />
          <span class="checkmark" />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    options: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  setup(_, { emit }) {
    const checked = ref([])

    function onChange() {
      emit('update:modelValue', checked.value)
    }

    return {
      checked,
      onChange
    }
  }
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
