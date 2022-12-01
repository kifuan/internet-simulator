<script setup lang="ts">
import { onMounted } from 'vue'
import type { HistoryEvent } from '../stores/event'

defineProps<{
  event: HistoryEvent
  id: number
}>()

const emits = defineEmits<{
  (e: 'scroll'): void
}>()

onMounted(() => {
  emits('scroll')
})
</script>

<template>
  <NListItem>
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
  </NListItem>
</template>
