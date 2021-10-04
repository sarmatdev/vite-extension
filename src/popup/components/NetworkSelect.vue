<template>
  <Listbox class="w-32" as="div" v-model="selected">
    <div class="mt-1 relative">
      <ListboxButton
        class="
          relative
          w-full
          bg-white
          border border-gray-300
          rounded-md
          shadow-sm
          pl-3
          pr-10
          py-2
          text-left
          cursor-pointer
          focus:outline-none
          focus:ring-1
          focus:ring-blue-500
          focus:border-blue-500
          sm:text-sm
        "
      >
        <div class="flex items-center">
          <span
            :aria-label="selected.isConnected ? 'Online' : 'Offline'"
            :class="[
              selected.isConnected ? 'bg-green-400' : 'bg-red-400',
              'flex-shrink-0 inline-block h-2 w-2 rounded-full'
            ]"
          />
          <span class="ml-3 block truncate">{{ selected.name }}</span>
        </div>
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
          <BaseIcon name="chevron-down" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="
            absolute
            z-10
            mt-1
            w-full
            bg-white
            shadow-lg
            max-h-60
            rounded-md
            py-1
            text-base
            ring-1 ring-black ring-opacity-5
            overflow-auto
            focus:outline-none
            sm:text-sm
          "
        >
          <ListboxOption
            as="template"
            v-for="network in networks"
            :key="network.id"
            :value="network"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'text-white bg-blue-600' : 'text-gray-900',
                'cursor-pointer select-none relative py-2 pl-3 pr-9'
              ]"
            >
              <div class="flex items-center">
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-normal',
                    ' block truncate'
                  ]"
                >
                  {{ network.name }}
                </span>
              </div>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-blue-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4'
                ]"
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

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useWeb3 } from '@/composables/useWeb3'
import config from '@/config'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'

export default defineComponent({
  components: {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
  },
  setup() {
    const web3 = useWeb3()

    const selected = ref(config.networks[0])

    watch(selected, () => {
      web3.handleNetworkChanged(selected)
    })

    return {
      selected,
      networks: config.networks
    }
  }
})
</script>
