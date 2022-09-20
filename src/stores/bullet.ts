// 统计当前子弹状况
import { defineStore } from 'pinia'

export const useBulletStore = defineStore('bullet', {
  state: () => ({
    /** 子弹总数 */
    total: 6,
    /** 是否隐藏实心子弹 */
    hide: 0,
    /** 实心子弹 */
    real: 1,
  }),
})
