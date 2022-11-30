<script setup lang="ts">
import { QTimelineEntry } from 'quasar'
import { onMounted } from 'vue'
import { useEventStore } from '../stores/event'
import EventTimelineItem from './TimelineEntry.vue'

const store = useEventStore()

onMounted(async () => {
  for (let i = 0; i < 10; i++) {
    const action = store.chooseEvent().actions[0]
    store.pushTimeline(action)
    await new Promise(resolve => setTimeout(resolve, 500))
  }
})
</script>

<template>
  <QTimeline color="secondary">
    <QTimelineEntry heading>
      <h1 class="tw-text-4xl tw-font-semibold">
        事件
      </h1>
    </QTimelineEntry>

    <EventTimelineItem
      v-for="(item, index) in store.timelineItems"
      :key="index"
      :item="item"
    />
  </QTimeline>
</template>
