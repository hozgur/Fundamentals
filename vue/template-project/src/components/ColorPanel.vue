

<template>
  <NavBar @click="doSomething">
    <c-navdropdown title="Engines">
      <li v-for="item in options.engines" :key="item">
          <c-navdropitem :title="item" :menuid="'engine-'+item" />
      </li>
    </c-navdropdown>
    <c-navdropdown title="Methods">
      <li v-for="item in options.methods" :key="item">
          <c-navdropitem :title="item" :menuid="'method-'+item" />
      </li>
    </c-navdropdown>
  </NavBar>
  <OpenAI :engine="engine" :method="method"/>
</template>

<script>
import NavBar from "./NavBar.vue";
import OpenAI from "./OpenAI.vue";
import axios from "axios";

export default {
  components: { NavBar,OpenAI },
  data() {
      return {
          options : {},
      }      
  },
  async created() {
    const post = await axios.get("/api/openai");      
    if(post.data) this.options = post.data;      
  },
  setup() {
    
  },
  methods: {
    doSomething(e) {
        console.log(this.options);    
        if(e.target.attributes["menuid"])
        {
            const tokens = e.target.attributes["menuid"].value.split("-");            
            if(tokens[0] == "engine") this.engine = tokens[1];
            if(tokens[0] == "method") this.method = tokens[1];
        }
            
    },
    fetchData() {      
    
    }
  },
};
</script>