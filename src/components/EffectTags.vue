<script setup lang="ts">
import type { HistoryActionEffect } from '../stores/event'

defineProps<{
  effects: HistoryActionEffect[]
}>()
</script>

<template>
  <NSpace size="small">
    <NTag
      v-for="(effect, index) in effects"
      :key="index"
      :type="effect.value > 0 ? 'success' : 'error'"
      size="small"
    >
      {{ effect.text }}
    </NTag>
  </NSpace>
</template>
