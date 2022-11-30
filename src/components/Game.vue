<script setup lang="ts">
import { onMounted } from 'vue'
import { useEventStore } from '../stores/event'
import HistoryEvents from './HistoryEvents.vue'

const store = useEventStore()
onMounted(async () => {
  for (let i = 0; i < 10; i++) {
    const event = store.chooseEvent()
    store.pushTimeline(event.actions[0])
    await new Promise(resolve => setTimeout(resolve, 300))
  }
})
</script>

<template>
  <HistoryEvents />
</template>
