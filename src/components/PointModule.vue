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
    分数:
    <span class="text-size-10rem text-pink-600">{{ count }}</span>
  </div>

  <n-modal v-model:show="visible">
    <n-card title="分数" class="w-60">
      <n-input-number v-model:value="count" :min="0" />
      <template #footer> 15 分获胜 </template>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
