<script setup lang="ts">
import type { HistoryEvent } from '../stores/event'
import EffectTags from './EffectTags.vue'

defineProps<{
  event: HistoryEvent
}>()
</script>

<template>
  <NSpace vertical>
    <NText>{{ event.actionMessage }}</NText>
    <EffectTags :effects="event.actionEffects" />
  </NSpace>
</template>
