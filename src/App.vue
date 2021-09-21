<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header
  }
})
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #73a3c4;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #617ba3;
  padding: 0;
  margin: 0;
  overflow: hidden;
  overflow: scroll;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  width: 360px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
</style>
