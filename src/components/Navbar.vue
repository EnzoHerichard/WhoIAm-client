<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/"
          ><img src="https://placehold.co/40" width="40px" height="40px"
        /></RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: white;
  color: black;
  padding: 1em;
  position: fixed;
  width: 100%;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 1em;
}

nav ul li a {
  color: black;
  text-decoration: none;
}
</style>
