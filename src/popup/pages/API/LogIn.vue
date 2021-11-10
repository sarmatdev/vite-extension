<template>
  <div>
    <main class="prompt">
      <div class="header-row">
        <span>Harmony</span>
      </div>
      <h3>Sign in Request</h3>
      <div class="hostrow">
        <span class="host_label">{{ host }}</span>
      </div>
      <div class="login-container">
        <div v-if="!getLockState">
          <div v-if="!wallets.accounts.length">
            <p>
              No accounts. You should create the account first in the extension.
            </p>
          </div>
          <div v-else>
            <div
              class="card"
              v-for="(account, index) in wallets.accounts"
              :key="index"
              @click="selectAccount(index)"
            >
              <div class="card-item" :class="{ active: selected === index }">
                <div class="card-item-name-box">
                  <div>{{ compressName(account.name) }}</div>
                  <div v-if="account.isLedger" class="ledger-badge">Ledger</div>
                </div>
                <div class="account-address">{{ account.address }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>
            Sorry. The wallet is locked. You should unlock it first in the
            extension.
          </p>
        </div>
      </div>
      <div
        class="button-group footer"
        v-if="wallets.accounts.length && !getLockState"
      >
        <button class="outline" @click="deny">Deny</button>
        <button class="primary" :disabled="selected < 0" @click="accept">
          Accept
        </button>
      </div>
      <div v-else>
        <button class="primary flex mt-20" @click="reject">OK</button>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import {
  THIRDPARTY_GET_ACCOUNT_CONNECT,
  GET_WALLET_SERVICE_STATE,
  THIRDPARTY_GET_ACCOUNT_SUCCESS_RESPONSE,
  THIRDPARTY_GET_ACCOUNT_REJECT_RESPONSE,
  WALLET_LOCKED,
  UNKNOWN_ERROR,
  NO_ACCOUNTS_ERROR
} from '../../../types'
export default {
  data: () => ({
    selected: -1,
    host: ''
  }),
  computed: {
    ...mapGetters(['getLockState']),
    ...mapState({
      wallets: (state) => state.wallets
    })
  },
  mounted() {
    chrome.runtime.sendMessage(
      { action: GET_WALLET_SERVICE_STATE },
      ({ state } = {}) => {
        if (state && state.host) {
          this.host = state.host
        } else {
          window.close()
        }
      }
    )
    chrome.runtime.connect({ name: THIRDPARTY_GET_ACCOUNT_CONNECT })
  },
  methods: {
    compressName(str) {
      if (str.length > 20)
        return (
          str.substr(0, 10) + '...' + str.substr(str.length - 10, str.length)
        )
      return str
    },

    selectAccount(index) {
      this.selected = index
    },
    deny() {
      window.close()
    },
    reject() {
      const message = this.getLockState
        ? WALLET_LOCKED
        : !this.wallets.accounts.length
        ? NO_ACCOUNTS_ERROR
        : UNKNOWN_ERROR
      chrome.runtime.sendMessage({
        action: THIRDPARTY_GET_ACCOUNT_REJECT_RESPONSE,
        payload: {
          message
        }
      })
    },
    accept() {
      const account = this.wallets.accounts[this.selected]
      chrome.runtime.sendMessage({
        action: THIRDPARTY_GET_ACCOUNT_SUCCESS_RESPONSE,
        payload: {
          name: account.name,
          address: account.address
        }
      })
    }
  }
}
</script>
