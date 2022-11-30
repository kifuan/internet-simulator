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
  <div class="tw-pt-16 tw-p-4">
    <NSpace vertical size="large">
      <h1 class="tw-text-3xl tw-pl-4">
        历史事件
      </h1>

      <p class="tw-text-lg tw-pl-4">
        发生的事件都会显示在此处。
      </p>

      <HistoryEventList />
    </NSpace>
  </div>
</template>
