<script setup lang="ts">
import { useDialog } from 'naive-ui'
import { useEventStore } from '../stores/event'
import { usePropertyStore } from '../stores/property'
import InteractiveButton from './InteractiveButton.vue'

const propStore = usePropertyStore()
const eventStore = useEventStore()
const dialog = useDialog()

function handleAgain() {
  dialog.warning({
    title: '确认',
    content: '你确认要 Remake 吗？',
    positiveText: '确认',
    negativeText: '算了',
    onPositiveClick: () => {
      propStore.$reset()
      eventStore.$reset()
      eventStore.chooseEvent()
    },
  })
}
</script>

<template>
  <NThing>
    <template #header>
      <div class="tw-text-lg">
        结算
      </div>
    </template>

    <NSpace vertical>
      <NText v-for="(rate, index) in propStore.getRates()" :key="index">
        {{ rate }}
      </NText>

      <InteractiveButton @click="handleAgain">
        Remake
      </InteractiveButton>
    </NSpace>
  </NThing>
</template>
