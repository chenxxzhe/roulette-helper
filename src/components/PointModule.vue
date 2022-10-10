<script setup lang="ts">
import { ref } from 'vue'
import AddIcon from '@/assets/add.svg'
import MinusIcon from '@/assets/minus.svg'
import { useGlobalStore } from '@/stores/global'

const store = useGlobalStore()
const visible = ref(false)
const add = () => {
  if (store.point < 15) {
    store.point += 1
  }
}
const minus = () => {
  if (store.point > 0) {
    store.point -= 1
  }
}
</script>

<template>
  <div class="w-8rem p-6px" v-bind="$attrs" @click="visible = true">
    <p>分数:</p>
    <p class="text-size-7rem text-pink-600 text-center">{{ store.point }}</p>
  </div>

  <n-modal v-model:show="visible">
    <n-card title="分数" class="w-50">
      <div class="flex">
        <div class="w-12rem h-6rem text-size-6rem">{{ store.point }}</div>
        <div>
          <p>
            <n-button circle @click="add">
              <template #icon>
                <n-icon><AddIcon /></n-icon>
              </template>
            </n-button>
          </p>
          <p class="mt-5">
            <n-button circle @click="minus">
              <template #icon>
                <n-icon><MinusIcon /></n-icon>
              </template>
            </n-button>
          </p>
        </div>
      </div>
      <template #footer> 15 分获胜 </template>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
