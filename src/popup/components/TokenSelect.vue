<template>
  <Listbox v-model="selectedToken" v-slot="{ open }">
    <div class="relative">
      <label class="font-semibold cursor-pointer text-black absolute -top-7"
        >Select token</label
      >
      <ListboxButton
        :class="open ? 'border-blue-500' : 'border-gray-300 hover:border-black'"
        class="
          relative
          w-full
          flex
          items-center
          py-2
          pl-3
          pr-10
          text-left
          rounded-lg
          shadow-md
          ring-0
          border
          cursor-pointer
          focus:outline-none
          transition-all
        "
      >
        <img class="h-8 mr-2" :src="selectedValue.urlIcon" alt="" />
        <span class="block truncate flex-center">
          <span class="text-base mr-2 text-black font-medium">
            {{ selectedValue.originalSymbol }}
          </span>
          <span class="text-sm text-gray-400">
            {{ selectedValue.name }}
          </span>
        </span>
        <span
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            pointer-events-none
          "
        >
          <BaseIcon
            :class="[
              {
                'transform rotate-180': open
              },
              'transition duration-150'
            ]"
            name="chevron-down"
          />
        </span>
      </ListboxButton>

      <ListboxOptions
        class="
          absolute
          w-full
          py-1
          mt-1
          overflow-auto
          text-base
          bg-white
          rounded-md
          shadow-select
          max-h-60
          ring-1 ring-black ring-opacity-5
          focus:outline-none
          sm:text-sm
        "
      >
        <ListboxOption
          v-slot="{ active, selected }"
          v-for="token in tokens"
          :key="token.tokenId"
          :value="token"
          as="template"
        >
          <li
            :class="[
              active ? 'text-amber-900 bg-blue-100' : 'text-gray-900 bg-white',
              'cursor-pointer select-none relative py-2 border-t px-4 flex items-center z-10 '
            ]"
          >
            <img class="h-8 mr-2" :src="token.urlIcon" alt="" />
            <span
              :class="[
                selected ? 'font-medium ' : 'font-normal',
                'block truncate'
              ]"
            >
              <p class="text-base mr-2 text-black font-medium">
                {{ token.originalSymbol }}
              </p>
              <p class="text-sm text-gray-400">
                {{ token.name }}
              </p>
              <span>{{ forPrice(token.price) }}</span>
            </span>
            <span
              v-if="selected"
              class="
                absolute
                inset-y-0
                right-0
                flex
                items-center
                pr-3
                text-black
              "
            >
              <BaseIcon name="check" />
            </span>
          </li>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  ComputedRef,
  onMounted
} from 'vue'
import { useStore } from 'vuex'
import { IVitexToken } from '@/types'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import usePrices from '@/composables/usePrices'

export default defineComponent({
  name: 'TokenSelect',
  props: {
    modelValue: Object
  },
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption
  },

  setup(_, { emit }) {
    const store = useStore()

    const tokens: ComputedRef<Array<IVitexToken>> = computed(() => {
      return store.getters['account/fullTokenInfo']
    })
    const selectedToken = ref(null)
    const selectedValue = computed(() => {
      return selectedToken.value ? selectedToken.value : tokens.value[0]
    })
    onMounted(() => emit('update:modelValue', selectedValue.value))
    watch(selectedValue, () => {
      emit('update:modelValue', selectedValue.value)
    })

    const { forPrice } = usePrices()

    return {
      tokens,
      selectedToken,
      selectedValue,
      forPrice
    }
  }
})
</script>
