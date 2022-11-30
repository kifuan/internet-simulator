<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEventStore } from '../stores/event'
import HistoryEventListItem from './HistoryEventListItem.vue'

const { historyEvents } = storeToRefs(useEventStore())
</script>

<template>
  <NSpace vertical>
    <h1 class="tw-text-2xl">
      历史事件
    </h1>

    <NList hoverable>
      <HistoryEventListItem
        v-for="(event, index) in historyEvents"
        :id="index + 1"
        :key="index"
        :event="event"
      />
    </NList>
  </NSpace>
</template>
