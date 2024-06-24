<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCelebrityStore } from '../stores/celebrity'

const props = defineProps<{
  searchQuery: string,
  updateQuery: (query: string) => void
}>()

const localSearchQuery = ref(props.searchQuery)
const dropdownVisible = ref(false)

const celebrityStore = useCelebrityStore()
const celebrities = ref<string[]>([])

onMounted(async () => {
  await celebrityStore.getCelebrities()
  celebrities.value = celebrityStore.celebrities
})

watch(() => props.searchQuery, (newQuery) => {
  localSearchQuery.value = newQuery
})

const filteredCelebrities = computed(() => {
  if (!localSearchQuery.value) {
    return []
  }
  return celebrities.value.filter((celebrity) =>
    celebrity.toLowerCase().includes(localSearchQuery.value.toLowerCase())
  )
})

const selectCelebrity = (celebrity: string) => {
  props.updateQuery(celebrity)
  dropdownVisible.value = false
}
</script>

<template>
  <div>
    <input 
      v-model="localSearchQuery" 
      @input="dropdownVisible = true; props.updateQuery(localSearchQuery)" 
      placeholder="Search for a celebrity" 
      type="text" 
    />
    <ul v-if="dropdownVisible && filteredCelebrities.length">
      <li v-for="(celebrity, index) in filteredCelebrities" :key="index" @click="selectCelebrity(celebrity)">
        {{ celebrity }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  padding: 10px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
