<script setup lang="ts">
import { useMessage } from 'naive-ui'

const emits = defineEmits<{
  (e: 'close'): void
}>()

const message = useMessage()
function handleRepo() {
  message.info('别急, 暂未开源')
}
</script>

<template>
  <div class="tw-pt-48">
    <NSpace size="large" vertical align="center">
      <h1 class="tw-text-5xl tw-font-semibold tw-text-center">
        互联网模拟器
      </h1>

      <p class="tw-text-2xl tw-font-medium tw-text-center">
        我真的是太潮辣
      </p>

      <div class="tw-pt-16" />

      <NButton size="large" @click="emits('close')">
        <div class="tw-px-16">
          开始发电
        </div>
      </NButton>

      <NButton size="large" @click="handleRepo">
        <div class="tw-px-16">
          仓库地址
        </div>
      </NButton>
    </NSpace>
  </div>
</template>
`
