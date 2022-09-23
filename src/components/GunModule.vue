<script setup lang="ts">
import { ref, ComponentPublicInstance, watch } from 'vue'
import GunImg from '@/assets/gun.svg'
import { useBulletStore } from '@/stores/bullet'
import { useAudio } from '@/stores/audio'
import { useThrottleFn } from '@vueuse/core'

// TODO: 动画, 转轮

const audio = useAudio()
const store = useBulletStore()

const fire = () => {
  audio.stop()
  if (store.seq[store.fireIndex]) {
    audio.play('fire')
  } else {
    audio.play('empty')
  }
  store.fire()
}

const resetGun = () => {
  audio.stop()
  audio.play('reload')
  store.resetGun()
}

const gunEl = ref<ComponentPublicInstance | null>(null)
const stopWatch = watch(gunEl, (v) => {
  if (!v) return
  const svg = v.$el
  const triggerEl = svg.querySelector('.trigger') as SVGPathElement
  const triggerHotzone = svg.querySelector('.trigger-hotzone') as SVGPathElement
  triggerEl.onanimationend = () => {
    triggerEl.classList.remove('trigger-animation')
  }
  triggerHotzone.onclick = useThrottleFn(() => {
    if (store.fireIndex >= 6) return
    triggerEl.classList.add('trigger-animation')
    fire()
  }, 800)
  stopWatch()
})
</script>

<template>
  <div class="fixed top-1/2 left-0 transform -translate-y-1/2 -rotate-90">
    <n-icon size="60vh">
      <GunImg ref="gunEl" />
    </n-icon>
  </div>
  <div v-bind="$attrs">
    <div class="flex justify-center">
      <n-button @click="resetGun">重新装弹</n-button>
    </div>
    <div class="text-size-1rem w-7rem">
      <p class="text-center">
        <span v-if="store.fireIndex < 6">
          准备开第
          <span class="text-green-800">{{ store.fireIndex + 1 }}</span>
          枪
        </span>
        <span v-else>弹夹已清空</span>
      </p>
      <p v-for="i in store.fireIndex" :key="i" class="flex justify-around">
        <span> 第{{ i }}枪: </span>
        <span :class="[store.seq[i - 1] ? 'text-red-500' : '']">{{
          store.seq[i - 1] ? '实心' : '空枪'
        }}</span>
      </p>
    </div>
  </div>
</template>

<style>
.trigger.trigger-animation {
  transform-origin: 44% 47%;
  animation: trigger 0.3s ease-in;
  animation-iteration-count: 2;
  animation-direction: alternate;
}
@keyframes trigger {
  to {
    transform: rotate(45deg);
  }
}
</style>
