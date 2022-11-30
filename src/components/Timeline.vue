<script setup lang="ts">
import { NTimeline } from 'naive-ui'
import { useEventStore } from '../stores/event'
import TimelineEntry from './TimelineEntry.vue'
import TimelineInteractiveEntry from './TimelineInteractiveEntry.vue'

const store = useEventStore()
</script>

<template>
  <h1 class="tw-text-4xl tw-font-semibold tw-mb-8">
    事件
  </h1>
  <NTimeline>
    <TimelineEntry
      v-for="(item, index) in store.timelineItems"
      :key="index"
      :item="item"
    />

    <TimelineInteractiveEntry />
  </NTimeline>
</template>
