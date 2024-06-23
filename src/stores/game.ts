import { defineStore } from 'pinia'
import { useCelebrityStore } from './celebrity'
import type { Hint } from '../types'
import type { Celebrity } from '../types'

export const useGameStore = defineStore('game', {
  state: () => ({
    attempts: 10,
    hints: [] as Hint[]
  }),
  getters: {
    remainingAttempts: (state) => state.attempts
  },
  actions: {
    initializeGame() {
      this.attempts = 10
      this.hints = []
      const celebrityStore = useCelebrityStore()
      celebrityStore.getRandomCelebrity()
    },
    async makeAttempt(name: string) {
      const celebrityStore = useCelebrityStore()
      if (!celebrityStore.celebrity) return

      const guess = await celebrityStore.getTryCelebrity(name)
      if (!guess) return

      this.attempts--

      const hint: Hint = {
        correct: guess.name?.toLowerCase() === celebrityStore.celebrity.name.toLowerCase(),
        age: guess.age === celebrityStore.celebrity.age,
        gender: guess.gender === celebrityStore.celebrity.gender,
        occupation: guess.occupation === celebrityStore.celebrity.occupation,
        nationality: guess.nationality === celebrityStore.celebrity.nationality
      }

      this.hints.push(hint)
    }
  }
})
