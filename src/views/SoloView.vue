<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '../stores/game'
import SearchBar from '@/components/SearchBar.vue'
import Modal from '../components/Modal.vue'
import { GenderTranslation } from '@/types/gender'
import Button from '@/components/Button.vue'
import router from '@/router'

const game = useGameStore()
game.initializeGame()

const guess = ref('')

const isModalVisible = ref(false)

const makeGuess = async (celebrity: string) => {
  if (celebrity.trim()) {
    await game.makeAttempt(celebrity)
    celebrity = ''
    if (game.isGameWon) {
      isModalVisible.value = true
    }
  }
}

const updateQuery = (query: string) => {
  guess.value = query
}

const closeModal = () => {
  isModalVisible.value = false
}
</script>

<template>
  <div class="celebrity-infos">
    <h1>Qui suis je ?</h1>
    <p>Il te reste {{ game.remainingAttempts }} essais</p>
    <SearchBar :searchQuery="guess" :updateQuery="updateQuery" :clickCelebrity="makeGuess" />
    <div class="cards-container" v-if="game.celebrityInfos.length">
      <div v-for="(celebrityInfo, index) in game.celebrityInfos" :key="index">
        <h2>Célébrité: {{ celebrityInfo.name }}</h2>
        <div class="cards">
          <div
            class="card-info"
            :class="{ match: game.hints[index]?.age, 'no-match': !game.hints[index]?.age }"
          >
            {{ celebrityInfo.age }}
          </div>
          <div
            class="card-info"
            :class="{ match: game.hints[index]?.gender, 'no-match': !game.hints[index]?.gender }"
          >
            {{ GenderTranslation[celebrityInfo.gender] }}
          </div>
          <div
            class="card-info"
            :class="{
              match: game.hints[index]?.occupation,
              'no-match': !game.hints[index]?.occupation
            }"
          >
            {{ celebrityInfo.occupation }}
          </div>
          <div
            class="card-info"
            :class="{
              match: game.hints[index]?.nationality,
              'no-match': !game.hints[index]?.nationality
            }"
          >
            {{ celebrityInfo.nationality }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="game.isGameFinished && !game.isGameWon">
      <h2>Dommage...</h2>
      <p>Vous étiez {{ game.celebrityToGuess?.name }}</p>
      <button @click="game.initializeGame">Rejouer</button>
    </div>
    <Modal v-if="isModalVisible" @close="closeModal">
      <h2 style="color: green">Bravo !</h2>
      <p>Vous avez deviné la célébrité !</p>
      <p>Vous étiez {{ game.celebrityToGuess?.name }}</p>
      <Button text="Terminé" @click="router.push('/')" color="black" />
    </Modal>
  </div>
</template>

<style scoped>
.celebrity-infos {
  margin: 50px auto;
  width: 500px;
}

.cards-container {
  margin-top: 20px;
}
.card-info {
  border: none;
  padding: 10px;
  margin: 5px 0;
  width: fit-content;
  border-radius: 5px;
}

.match {
  background-color: green;
  color: white;
}

.no-match {
  background-color: red;
  color: white;
}

.cards {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
}

.celebrity-infos h1 {
  text-align: center;
}

.celebrity-infos p {
  text-align: center;
}

.modal-content button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
