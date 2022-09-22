<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const visible = ref(false)
</script>

<template>
  <div
    class="flex justify-center border-light-50"
    v-bind="$attrs"
    @click="visible = true"
  >
    <span>{{ count }}</span>
  </div>

  <n-modal v-model:show="visible">
    <n-card title="下注额">
      <n-input-number v-model:value="count" :min="0" :max="5" clearable />
    </n-card>
  </n-modal>
</template>

<style scoped></style>
