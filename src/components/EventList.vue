<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { NList } from 'naive-ui'
import { useEventStore } from '../stores/event'
import EventInteractiveItem from './EventInteractiveItem.vue'
import EventItem from './EventItem.vue'

const emits = defineEmits<{
  (e: 'scroll', top: number): void
}>()

const { historyEvents } = storeToRefs(useEventStore())
const list = ref<InstanceType<typeof NList>>()

function handleScroll() {
  emits('scroll', list.value!.$el.scrollHeight)
}
</script>

<template>
  <NList ref="list">
    <EventItem
      v-for="(event, index) in historyEvents"
      :id="index + 1"
      :key="index"
      :event="event"
      @scroll="handleScroll"
    />

    <EventInteractiveItem />
  </NList>
</template>
