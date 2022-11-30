<script setup lang="ts">
import { onMounted } from 'vue'
import { useEventStore } from '../stores/event'

const store = useEventStore()

onMounted(async () => {
  for (let i = 0; i < 10; i++) {
    const action = store.chooseEvent().actions[0]
    store.pushTimeline(action)
    document.body.scrollIntoView({})
    await new Promise(resolve => setTimeout(resolve, 1000))
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

    <TransitionGroup>
      <QTimelineEntry
        v-for="(timeline, index) in store.timeline"
        :key="index"
      >
        <template #subtitle>
          <div class="tw-text-xl">
            {{ timeline.dateText }}
          </div>
        </template>

        <div class="tw-text-lg">
          {{ timeline.eventText }}
        </div>
      </QTimelineEntry>
    </TransitionGroup>
  </QTimeline>
</template>
