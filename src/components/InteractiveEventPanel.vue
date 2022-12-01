<script setup lang="ts">
import { useDialog } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, h, onBeforeMount } from 'vue'
import type { Action } from '../stores/event'
import { useEventStore } from '../stores/event'
import HistoryEventPanelNoHeader from './DialogHistoryEventPanel.vue'

const dialog = useDialog()
const eventStore = useEventStore()
const { historyEvents, currentEvent, formattedDate } = storeToRefs(eventStore)
const title = computed(() => `事件${historyEvents.value.length + 1}`)

function handleSelectAction(action: Action) {
  const event = eventStore.getHistoryEvent(action)
  dialog.success({
    title: title.value,
    content: () => h(HistoryEventPanelNoHeader, { event }),
    closable: false,
    maskClosable: false,
    positiveText: '好好好',
    onAfterLeave: () => {
      eventStore.addHistoryEvent(event)
      eventStore.chooseEvent()
    },
  })
}

onBeforeMount(() => {
  eventStore.chooseEvent()
})
</script>

<template>
  <NThing>
    <template #header>
      <div class="tw-text-lg">
        {{ title }}
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
