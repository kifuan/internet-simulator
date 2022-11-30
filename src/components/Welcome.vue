<script setup lang="ts">
import { useQuasar } from 'quasar'

const emits = defineEmits<{
  (e: 'close'): void
}>()

const q = useQuasar()

function handleRepo() {
  q.dialog({
    title: '提示',
    message: '暂未开源',
    ok: '好的',
  })
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

    <QBtn color="white" text-color="black" class="tw-text-xl tw-m-12 md:tw-m-32" @click="emits('close')">
      开始发电
    </QBtn>

    <QBtn color="white" text-color="black" class="tw-text-xl tw-m-12 md:tw-m-32" @click="handleRepo">
      仓库地址
    </QBtn>
  </div>
</template>
