<template>
    <div class="card">
        <div class="card-body">
            <slot>/</slot>
        </div>
    </div>
</template>

<script>


export default {
    name: "Card",
    data() {
        return {            
        };
    },
}
</script>

<style>
.titleclass  {
    background-color: brown;
}
</style>