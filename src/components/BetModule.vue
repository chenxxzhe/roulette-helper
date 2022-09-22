<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const visible = ref(false)
</script>

<template>
  <div
    class="flex justify-center p-6px"
    v-bind="$attrs"
    @click="visible = true"
  >
    下注额:
    <span class="text-size-8rem">{{ count }}</span>
  </div>

  <n-modal v-model:show="visible">
    <n-card title="下注额" class="w-60">
      <n-input-number v-model:value="count" :min="0" :max="5" />
    </n-card>
  </n-modal>
</template>

<style scoped></style>
