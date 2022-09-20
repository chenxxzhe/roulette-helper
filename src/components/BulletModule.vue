<script setup lang="ts">
import { CSSProperties, ref } from 'vue'
import { useBulletStore } from '@/stores/bullet'

const store = useBulletStore()

const visible = ref(false)

const railStyle = ({ checked }: { checked: boolean }) => {
  const style: CSSProperties = {}
  style.background = checked ? '#2080f0' : 'rgba(0, 0, 0, 0.14)'
  return style
}
</script>

<template>
  <!-- 缩略图, 点击打开弹窗 -->
  <div class="flex flex-col border-light-50" @click="visible = true">
    <div v-for="r in store.real" :key="r" class="bg-red-500 w-20 h-20"></div>
    <div
      v-for="f in store.total - store.real"
      :key="f"
      class="bg-gray-500 w-20 h-20"
    ></div>

    <div>点击查看子弹, 隐藏子弹</div>
  </div>

  <n-modal v-model:show="visible">
    <n-card title="分数">
      <div class="flex flex-col border-light-50">
        <div
          v-for="r in store.real"
          :key="r"
          class="bg-red-500 w-20 h-20"
          @click="store.real--"
        ></div>
        <div
          v-for="f in store.total - store.real"
          :key="f"
          class="bg-gray-500 w-20 h-20"
          @click="store.real++"
        ></div>

        <div>
          你隐藏的子弹:
          <n-switch v-model:value="store.hide" :rail-style="railStyle">
            <template #checked> 实心子弹 </template>
            <template #unchecked> 空子弹 </template>
          </n-switch>
        </div>
      </div>
      <template #footer> 点击子弹切换是否实心 </template>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
