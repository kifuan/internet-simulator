<script setup lang="ts">
import { QTimelineEntry } from 'quasar'
import { useEventStore } from '../stores/event'
import TimelineEntry from './TimelineEntry.vue'
import TimelineInteractiveEntry from './TimelineInteractiveEntry.vue'

const store = useEventStore()
</script>

<template>
  <QTimeline color="secondary">
    <QTimelineEntry heading>
      <h1 class="tw-text-4xl tw-font-semibold">
        事件
      </h1>
    </QTimelineEntry>

    <TimelineEntry
      v-for="(item, index) in store.timelineItems"
      :key="index"
      :item="item"
    />

    <TimelineInteractiveEntry />
  </QTimeline>
</template>
