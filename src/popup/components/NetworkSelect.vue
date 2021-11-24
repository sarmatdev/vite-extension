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
          py-1
          text-left
          cursor-pointer
          focus:outline-none
          focus:ring-1
          focus:ring-blue-500
          focus:border-blue-500
          text-sm
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
            p-1
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
                active ? 'text-white rounded-md bg-blue-500' : 'text-gray-900',
                'cursor-pointer select-none relative py-1 pl-3 pr-9'
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
import { defineComponent, ref, watch, computed, watchEffect } from 'vue'
import { useWeb3 } from '@/composables/useWeb3'
import config from '@/config'
import { useStore } from 'vuex'
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
    const store = useStore()
    const active = computed(() => store.getters['wallets/active'])

    const selected = ref(null)
    watchEffect(() =>
      store.getters['network/network']
        ? (selected.value = store.getters['network/network'])
        : (selected.value = config.networks[0])
    )
    watch(
      selected,
      () => {
        store.commit('settings/setLoaded', false)
        store.commit('network/setNetwork', selected.value)
        web3.handleNetworkChanged(selected.value)
        web3.fetchFullTokenInfo(active.value.address)
        web3.getTxsList(active.value.address)
        setTimeout(() => {
          store.commit('settings/setLoaded', true)
        }, 1000)
      },
      { immediate: true }
    )

    return {
      selected,
      networks: config.networks
    }
  }
})
</script>
