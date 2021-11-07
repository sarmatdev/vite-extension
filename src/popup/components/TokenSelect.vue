<template>
  <label class="block pl-1 font-semibold cursor-pointer text-gray-700"
    >Select token</label
  >
  <Listbox v-model="selectedToken" v-slot="{ open }">
    <div class="relative mt-1">
      <ListboxButton
        :class="open ? 'ring-blue-300' : 'ring-gray-300'"
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
          ring-1
          cursor-pointer
          transition
          duration-150
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

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
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
            shadow-lg
            max-h-60
            ring-1 ring-black ring-opacity-5
            focus:outline-none
            sm:text-sm
            z-50
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
                active ? 'text-amber-900 bg-blue-100' : 'text-gray-900',
                'cursor-pointer select-none relative py-2 border-t px-4 flex items-center'
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
      </transition>
    </div>
  </Listbox>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'

export default {
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

    const tokens = computed(() => {
      return store.getters['account/vitexTokens']
    })
    const selectedToken = ref(null)
    const selectedValue = computed(() => {
      return selectedToken.value ? selectedToken.value : tokens.value[0]
    })

    watchEffect(() => {
      emit('update:modelValue', selectedValue.value)
    })

    return {
      tokens,
      selectedToken,
      selectedValue
    }
  }
}
</script>
