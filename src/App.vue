<template>
  <div id="app">
    <router-view img-set="javascript:;"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {},
};
</script>

<style>
@import "./style/reset.styl";
#app {
  padding: 50px 100px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
