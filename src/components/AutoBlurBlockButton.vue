<script setup lang="ts">
import { ref } from 'vue'
import { NButton } from 'naive-ui'

const emits = defineEmits<{
  (e: 'click'): void
}>()

const button = ref<InstanceType<typeof NButton>>()

async function handleClick() {
  emits('click')
  button.value!.$el.blur()
}
</script>

<template>
  <NButton ref="button" block @click="handleClick">
    <slot />
  </NButton>
</template>
