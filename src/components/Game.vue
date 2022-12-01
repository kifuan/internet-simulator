<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { NScrollbar } from 'naive-ui'
import { computed, ref } from 'vue'
import EventList from './EventList.vue'
import PropertyPanel from './PropertyPanel.vue'

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
</script>

<template>
  <NCard :bordered="false" :style="{ paddingTop }">
    <template #header>
      <PropertyPanel :height="(h: number) => propHeight = h" />
    </template>
    <NScrollbar ref="scrollbar" :style="{ maxHeight: listHeight }">
      <EventList @scroll="handleScroll" />
    </NScrollbar>
  </NCard>
</template>
