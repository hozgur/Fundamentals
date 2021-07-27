<template>
    <a class="list-group-item" :menuid="menuid" href="#">{{title}}</a>
</template>

<script>
export default {
    name:"ListItem",
    props:["title","menuid"],
    setup() {
        
    },
}
</script>