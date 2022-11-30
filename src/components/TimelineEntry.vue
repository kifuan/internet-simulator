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

    <div class="tw-text-lg tw-flex tw-flex-col tw-space-y-2">
      <div>
        {{ item.eventText }}
      </div>

      <div>
        > {{ item.actionText }}
      </div>

      <div>
        {{ item.actionMessage }}
      </div>

      <div
        v-for="(message, index) in item.actionEffectMessages"
        :key="index"
        class="tw-text-zinc-400"
      >
        {{ message }}
      </div>
    </div>
  </QTimelineEntry>
</template>
