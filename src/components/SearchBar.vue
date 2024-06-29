<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useCelebrityStore } from '../stores/celebrity'

const props = defineProps<{
  searchQuery: string
  updateQuery: (query: string) => void
  clickCelebrity: (celebrity: string) => void
}>()

const localSearchQuery = ref(props.searchQuery)
const dropdownVisible = ref(false) // Correctly using ref to create a reactive boolean

const celebrityStore = useCelebrityStore()
const celebrities = ref<string[]>([])
const selectedCelebrities = ref<string[]>([])

onMounted(async () => {
  await celebrityStore.getCelebrities()
  celebrities.value = celebrityStore.celebrities
})

onUnmounted(() => {
  celebrities.value = []
})

watch(
  () => props.searchQuery,
  (newQuery) => {
    localSearchQuery.value = newQuery
  }
)

const filteredCelebrities = computed(() => {
  if (!localSearchQuery.value) {
    return []
  }
  return celebrities.value
    .filter((celebrity) => celebrity.toLowerCase().includes(localSearchQuery.value.toLowerCase()))
    .filter((celebrity) => !selectedCelebrities.value.includes(celebrity)) // Exclude selected celebrities
})

const handleCelebrityClick = (celebrity: string) => {
  props.clickCelebrity(celebrity)
  selectedCelebrities.value.push(celebrity)
  dropdownVisible.value = false
  localSearchQuery.value = ''
}
</script>

<template>
  <div class="container">
    <input
      v-model="localSearchQuery"
      @input="
        () => {
          dropdownVisible = true
          props.updateQuery(localSearchQuery)
        }
      "
      placeholder="Entrez le nom d'une célébrité..."
      type="text"
      class="search-bar"
    />
    <ul v-if="dropdownVisible && filteredCelebrities.length">
      <li
        v-for="(celebrity, index) in filteredCelebrities"
        :key="index"
        @click="handleCelebrityClick(celebrity)"
      >
        {{ celebrity }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
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
  color: black;
}

input {
  margin-top: 20px;
}
</style>
