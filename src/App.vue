<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui'
import { ref } from 'vue'
import Welcome from './components/Welcome.vue'
import Game from './components/Game.vue'

const welcomeClosed = ref(false)
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" preflight-style-disabled>
    <NMessageProvider>
      <NDialogProvider>
        <div>
          <Game v-if="welcomeClosed" />
          <Welcome v-else @close="welcomeClosed = true" />
        </div>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped>
div {
  margin: 0 auto;
  @apply tw-max-w-2xl;
}
</style>
