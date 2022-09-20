<script setup lang="ts">
import { ref } from 'vue'

const total = ref(4)
const count = ref(total)

const visible = ref(false)
</script>

<template>
  <!-- 缩略图, 点击打开弹窗 -->
  <div class="flex justify-center border-light-50" @click="visible = true">
    <div v-for="life in count" :key="life" class="bg-green-500 w-20 h-20"></div>
    <div
      v-for="dead in total - count"
      :key="dead"
      class="bg-green-500 w-20 h-20"
    ></div>
  </div>

  <n-modal v-model:show="visible">
    <n-card title="剩余生命">
      <div class="flex justify-center">
        <div
          v-for="life in count"
          :key="life"
          class="bg-green-500 w-40 h-40"
          @click="count--"
        ></div>
        <div
          v-for="dead in total - count"
          :key="dead"
          class="bg-green-500 w-40 h-40"
          @click="count++"
        ></div>
      </div>
      <template #footer> 点击人像加减生命 </template>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
