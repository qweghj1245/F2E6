<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Nav,
    Footer,
  },
};
</script>

<style lang="scss">
// @import './assets/global.scss';
* {
  font-family: Bold Arial Rounded MT;
  font-weight: bold;
  box-sizing: border-box;
}
html, body {
  margin: 0;
  padding: 0;
}
#app {
  min-width: 1366px;
  background-color: $color-grey;
}
</style>
