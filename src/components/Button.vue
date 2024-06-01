<script setup lang="ts">
import { defineProps } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits()

const props = defineProps({
  text: String,
  color: {
    type: String,
    default: 'blue'
  },
  hoverColor: String,
  width: {
    type: String,
    default: '100%'
  },
  disabled: Boolean
})

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <button
    class="button"
    :class="{ button: true, disabled: props.disabled }"
    :style="{ backgroundColor: color, width: width }"
    @click="handleClick"
  >
    {{ text }}
  </button>
</template>

<style scoped>
.button {
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 20px;
}

.button:hover {
  background-color: var(--hover-color, #333);
}

.disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>
