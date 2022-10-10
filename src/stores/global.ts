import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    point: useLocalStorage('global/point', 0),
    bet: useLocalStorage('global/bet', 0),
    life: useLocalStorage('global/life', 4),
  }),
})
