<script setup lang="ts">
import type { HistoryEvent } from '../stores/event'
import EffectTags from './EffectTags.vue'

defineProps<{
  event: HistoryEvent
  id: number
}>()
</script>

<template>
  <NThing>
    <template #header>
      <div class="tw-text-lg">
        事件 #{{ id }}
      </div>
    </template>

    <template #header-extra>
      <NText :depth="3">
        {{ event.dateText }}
      </NText>
    </template>

    <template #footer>
      <EffectTags :effects="event.actionEffects" />
    </template>

    <NSpace vertical size="large">
      <NText>
        {{ event.eventText }}
      </NText>

      <NText :depth="3">
        > {{ event.actionText }}
      </NText>

      <NText>
        {{ event.actionMessage }}
      </NText>
    </NSpace>
  </NThing>
</template>
