<script setup lang="ts">
import { ref } from 'vue'

// TODO: 动画, 开枪, 音效, 转轮

const fire = () => {
  console.log('fire')
}
</script>

<template>
  <!-- 缩略图, 点击打开弹窗 -->
  <div class="flex justify-center border-light-50">
    <n-button @click="fire">开枪</n-button>
  </div>
</template>

<style scoped></style>
