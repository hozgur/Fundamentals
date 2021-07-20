<template>  
  <input v-model="question" />
  <p>{{ answer }}</p>
</template>

<script>
import axios from "axios"

export default {
  name: "Answer",
  data() {
    return {    
      question: "please ask a question!",
      answer : "no valid answer!"
    } 
  },
  watch: {
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    question(newQ,oldQ) {
      if(newQ.indexOf('?') > -1) {
        this.getAnswer(newQ);
      }
    }
  },
  methods: {
    getAnswer(question) {
      axios.get('https://yesno.wtf/api')
          .then(response => {
            this.answer = response.data.answer
          })
          .catch(error => {
            this.answer = question + error
          });          
      }
    }
}
</script>
