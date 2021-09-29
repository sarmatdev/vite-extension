<template>
  <div class="box-container">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
/* eslint-disabled */
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
  width: 360px;
  height: 600px;
}

.box-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #617ba3;
  padding: 0;
  margin: 0;
  overflow: hidden;
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
  box-shadow: 0px 0px 60px 20px rgba(0, 0, 0, 0.3);
}
</style>
