<script setup lang="ts">
import { onMounted } from 'vue'
import type { TimelineItem } from '../stores/event'

defineProps<{
  item: TimelineItem
}>()

onMounted(() => {
  // Scroll the body to end whenever it is mounted.
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
})
</script>

<template>
  <QTimelineEntry>
    <template #subtitle>
      <div class="tw-text-xl">
        {{ item.dateText }}
      </div>
    </template>

    <div class="tw-text-lg">
      {{ item.eventText }}
    </div>
  </QTimelineEntry>
</template>
