<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const visible = ref(false)
</script>

<template>
  <!-- 缩略图, 点击打开弹窗 -->
  <div
    class="flex justify-center border-light-50"
    v-bind="$attrs"
    @click="visible = true"
  >
    <span>{{ count }}</span>
  </div>

  <n-modal v-model:show="visible">
    <n-card title="分数">
      <n-input-number v-model:value="count" :min="0" clearable />
      <template #footer> 15 分获胜 </template>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
