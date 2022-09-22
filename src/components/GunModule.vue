<script setup lang="ts">
import { useBulletStore } from '@/stores/bullet'
import GunImg from '@/assets/gun.svg'
import fireSound from '@/assets/fire.mp3'
import emptyFireSound from '@/assets/empty-fire.mp3'
import reloadSound from '@/assets/reload-bullet.mp3'
import { Howl } from 'howler'

// TODO: 动画, 转轮

const store = useBulletStore()

const useAudio = () => {
  const soundMap = {
    fire: fireSound,
    empty: emptyFireSound,
    reload: reloadSound,
  }
  const contextMap = Object.fromEntries(
    Object.entries(soundMap).map(([key, url]) => [
      key,
      new Howl({ src: [url] }),
    ]),
  )
  return {
    stop() {
      Object.values(contextMap).forEach((au) => au.stop())
    },
    play(key: keyof typeof soundMap) {
      contextMap[key].play()
    },
  }
}

const audio = useAudio()

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
</script>

<template>
  <div v-bind="$attrs">
    <div>
      <n-icon size="200">
        <GunImg />
      </n-icon>
    </div>
    <div class="flex justify-center">
      <n-button :disabled="store.fireIndex >= 5" @click="fire">开枪</n-button>
      <n-button @click="resetGun">重新装弹</n-button>
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
