<template>
  <header class="header">
    <div class="header-top">
      <router-link class="header-logo" to="/home">
        <img src="images/harmony-small.png" alt="Harmony" />
        <span>Harmony</span>
      </router-link>
      <div class="header-lock">
        <a
          v-if="wallets.accounts.length > 0"
          @click="lockWallet"
          v-tooltip.bottom="'Lock wallet'"
        >
          <i class="material-icons">lock</i>
        </a>
      </div>

      <div class="network" v-click-outside="hideNetworkDropdown">
        <a
          href="#"
          class="network-toggle"
          @click.prevent="toggleNetworkDropdown"
        >
          <span class="network-icon">
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z"
              />
            </svg>
          </span>

          <span class="network-name">{{ currentNetwork.name }}</span>

          <span class="network-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="icon"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </span>
        </a>

        <div class="network-dropdown" v-show="showNetworkDropdown">
          <a
            href="#"
            @click.prevent="changeNetwork(network)"
            v-for="network in networks"
            :key="network.id"
          >
            <span class="network-dropdown-icon">
              <svg
                v-if="currentNetwork.id === network.id"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-2 -1.5 24 24"
                width="24"
                height="24"
                preserveAspectRatio="xMinYMin"
                class="icon"
              >
                <path
                  d="M10 20.565c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-2 -2 24 24"
                width="24"
                height="24"
                preserveAspectRatio="xMinYMin"
                class="icon"
              >
                <path
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"
                />
              </svg>
            </span>

            <span>{{ network.name }}</span>
          </a>
        </div>
      </div>

      <a
        class="refresh-toggle"
        @click.prevent="refreshData"
        href="#"
        v-tooltip.bottom="'Refresh'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="icon"
        >
          <path
            d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z"
          />
        </svg>
      </a>

      <div v-click-outside="hideDropdownMenu">
        <a
          class="dropdown-menu-toggle"
          @click.prevent="toggleDropdownMenu"
          href="#"
          v-tooltip.bottom="'Menu'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="icon"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </a>

        <nav class="dropdown-menu" v-show="showDropdownMenu">
          <div v-show="wallets.accounts.length > 0">
            <span class="dropdown-menu-label">My Accounts</span>
            <div class="dropdown-menu-divider"></div>
            <div class="account-content" ref="accountcontent">
              <div
                class="dropdown-menu-item"
                v-for="(account, index) in wallets.accounts"
                :key="index"
              >
                <i
                  class="material-icons"
                  v-show="
                    account.address === wallets.active.address &&
                    ((selectedIndex = index) || 1)
                  "
                  >check</i
                >
                <div
                  class="name-row"
                  :class="
                    account.address === wallets.active.address ? 'active' : ''
                  "
                >
                  <a
                    @click.prevent="
                      () => {
                        selectAccount(account.address)
                      }
                    "
                    >{{ compressName(account.name) }}</a
                  >
                  <span v-if="account.isLedger" class="ledger-badge"
                    >Ledger</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="dropdown-menu-divider"></div>
          <div class="dropdown-menu-item">
            <i class="material-icons">add</i>
            <a @click.prevent="createAccount">Create Account</a>
          </div>
          <div class="dropdown-menu-item">
            <i class="material-icons">vertical_align_bottom</i>
            <a @click.prevent="importAccount">Import Account</a>
          </div>
          <div class="dropdown-menu-item">
            <i class="material-icons">settings_input_component</i>
            <a @click.prevent="connectHardware">Connect Hardware Wallet</a>
          </div>
          <div v-if="wallets.accounts.length > 0 && !wallets.active.isLedger">
            <div class="dropdown-menu-divider"></div>
            <div class="dropdown-menu-item">
              <i class="material-icons">save</i>
              <router-link to="/private-key">Export Private Key</router-link>
            </div>
          </div>
          <div class="dropdown-menu-divider"></div>
          <div v-if="wallets.accounts.length > 0">
            <div class="dropdown-menu-item">
              <i class="material-icons">settings</i>
              <router-link to="/settings">Settings</router-link>
            </div>
          </div>
          <div class="dropdown-menu-item">
            <i class="material-icons">info</i>
            <router-link to="/about">About Harmony</router-link>
          </div>
          <div v-if="wallets.accounts.length > 0">
            <div class="dropdown-menu-divider"></div>
            <div class="dropdown-menu-item">
              <i class="material-icons">lock</i>
              <a @click.prevent="lockWallet">Lock</a>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div v-if="subtitle" class="header-subtitle">
      <a class="header-subtitle-back" @click="backClicked()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="icon"
        >
          <path
            d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z"
          />
        </svg>
      </a>

      <div class="header-subtitle-text">{{ subtitle }}</div>
    </div>
    <component
      v-else-if="headerTab"
      :is="headerTab"
      :subtitle="subtitle"
    ></component>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Config from '~/config'
