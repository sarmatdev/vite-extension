import { network } from '@/types'

export interface NetworkState {
  network: network
}

const state = {
  network: {
    id: 0,
    name: '',
    httpUrl: '',
    wsUrl: '',
    httpVitex: ''
  }
}

const mutations = {
  setNetwork(state: NetworkState, network: network) {
    state.network = network
  }
}

const actions = {}
const getters = {
  network: (s: NetworkState) => s.network
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
