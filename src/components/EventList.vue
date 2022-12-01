<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { NList } from 'naive-ui'
import { useEventStore } from '../stores/event'
import InteractiveEventPanel from './InteractiveEventPanel.vue'
import HistoryEventPanel from './HistoryEventPanel.vue'
import GameOverPanel from './GameOverPanel.vue'

const emits = defineEmits<{
  (e: 'scroll', top: number): void
}>()

const { historyEvents, gameOver } = storeToRefs(useEventStore())
const list = ref<InstanceType<typeof NList>>()

function handleInteractivePanelUpdate() {
  emits('scroll', list.value!.$el.scrollHeight)
}
</script>

<template>
  <NList ref="list">
    <NListItem
      v-for="(event, index) in historyEvents"
      :key="index"
      class="item"
    >
      <HistoryEventPanel
        :id="index + 1"
        :event="event"
      />
    </NListItem>

    <NListItem class="item">
      <GameOverPanel v-if="gameOver" />
      <InteractiveEventPanel v-else @update="handleInteractivePanelUpdate" />
    </NListItem>
  </NList>
</template>

<style scoped>
.item {
  @apply tw-px-4 !important;
}
</style>