import MainTab from './MainTab'
import CreateTab from './CreateTab'
import helper from 'mixins/helper'
export default {
  mixins: [helper],
  props: {
    backRoute: {
      type: String
    },
    subtitle: {
      default: false
    },
    headerTab: {
      default: '',
      type: String
    }
  },
  components: {
    MainTab,
    CreateTab
  },
  data: () => ({
    showDropdownMenu: false,
    showNetworkDropdown: false,
    networks: [],
    selectedIndex: 0
  }),

  computed: {
    ...mapGetters(['getPinCode']),
    ...mapState({
      wallets: (state) => state.wallets,
      myroute: (state) => state.route,
      currentNetwork: (state) => state.network
    })
  },

  mounted() {
    this.networks = Config.networks
  },

  methods: {
    compressName(str) {
      if (str.length > 15)
        return (
          str.substr(0, 10) + '...' + str.substr(str.length - 5, str.length)
        )
      return str
    },
    backClicked() {
      if (!this.backRoute) this.$router.go(-1)
      else this.$router.push(this.backRoute)
    },
    toggleDropdownMenu() {
      this.showDropdownMenu = this.showDropdownMenu ? false : true
      this.$nextTick(() => {
        const offset =
          this.$refs.accountcontent.scrollHeight / this.wallets.accounts.length
        this.$refs.accountcontent.scrollTop = this.selectedIndex * offset
      })
    },

    hideDropdownMenu() {
      this.showDropdownMenu = false
    },

    toggleNetworkDropdown() {
      this.showNetworkDropdown = this.showNetworkDropdown ? false : true
    },

    hideNetworkDropdown() {
      this.showNetworkDropdown = false
    },

    changeNetwork(network) {
      this.showNetworkDropdown = false
      this.$store.commit('account/shard', 0)
      this.$store.commit('network/change', network)
      this.$emit('networkChanged')
      this.showDropdownMenu = false
    },
    selectAccount(address) {
      this.$store.commit('wallets/setActive', address)
      this.hideDropdownMenu()
      this.refreshData()
      if (this.$route.name !== 'account') this.$router.push('/home')
    },
    createAccount() {
      this.openExpandPopup('/create-wallet')
    },
    importAccount() {
      this.openExpandPopup('/import-wallet')
    },
    connectHardware() {
      this.openExpandPopup('/connect-hardware-wallet')
    },
    lockWallet() {
      if (!this.getPinCode) {
        this.$modal.show('dialog', {
          text: "You haven't set the PIN Code yet. Please set the PIN Code on the <b>Settings</b>",
          buttons: [
            {
              title: 'CLOSE',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
        return
      }
      this.$store.dispatch('settings/setLockState', true)
      this.$router.push('/lock')
    },
    refreshData() {
      this.$emit('refresh')
      this.showDropdownMenu = false
    }
  }
}
</script>

<style lang="scss">
.header {
  z-index: 800;
  width: 370px;
  position: absolute;
  top: 0;
  left: 0;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.account-content {
  max-height: 160px;
  overflow: auto;
}
.dropdown-menu-item {
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  i {
    position: absolute;
    color: #757575;
    left: 8px;
  }
  &.disabled {
    pointer-events: none;
    a,
    i {
      color: #ccc;
    }
  }
}
.name-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  &.active {
    background: #f0f0f0;
  }
}
.header-top {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.875rem;
  line-height: 1;
  position: relative;
}
.header-logo {
  display: flex;
  align-items: center;
  flex: 1;
  font-size: 1rem;
  font-weight: 600;
  color: #424242;
  img,
  span {
    display: block;
  }
  img {
    margin-right: 5px;
  }
}
.header-lock {
  margin: auto;
  flex: 1;
  margin-left: 15px;
  a {
    color: black;
  }
}
.network {
  margin: -0.2rem 0.75rem 0;
  position: relative;
  span {
    display: block;
  }
}
a.network-toggle {
  max-width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.625rem;
  text-transform: uppercase;
  padding: 0.4rem;
  background: #e0e0e0;
  border-radius: 3px;
  color: #757575;
  cursor: pointer;
}
a.network-toggle:hover {
  background: #dddddd;
}
.network-icon {
  font-size: 0.5rem;
  padding-top: 2px;
}
.network-arrow {
  padding-top: 2px;
}
.network-name {
  flex: 1;
  font-weight: 600;
  color: #616161;
  padding: 0.1rem 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.network-dropdown {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ffffff;
  position: absolute;
  top: 30px;
  right: 0px;
  padding: 0.375rem 0;
  border-radius: 3px;
  min-width: 100px;
}
.network-dropdown a {
  display: flex;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  line-height: 1.25;
  color: #757575;
}
.network-dropdown a:hover,
.network-dropdown a:focus {
  color: #d32f2f;
}
.network-dropdown a span {
  display: block;
}
.network-dropdown-icon {
  padding: 3px 8px 0 0;
  font-size: 0.625rem;
}

.refresh-toggle {
  padding: 0 0.75rem 0 0;
}

.refresh-toggle,
.dropdown-menu-toggle {
  display: block;
  font-size: 1.125rem;
  color: #424242;
}
.dropdown-menu {
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.6);
  background: #ffffff;
  position: absolute;
  top: 40px;
  right: 10px;
  border-radius: 3px;
  min-width: 125px;
  width: 250px;
}
.dropdown-menu a {
  display: block;
  flex: 1;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  color: #555;
}
.dropdown-menu a:hover,
.dropdown-menu a:focus {
  color: #d32f2f;
}
.dropdown-menu-label {
  padding: 0.8rem 1rem;
  display: block;
  font-size: 1rem;
  color: black;
}
.dropdown-menu-divider {
  height: 1px;
  width: 100%;
  border-top: 1px solid #ccc;
}

.header-subtitle {
  display: flex;
  align-items: center;
  padding: 0.625rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  height: 40px;
}
.header-subtitle-back {
  display: block;
  padding: 5px 8px 0;
  font-size: 0.87rem;
  color: #424242;
}
.header-subtitle-text {
  flex: 1;
  font-weight: 600;
  text-align: center;
  padding-right: 30px;
}
</style>
