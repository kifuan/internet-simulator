<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import type { Action } from '../stores/event'
import { useEventStore } from '../stores/event'

const eventStore = useEventStore()
const { historyEvents, currentEvent, formattedDate } = storeToRefs(eventStore)

function handleSelectAction(action: Action) {
  eventStore.pushTimeline(action)
  eventStore.chooseEvent()
}

onBeforeMount(() => {
  eventStore.chooseEvent()
})
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

      <NButton
        v-for="(action, index) in currentEvent.actions"
        :key="index"
        block
        @click="handleSelectAction(action)"
      >
        {{ action.text }}
      </NButton>
    </NSpace>
  </NThing>
</template>
