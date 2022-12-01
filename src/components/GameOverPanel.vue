<script setup lang="ts">
import { useEventStore } from '../stores/event'
import { usePropertyStore } from '../stores/property'
import InteractiveButton from './InteractiveButton.vue'

const propStore = usePropertyStore()
const eventStore = useEventStore()

function handleAgain() {
  propStore.$reset()
  eventStore.$reset()

  eventStore.chooseEvent()
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
        再来一局
      </InteractiveButton>
    </NSpace>
  </NThing>
</template>
