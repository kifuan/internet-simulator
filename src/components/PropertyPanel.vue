<script setup lang="ts">
import { NDescriptions } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { usePropertyStore } from '../stores/property'

const emits = defineEmits<{
  (e: 'height', height: number): void
}>()

const descriptions = ref<InstanceType<typeof NDescriptions>>()
const { property, prevProperty } = storeToRefs(usePropertyStore())

onMounted(() => {
  const height = parseInt(window.getComputedStyle(descriptions.value!.$el).height)
  emits('height', height)
})
</script>

<template>
  <NDescriptions ref="descriptions" bordered :columns="5">
    <NDescriptionsItem label="爱国">
      <NNumberAnimation
        :from="prevProperty.patriotism"
        :to="property.patriotism"
        :duration="1000"
      />
    </NDescriptionsItem>

    <NDescriptionsItem label="米线">
      <NNumberAnimation
        :from="prevProperty.baseline"
        :to="property.baseline"
        :duration="1000"
      />
    </NDescriptionsItem>

    <NDescriptionsItem label="金币">
      <NNumberAnimation
        :from="prevProperty.money"
        :to="property.money"
        :duration="1000"
      />
    </NDescriptionsItem>

    <NDescriptionsItem label="心态">
      <NNumberAnimation
        :from="prevProperty.mind"
        :to="property.mind"
        :duration="1000"
      />
    </NDescriptionsItem>

    <NDescriptionsItem label="乐子">
      <NNumberAnimation
        :from="prevProperty.fun"
        :to="property.fun"
        :duration="1000"
      />
    </NDescriptionsItem>
  </NDescriptions>
</template>
