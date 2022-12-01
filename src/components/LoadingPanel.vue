<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const { width: windowWidth } = useWindowSize()
const skeletonTitleWidth = computed(() => `${windowWidth.value * 0.3}px`)
const skeletonDateWidth = computed(() => `${windowWidth.value * 0.2}px`)
</script>

<template>
  <NThing>
    <template #header>
      <NSkeleton text :style="{ width: skeletonTitleWidth }" />
    </template>

    <template #header-extra>
      <NSkeleton text :style="{ width: skeletonDateWidth }" />
    </template>

    <NSkeleton text :repeat="3" />
  </NThing>
</template>
