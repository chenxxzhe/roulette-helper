<script setup lang="ts">
import { ref } from 'vue'
import { useBulletStore } from '@/stores/bullet'

// TODO: 动画, 开枪, 音效, 转轮

const store = useBulletStore()
</script>

<template>
  <div v-bind="$attrs">
    <div class="flex justify-center border-light-50">
      <n-button :disabled="store.fireIndex >= 5" @click="store.fire"
        >开枪</n-button
      >
      <n-button @click="store.resetGun">重新装弹</n-button>
    </div>
    <div>
      <p>
        准备开第
        <span class="text-green-800">{{ store.fireIndex + 1 }}</span>
        枪
      </p>
      <p v-for="i in store.fireIndex" :key="i">
        第{{ i }}枪:
        <span :class="[store.seq[i - 1] ? 'text-red-500' : '']">{{
          store.seq[i - 1] ? '实心' : '空枪'
        }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
