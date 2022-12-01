<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { NScrollbar } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useEventStore } from '../stores/event'
import HistoryEventList from './HistoryEventList.vue'
import PropertyPanel from './PropertyPanel.vue'

const { chooseEvent, pushTimeline } = useEventStore()
const { height: windowHeight } = useWindowSize()
const propHeight = ref(0)
const paddingTop = '20px'
const listHeight = computed(() => {
  const height = (windowHeight.value - propHeight.value - parseInt(paddingTop)) * 0.75
  return `${height}px`
})

const scrollbar = ref<InstanceType<typeof NScrollbar>>()

function handleScroll(top: number) {
  scrollbar.value!.scrollTo({
    top,
    behavior: 'smooth',
  })
}

onMounted(async () => {
  for (let i = 0; i < 10; i++) {
    const event = chooseEvent()
    pushTimeline(event.actions[0])
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
})
</script>

<template>
  <NCard :bordered="false" :style="{ paddingTop }">
    <template #header>
      <PropertyPanel :height="h => propHeight = h" />
    </template>
    <NScrollbar ref="scrollbar" :style="{ maxHeight: listHeight }">
      <HistoryEventList @scroll="handleScroll" />
    </NScrollbar>
  </NCard>
</template>
