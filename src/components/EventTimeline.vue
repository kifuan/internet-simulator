<script setup lang="ts">
import { useEventStore } from '../stores/event'

const store = useEventStore()
</script>

<template>
  <QTimeline color="secondary">
    <QTimelineEntry heading>
      <h1 class="tw-text-xl">
        Timeline heading
      </h1>
    </QTimelineEntry>

    <QTimelineEntry
      subtitle="February 21, 1986"
    >
      Event content
    </QTimelineEntry>

    <QTimelineEntry
      subtitle="February 21, 1986"
    >
      Event content
    </QTimelineEntry>
  </QTimeline>
</template>
