import { defineStore } from 'pinia'
import { useCelebrityStore } from './celebrity'
import type { Hint } from '../types'
import type { Celebrity } from '../types'

export const useGameStore = defineStore('game', {
  state: () => ({
    attempts: 10,
    hints: [] as Hint[],
    celebrityInfos: [] as Celebrity[],
    isGameFinished: false,
    isGameWon: false,
    celebrityToGuess: null as Celebrity | null
  }),
  getters: {
    remainingAttempts: (state) => state.attempts
  },
  actions: {
    initializeGame() {
      this.attempts = 10
      this.hints = []
      this.celebrityInfos = []
      this.isGameFinished = false
      this.isGameWon = false
      this.celebrityToGuess = null
      const celebrityStore = useCelebrityStore()
      celebrityStore.getRandomCelebrity()
    },
    async makeAttempt(name: string) {
      const celebrityStore = useCelebrityStore()
      this.celebrityToGuess = celebrityStore.celebrity
      if (!celebrityStore.celebrity) return

      const guess = await celebrityStore.getTryCelebrity(name)
      if (!guess) return

      this.attempts--

      if (this.attempts === 0) {
        this.isGameFinished = true
        this.isGameWon = false
        return
      }

      if (guess.name?.toLowerCase() === celebrityStore.celebrity.name.toLowerCase()) {
        this.isGameFinished = true
        this.isGameWon = true
        return
      }

      const hint: Hint = {
        correct: guess.name?.toLowerCase() === celebrityStore.celebrity.name.toLowerCase(),
        age: guess.age === celebrityStore.celebrity.age,
        gender: guess.gender === celebrityStore.celebrity.gender,
        occupation: guess.occupation === celebrityStore.celebrity.occupation,
        nationality: guess.nationality === celebrityStore.celebrity.nationality
      }

      const celebrityInfos: Celebrity = {
        name: guess.name,
        age: guess.age,
        gender: guess.gender,
        occupation: guess.occupation,
        nationality: guess.nationality,
        image: guess.image
      }

      this.hints.push(hint)

      this.celebrityInfos.push(celebrityInfos)
    }
  }
})
