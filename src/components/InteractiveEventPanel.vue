<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useDialog } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, h, onBeforeMount } from 'vue'
import type { Action } from '../stores/event'
import { useEventStore } from '../stores/event'
import DialogPanel from './DialogPanel.vue'
import InteractiveButton from './InteractiveButton.vue'

const dialog = useDialog()
const eventStore = useEventStore()
const { width: windowWidth } = useWindowSize()
const { historyEvents, currentEvent, formattedDate } = storeToRefs(eventStore)
const title = computed(() => `事件 #${historyEvents.value.length + 1}`)
const buttonTextWidth = computed(() => `${windowWidth.value * 0.75}px`)

function handleSelectAction(action: Action) {
  const event = eventStore.getHistoryEvent(action)
  dialog.success({
    title: title.value,
    content: () => h(DialogPanel, { event }),
    positiveText: '好好好',
    maskClosable: false,
    closable: false,
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

      <InteractiveButton
        v-for="(action, index) in currentEvent.actions"
        :key="index"
        @click="handleSelectAction(action)"
      >
        <div :style="{ maxWidth: buttonTextWidth }">
          {{ action.text }}
        </div>
      </InteractiveButton>
    </NSpace>
  </NThing>
</template>
