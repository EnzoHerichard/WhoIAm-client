<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useCelebrityStore} from '../stores/celebrity'
import type {Celebrity} from '../types'

const celebrityStore = useCelebrityStore()
const celebrities = ref<Celebrity[]>([])

onMounted(async () => {
  await celebrityStore.getCelebrities()
  celebrities.value = celebrityStore.celebrities
  console.log(celebrities.value)
})

</script>

<template>
    <div>
        <select id="celebrity-dropdown">
            <option v-for="celebrity in celebrities" :value="celebrity">
                {{ celebrity }}
            </option>
        </select>
    </div>
</template>