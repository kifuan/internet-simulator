<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import type { Action } from '../stores/event'
import { useEventStore } from '../stores/event'
import { usePropertyStore } from '../stores/property'
import AutoBlurBlockButton from './AutoBlurBlockButton.vue'

const emits = defineEmits<{
  (e: 'load'): void
}>()

const eventStore = useEventStore()
const propertyStore = usePropertyStore()
const { historyEvents, currentEvent, formattedDate, gameOver } = storeToRefs(eventStore)
const { width: windowWidth } = useWindowSize()
const buttonTextWidth = computed(() => `${windowWidth.value * 0.75}px`)

function handleSelectAction(action: Action) {
  const event = eventStore.getHistoryEvent(action)
  eventStore.addHistoryEvent(event)
  propertyStore.change(action.effect)
  eventStore.chooseEvent()
  emits('load')
}
</script>

<template>
  <NThing>
    <template #header>
      <div class="tw-text-lg">
        事件 #{{ historyEvents.length + 1 }}
      </div>
    </template>

    <template #header-extra>
      <NText :depth="3">
        {{ formattedDate }}
      </NText>
    </template>

    <NSpace vertical size="large">
      <NText>
        {{ currentEvent.text }}
      </NText>

      <AutoBlurBlockButton
        v-for="(action, index) in currentEvent.actions"
        :key="index"
        @click="handleSelectAction(action)"
      >
        <div :style="{ maxWidth: buttonTextWidth }">
          {{ action.text }}
        </div>
      </AutoBlurBlockButton>
    </NSpace>
  </NThing>
</template>
