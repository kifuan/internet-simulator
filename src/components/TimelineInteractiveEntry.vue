<script setup lang="ts">
import { NButton, NTimelineItem } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import { useEventStore } from '../stores/event'
import type { Action } from '../stores/event'

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
  <NTimelineItem type="info">
    <template #header>
      <div class="tw-text-xl">
        {{ date }}
      </div>
    </template>

    <div class="tw-flex tw-flex-col tw-space-y-5">
      <div class="tw-text-lg">
        {{ currentEvent.text }}
      </div>

      <NButton
        v-for="(action, index) in currentEvent.actions"
        :key="index"
        @click="handleActionClicked(action)"
      >
        {{ action.text }}
      </NButton>
    </div>
  </NTimelineItem>
</template>
