<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/"
          ><img src="../assets/logo-black.png" width="60px" height="60px" alt="logo"
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
