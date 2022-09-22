<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import LifeModule from './components/LifeModule.vue'
import BulletModule from './components/BulletModule.vue'
import GunModule from './components/GunModule.vue'
import BetModule from './components/BetModule.vue'
import PointModule from './components/PointModule.vue'
</script>

<template>
  <LifeModule class="absolute border left-0 top-0"></LifeModule>
  <PointModule class="absolute border right-0 top-0"></PointModule>
  <BulletModule class="absolute border left-0 top-1/5"></BulletModule>
  <GunModule
    class="absolute border left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
  ></GunModule>
  <BetModule class="absolute border right-0 bottom-0"></BetModule>
</template>

<style scoped></style>
