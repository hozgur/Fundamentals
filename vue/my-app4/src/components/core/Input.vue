<template>    
    <input class="form-control form-control-sm text-secondary" type="text"/>
</template>

<script>
export default {
    name: "Input",
    props: {
    
    }
}
</script>

<style>
input[type="text"]:focus
{
        border-color: #4d81f1;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.075) inset;
}
</style>
