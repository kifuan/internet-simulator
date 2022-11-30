<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import type { Action } from '../stores/event'
import { useEventStore } from '../stores/event'

const store = useEventStore()
const { currentEvent, date } = storeToRefs(store)

onBeforeMount(() => {
  store.chooseEvent()
})

async function handleActionClicked(action: Action) {
  await new Promise(resolve => setTimeout(resolve, 500))
  store.pushTimeline(action)
  store.chooseEvent()
}
</script>

<template>
  <QTimelineEntry>
    <template #subtitle>
      <div class="tw-text-xl">
        {{ date }}
      </div>
    </template>

    <div class="tw-flex tw-flex-col tw-space-y-5">
      <div class="tw-text-lg">
        {{ currentEvent.text }}
      </div>

      <QBtn
        v-for="(action, index) in currentEvent.actions"
        :key="index"
        :label="action.text"
        color="white"
        text-color="black"
        @click="handleActionClicked(action)"
      />
    </div>
  </QTimelineEntry>
</template>
