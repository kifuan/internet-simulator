<script setup lang="ts">
const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="text-slate-800 space-y-6 flex flex-col">
    <h1 class="text-5xl font-semibold">
      互联网模拟器
    </h1>

    <p class="text-2xl font-medium">
      我真的是太潮辣
    </p>

    <div class="pt-14" />

    <QBtn color="white" text-color="black" class="text-xl m-0 md:m-32" @click="emits('close')">
      开始发电
    </QBtn>
  </div>
</template>
