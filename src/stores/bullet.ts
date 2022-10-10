// 统计当前子弹状况
import { defineStore } from 'pinia'
import { shuffle } from '@/utils'
import { useLocalStorage } from '@vueuse/core'

const seq = shuffle([true].concat(new Array(5).fill(false))) as boolean[]

export const useBulletStore = defineStore('bullet', {
  state: () => ({
    /** 子弹总数 */
    total: 6,
    /** 是否隐藏实心子弹 */
    hide: useLocalStorage('bullet/hide', false),
    /** 实心子弹 */
    real: useLocalStorage('bullet/real', 1),
    /** 子弹顺序 */
    seq: useLocalStorage('bullet/seq', seq),
    /** 当前开第几枪 */
    fireIndex: useLocalStorage('bullet/index', 0),
  }),
  actions: {
    /** 重新排序 */
    shuffle() {
      const realNum = this.real - (this.hide ? 1 : 0)
      const arr = new Array(this.total).fill(true).fill(false, realNum)
      this.seq = shuffle(arr)
    },
    /** 调整实心子弹数量 */
    changeReal(delta: number) {
      this.real += delta
      this.shuffle()
    },
    /** 切换隐藏的子弹 */
    changeHide(isReal: boolean) {
      this.hide = !isReal
      this.resetGun()
    },
    /** 开枪 */
    fire() {
      if (this.fireIndex >= this.total) return
      this.fireIndex += 1
    },
    /** 重新装弹, 不移除新增的实心弹 */
    resetGun() {
      this.fireIndex = 0
      this.shuffle()
    },
  },
})
