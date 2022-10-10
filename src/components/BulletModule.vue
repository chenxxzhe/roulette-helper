<script setup lang="ts">
import { CSSProperties, ref } from 'vue'
import { useBulletStore } from '@/stores/bullet'
import BulletIcon from '@/assets/bullet.svg'

const store = useBulletStore()

const visible = ref(false)

/** 切换字典开关样式 */
const railStyle = ({ checked }: { checked: boolean }) => {
  const style: CSSProperties = {}
  style.background = checked ? 'red' : 'rgba(0, 0, 0, 0.14)'
  return style
}
</script>

<template>
  <div
    class="flex flex-col p-6px w-80px"
    v-bind="$attrs"
    @click="visible = true"
  >
    <n-icon v-for="r in store.real" :key="r" color="red" size="40">
      <BulletIcon />
    </n-icon>
    <n-icon
      v-for="f in store.total - store.real"
      :key="f"
      color="gray"
      size="40"
    >
      <BulletIcon />
    </n-icon>

    <div>点击修改与隐藏子弹</div>
  </div>

  <n-modal v-model:show="visible">
    <n-card title="子弹数量" class="w-270px">
      <div class="mb-6px">
        <n-icon
          v-for="r in store.real"
          :key="r"
          color="red"
          size="60"
          @click="store.real -= store.real - r"
        >
          <BulletIcon />
        </n-icon>
        <n-icon
          v-for="f in store.total - store.real"
          :key="f"
          color="gray"
          size="60"
          @click="store.real += f"
        >
          <BulletIcon />
        </n-icon>
      </div>
      <div>
        你隐藏的子弹:
        <n-switch
          v-model:value="store.hide"
          :rail-style="railStyle"
          @update:value="store.resetGun"
        >
          <template #checked> 实心子弹 </template>
          <template #unchecked> 空子弹 </template>
        </n-switch>
      </div>
      <template #footer>
        只要修改 实心子弹 或切换 隐藏子弹 ，就会自动重新装弹。
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
