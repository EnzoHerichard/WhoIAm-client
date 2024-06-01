import { defineStore } from 'pinia'
import { useCelebrityStore } from './celebrity'
import type { Hint } from '../types'

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
    makeAttempt(guess: Partial<Hint>) {
      const celebrityStore = useCelebrityStore()
      if (!celebrityStore.celebrity) return
    
      this.attempts--
      
      const hint: Hint = {
        name: guess.name || '',
        correct: guess.name?.toLowerCase() === celebrityStore.celebrity.name.toLowerCase(),
        birthdate: guess.birthdate === celebrityStore.celebrity.birthdate,
        gender: guess.gender === celebrityStore.celebrity.gender,
        occupation: guess.occupation === celebrityStore.celebrity.occupation,
        nationality: guess.nationality === celebrityStore.celebrity.nationality
      }
      
      this.hints.push(hint)
    }
    
  }
})
