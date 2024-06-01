import { defineStore } from 'pinia'
import axios from 'axios'
import type { Celebrity } from '../types'

export const useCelebrityStore = defineStore('celebrity', {
  state: () => ({
    celebrity: null
  }),
  actions: {
    async getRandomCelebrity() {
      try {
        const response = await axios.get<Celebrity>('http://127.0.0.1:5000/random')
        this.celebrity = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
