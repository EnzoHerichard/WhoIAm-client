import { defineStore } from 'pinia'
import axios from 'axios'
import type { Celebrity } from '../types'

export const useCelebrityStore = defineStore('celebrity', {
  state: () => ({
    celebrity: null as Celebrity | null,
    celebrities: [] as Celebrity[]
  }),
  actions: {
    async getRandomCelebrity() {
      try {
        const response = await axios.get<Celebrity>('http://127.0.0.1:5000/random')
        this.celebrity = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async getTryCelebrity(name: string): Promise<Celebrity | null> {
      try {
        const response = await axios.get<Celebrity>(`http://127.0.0.1:5000/try?name=${name}`)
        return response.data
      } catch (error) {
        console.error(error)
        return null
      }
    },
    async getCelebrities() {
      try {
        const response = await axios.get<Celebrity[]>(`http://127.0.0.1:5000/celebrities`)
        return this.celebrities = response.data
      } catch (error) {
        console.error(error)
        return []
      }
    }
  }
})
