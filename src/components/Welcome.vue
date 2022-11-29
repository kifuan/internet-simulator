<script setup lang="ts">
const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="tw-text-slate-800 tw-space-y-6 tw-flex tw-flex-col">
    <h1 class="tw-text-5xl tw-font-semibold">
      互联网模拟器
    </h1>

    <p class="tw-text-2xl tw-font-medium">
      我真的是太潮辣
    </p>

    <div class="tw-pt-14" />

    <QBtn color="white" text-color="black" class="tw-text-xl tw-m-12 md:tw-m-32" @click="emits('close')">
      开始发电
    </QBtn>
  </div>
</template>
