<script setup lang="ts">
import { promiseTimeout, useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUpdated, ref } from 'vue'
import type { Action } from '../stores/event'
import { useEventStore } from '../stores/event'
import { usePropertyStore } from '../stores/property'
import InteractiveButton from './InteractiveButton.vue'

const emits = defineEmits<{
  (e: 'update'): void
}>()

// Fake loading state, which is better than no loading state at all.
const loading = ref(true)
const eventStore = useEventStore()
const propertyStore = usePropertyStore()
const { width: windowWidth } = useWindowSize()
const { historyEvents, currentEvent, formattedDate } = storeToRefs(eventStore)
const title = computed(() => `事件 #${historyEvents.value.length + 1}`)
const skeletonTitleWidth = computed(() => `${windowWidth.value * 0.3}px`)
const skeletonDateWidth = computed(() => `${windowWidth.value * 0.2}px`)
const buttonTextWidth = computed(() => `${windowWidth.value * 0.75}px`)

async function fakeLoad() {
  loading.value = true
  await promiseTimeout(500)
  loading.value = false
}

async function handleSelectAction(action: Action) {
  const event = eventStore.getHistoryEvent(action)
  eventStore.addHistoryEvent(event)
  propertyStore.change(action.effect)
  eventStore.chooseEvent()
  await fakeLoad()
}

onMounted(async () => {
  eventStore.chooseEvent()
  await fakeLoad()
})

onUpdated(() => {
  emits('update')
})
</script>

<template>
  <NThing v-if="loading">
    <template #header>
      <NSkeleton text :style="{ width: skeletonTitleWidth }" />
    </template>

    <template #header-extra>
      <NSkeleton text :style="{ width: skeletonDateWidth }" />
    </template>

    <NSkeleton text :repeat="3" />
  </NThing>
  <NThing v-else>
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
