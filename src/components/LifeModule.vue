<script setup lang="ts">
import { ref } from 'vue'

import PersonIcon from '@/assets/person.svg'
import { useGlobalStore } from '@/stores/global'

const store = useGlobalStore()
const total = 4

const visible = ref(false)
</script>

<template>
  <div class="p-6px" v-bind="$attrs" @click="visible = true">
    <p>剩余生命:</p>
    <div class="flex justify-center">
      <n-icon v-for="life in store.life" :key="life" color="green" size="40">
        <PersonIcon />
      </n-icon>
      <n-icon
        v-for="dead in total - store.life"
        :key="dead"
        color="gray"
        size="40"
      >
        <PersonIcon />
      </n-icon>
    </div>
  </div>

  <n-modal v-model:show="visible">
    <n-card title="剩余生命" class="w-300px">
      <div class="flex justify-start">
        <n-icon
          v-for="life in store.life"
          :key="life"
          color="green"
          size="60"
          @click="store.life -= store.life - life"
        >
          <PersonIcon />
        </n-icon>
        <n-icon
          v-for="dead in total - store.life"
          :key="dead"
          color="gray"
          size="60"
          @click="store.life += dead"
        >
          <PersonIcon />
        </n-icon>
      </div>
      <template #footer>
        <p>点击人像加减生命</p>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
