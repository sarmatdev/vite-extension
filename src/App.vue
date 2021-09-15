<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <hr />
  </div>
  <router-view />
</template>

<style lang="scss">
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100vw;
  min-width: 300px;
  height: 100vh;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  background-color: #73a3c4;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #617ba3;
  overflow: scroll;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  width: 360px;
  height: 600px;
  background-color: #fff;
}
</style>
