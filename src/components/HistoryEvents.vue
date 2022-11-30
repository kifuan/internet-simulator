<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEventStore } from '../stores/event'

const { historyEvents } = storeToRefs(useEventStore())
</script>

<template>
  <NSpace vertical>
    <NH1>历史事件</NH1>
    <NList hoverable>
      <NListItem v-for="(event, index) in historyEvents" :key="index">
        <NThing :title="event.eventText" />
      </NListItem>
    </NList>
  </NSpace>
</template>
