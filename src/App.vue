<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import LifeModule from './components/LifeModule.vue'
import BulletModule from './components/BulletModule.vue'
import GunModule from './components/GunModule.vue'
import BetModule from './components/BetModule.vue'
import PointModule from './components/PointModule.vue'
import CardModule from './components/CardModule.vue'
import { useBulletStore } from './stores/bullet'
import { useCardStore } from './stores/cards'
import { useGlobalStore } from './stores/global'

const reset = () => {
  const stores = [useBulletStore(), useCardStore(), useGlobalStore()]
  localStorage.clear()
  stores.forEach((s) => s.$reset())
}
</script>

<template>
  <LifeModule class="absolute border left-0 top-0"></LifeModule>
  <PointModule class="absolute border right-0 top-0"></PointModule>
  <BulletModule class="absolute border left-0 top-1/5 z-50"></BulletModule>
  <GunModule class="absolute right-0 top-40"></GunModule>
  <BetModule class="absolute border right-0 bottom-0"></BetModule>
  <CardModule class="absolute border left-0 bottom-0"></CardModule>

  <n-popconfirm
    positive-text="确认"
    negative-text="取消"
    @positive-click="reset"
  >
    <template #trigger>
      <n-button
        class="absolute bottom-5 left-1/2 transform -translate-x-1/2"
        type="error"
      >
        重置所有
      </n-button>
    </template>
    确认重置？
  </n-popconfirm>
</template>
