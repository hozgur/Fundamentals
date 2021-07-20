<template>
    <button type="button" class="btn btn-primary btn-sm">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "Button",
    data() {
    return {    
      question: "please ask a question!",
      answer : "no valid answer!"
    } 
  },
}
</script>