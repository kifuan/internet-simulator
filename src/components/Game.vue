<script setup lang="ts">
import { onMounted } from 'vue'
import { useEventStore } from '../stores/event'
import HistoryEventList from './HistoryEventList.vue'

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
  <NCard :bordered="false" class="tw-pt-8">
    <template #header>
      <h1 class="tw-text-3xl">
        历史事件
      </h1>
    </template>
    <HistoryEventList />
  </NCard>
</template>
