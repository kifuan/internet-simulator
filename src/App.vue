<script setup lang="ts">
import { ref } from 'vue'
import Welcome from './components/Welcome.vue'
import Game from './components/Game.vue'

const welcomeClosed = ref(false)
</script>

<template>
  <div>
    <Game v-if="welcomeClosed" />
    <Welcome v-else @close="welcomeClosed = true" />
  </div>
</template>

<style scoped>
div {
  margin: 0 auto;
  @apply tw-bg-zinc-100 tw-pt-24 tw-h-full tw-p-6 tw-max-w-2xl;
}
</style>
