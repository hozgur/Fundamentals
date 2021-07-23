<template>
  <div class="form-check">
    <input class="form-check-input" type="radio" :name="name" :id="id" />
    <label class="form-check-label" :for="id">
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "Radio",
  props: ["name", "id"],
};
</script>