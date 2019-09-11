<template>
  <div id="app">
      <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'

export default {
  components: {
    Footer
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR|Raleway');
</style>
