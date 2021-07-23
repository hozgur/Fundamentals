<template>
    <a class="dropdown-item" :menuid="menuid" href="#">{{title}}</a>
</template>

<script>
export default {
    name:"NavDropItem",
    props:["title","menuid"],
    setup() {
        
    },
}
</script>