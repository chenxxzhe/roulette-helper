<script setup lang="ts">
import { ref } from 'vue'
import AddIcon from '@/assets/add.svg'
import MinusIcon from '@/assets/minus.svg'
import { useGlobalStore } from '@/stores/global'

const store = useGlobalStore()
const visible = ref(false)
const add = () => {
  if (store.bet < 5) {
    store.bet += 1
  }
}
const minus = () => {
  if (store.bet > 0) {
    store.bet -= 1
  }
}
</script>

<template>
  <div class="p-6px w-8rem" v-bind="$attrs" @click="visible = true">
    <p>下注额:</p>
    <p class="text-size-7rem text-center">{{ store.bet }}</p>
  </div>

  <n-modal v-model:show="visible">
    <n-card title="下注额" class="w-50">
      <div class="flex">
        <div class="w-12rem h-6rem text-size-6rem">{{ store.bet }}</div>
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
      <template #footer> 可以不开枪，最多 5 枪 </template>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
