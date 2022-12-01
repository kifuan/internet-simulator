<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onMounted, onUpdated, ref } from 'vue'
import { useEventStore } from '../stores/event'
import GameOverPanel from './GameOverPanel.vue'
import InteractivePanel from './InteractivePanel.vue'
import LoadingPanel from './LoadingPanel.vue'

const emits = defineEmits<{
  (e: 'update'): void
}>()

// Fake loading state, which is better than not to load state at all.
const loading = ref(true)
const { gameOver } = storeToRefs(useEventStore())

async function fakeLoad() {
  loading.value = true
  await promiseTimeout(500)
  loading.value = false
}

onMounted(async () => {
  await fakeLoad()
})

onUpdated(() => {
  emits('update')
})
</script>

<template>
  <LoadingPanel v-if="loading" />
  <GameOverPanel v-else-if="gameOver" />
  <InteractivePanel v-else @load="fakeLoad" />
</template>
