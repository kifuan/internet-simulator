<script setup lang="ts">
import { NButton } from 'naive-ui'

const emits = defineEmits<{
  (e: 'close'): void
}>()

function handleRepo() {
}
</script>

<template>
  <div class="tw-text-slate-800 tw-space-y-6 tw-flex tw-flex-col">
    <h1 class="tw-text-5xl tw-font-semibold tw-text-center">
      互联网模拟器
    </h1>

    <p class="tw-text-2xl tw-font-medium tw-text-center">
      我真的是太潮辣
    </p>

    <div class="tw-pt-4 md:tw-pt-12" />

    <NButton size="large" block @click="emits('close')">
      开始发电
    </NButton>

    <NButton size="large" block @click="handleRepo">
      仓库地址
    </NButton>
  </div>
</template>
