<template>
  <AIPanel />
</template>

<script>
//import OpenAI from "./components/OpenAI.vue"
import AIPanel from "./components/ColorPanel.vue";
export default {
  components: { AIPanel },
  name: "App",
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  color: #2c3e50;
  margin-top: 5px;
  margin-left: 20px;
  margin-right: 20px;
}

html {
  font-size: 0.8rem;
}

@include media-breakpoint-up(sm) {
  html {
    font-size: 1.2rem;
  }
}

@include media-breakpoint-up(md) {
  html {
    font-size: 1.4rem;
  }
}

@include media-breakpoint-up(lg) {
  html {
    font-size: 1.6rem;
  }
}
</style>
