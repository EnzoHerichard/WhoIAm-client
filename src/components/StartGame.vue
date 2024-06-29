<template>
  <div class="container">
    <img src="../assets/logo-white.png" alt="Logo" width="100px" />
    <h1>Commence par choisir un mode de jeu...</h1>
    <div class="buttons">
      <Button text="Solo" color="black" hoverColor="blue" @click="handleSoloClick" width="200px" />
      <Button text="Multijoueur" color="black" width="200px" disabled />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '../components/Button.vue'
import { ref } from 'vue'

const router = useRouter()

const handleSoloClick = () => {
  router.push('/solo')
}
</script>

<style scoped>
.container {
  padding-top: 100px;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: space-between;
  width: 450px;
  margin: auto;
  margin-top: 50px;
}

h1 {
  margin-top: 50px;
}
</style>
