<template>
  <li class="nav-item">
    <a class="nav-link" href="#" :id="id">{{ title }}</a>
  </li>
</template>

<script>
export default {
  name: "NavButton",
  props: ["title", "id"],
};
</script>