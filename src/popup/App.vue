<template>
  <div class="box-container">
    <Header />
    <Notifications />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Notifications from '@/components/Notifications.vue'
import Header from '@/components/Header.vue'
import { APP_CONNECT } from '../types'

export default defineComponent({
  components: {
    Notifications,
    Header
  },
  setup() {
    chrome.runtime.connect({ name: APP_CONNECT })
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
body {
  width: 360px;
  height: 600px;
}
.box-container {
  font-family: 'Signika Negative', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #617ba3;
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  width: 360px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 5px 15px #0044ff5b;
}
</style>
