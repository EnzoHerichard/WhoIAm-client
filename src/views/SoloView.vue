<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '../stores/game'
import CelebritiesDropdown from '@/components/CelebritiesDropdown.vue';

const game = useGameStore()
game.initializeGame()

const guess = ref('')

const makeGuess = async () => {
  if (guess.value.trim()) {
    await game.makeAttempt(guess.value)
    guess.value = ''
  }
}
</script>

<template>
  <div>
    <h1>Guess the Celebrity</h1>
    <p>Remaining Attempts: {{ game.remainingAttempts }}</p>

    <div v-if="game.hints.length">
      <h2>Hints:</h2>
      <ul>
        <li v-for="(hint, index) in game.hints" :key="index">
          <p>Attempt {{ index + 1 }}:</p>
          <p>Correct: {{ hint.correct }}</p>
          <p>Age Match: {{ hint.age }}</p>
          <p>Gender Match: {{ hint.gender }}</p>
          <p>Occupation Match: {{ hint.occupation }}</p>
          <p>Nationality Match: {{ hint.nationality }}</p>
        </li>
      </ul>
    </div>

    <input v-model="guess" placeholder="Enter your guess" />
    <button @click="makeGuess">Submit Guess</button>
    <CelebritiesDropdown></CelebritiesDropdown>
  </div>
</template>
