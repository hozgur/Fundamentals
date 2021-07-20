<template>
  
  <OpenAI openai-engine="davinci" openai-method="completions"/>
  
</template>

<script>

import OpenAI from "./components/OpenAI.vue"
export default {
  components: {OpenAI},
  name: 'App',    
  data() {
    return {    
      
    } 
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 20px;
  margin-right: 20px;
}

* {
   font-size: 14px;
   line-height: 1.428;   
   box-sizing: content-box;
}

</style>
