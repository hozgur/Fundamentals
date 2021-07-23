<template>    
    <input class="form-control form-control text-secondary p-1" type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder"/>
</template>

<script>
export default {
    name: "Input",
    props: ["placeholder","modelValue"],
    emits:['update:modelValue'],

}
</script>

<style>
input[type="text"]:focus
{
        border-color: #4d81f1;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.075) inset;
}
</style>
