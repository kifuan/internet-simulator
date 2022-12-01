<script setup lang="ts">
import type { HistoryEvent } from '../stores/event'

defineProps<{
  event: HistoryEvent
}>()
</script>

<template>
  <NSpace vertical size="large">
    <NText :depth="3">
      > {{ event.actionText }}
    </NText>

    <NText>
      {{ event.actionMessage }}
    </NText>

    <NSpace size="small">
      <NTag
        v-for="(effect, index) in event.actionEffects"
        :key="index"
        :type="effect.value > 0 ? 'success' : 'error'"
        size="small"
      >
        {{ effect.text }}
      </NTag>
    </NSpace>
  </NSpace>
</template>
