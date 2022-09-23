import { shuffle } from '@/utils'
import { defineStore } from 'pinia'

type Phase = '藏子弹' | '转轮' | '挑战' | '开枪' | '得分'

interface Card {
  name: string
  /** 阶段 */
  phase: Phase
  /** 数量 */
  number: number
  description: string
}

interface CardWithId extends Card {
  id: string
}

const list: Card[] = [
  {
    name: '干了伏特加!',
    phase: '得分',
    description:
      '如果你是活着玩家中赌注最高的玩家，你可以额外获得 2 分。如果你跟别人打平，则可额外获得 1 分。',
    number: 1,
  },
  {
    name: '掏口袋!',
    phase: '得分',
    description:
      '你可以在这个阶段质疑一名玩家作弊，无论你有没有在“挑战”阶段质疑过。',
    number: 1,
  },
  {
    name: '贿赂裁判',
    phase: '挑战',
    description:
      '被人抓到作弊后，你的队员不会被裁判射杀。你需要用自己藏起来的实心子弹去替换子弹堆中的空子弹，并且重新洗匀子弹堆。正确质疑你的玩家仍然会获得 3 张行动卡作为奖励。',
    number: 1,
  },
  {
    name: '偷窥！',
    phase: '转轮',
    description:
      '你可以偷窥自己子弹堆的前 3 颗子弹，并且选择其他一名玩家，他可以偷窥他子弹堆里的第 1 颗子弹。',
    number: 4,
  },
  {
    name: '鸣枪庆祝!',
    phase: '开枪',
    description: '接下来的一枪，所有活着的玩家都指向天空而非自己。',
    number: 3,
  },
  {
    name: '就打你!',
    phase: '开枪',
    description: '你接下来的一枪指向其他任意玩家，而非自己。',
    number: 3,
  },
  {
    name: '再来一发!',
    phase: '得分',
    description:
      '选择任意一名活着的玩家，他必须再开一枪，但这次开枪不计算分数。',
    number: 2,
  },
  {
    name: '空枪',
    phase: '开枪',
    description: '你接下来的一枪指向天空而不是你自己。',
    number: 3,
  },
  {
    name: '多开一枪!',
    phase: '挑战',
    description:
      '选择任意一名玩家，他必须把赌注 +1 。如果他的赌注为 5 ，则将他的赌注变成 0 。',
    number: 3,
  },
  {
    name: '死亡之骰',
    phase: '挑战',
    description:
      '选择任意一名玩家，他必须投掷骰子，骰子的结果会作为本轮的下注额。',
    number: 2,
  },
  {
    name: '上子弹!',
    phase: '藏子弹',
    description:
      '选择任意一名玩家，那名玩家必须吧自己子弹堆中的一颗空子弹变成实心子弹。',
    number: 2,
  },
  {
    name: '互射吧!',
    phase: '开枪',
    description: '接下来的一枪，所有活着的玩家需要指向其他玩家而非自己。',
    number: 3,
  },
  {
    name: '两连发',
    phase: '开枪',
    description:
      '必须在开过两枪后使用，你接下来的两枪可以指向任意一名活着的玩家。在第一枪之后你可以选择更换目标。',
    number: 2,
  },
]

const deck = list.reduce((arr, card) => {
  const all = new Array(card.number)
    .fill(null)
    .map((_, i) => ({ ...card, id: card.name + i }))
  return arr.concat(all)
}, [] as CardWithId[])

export const useCardStore = defineStore('cards', {
  state: () => ({
    /** 所有牌的类型数量 */
    /** 剩余牌库 */
    deck: shuffle(deck),
    /** 手牌 */
    hand: [] as CardWithId[],
    /** 弃牌堆 */
    discardPile: [] as CardWithId[],
  }),
  actions: {
    draw() {
      const card = this.deck.pop()
      if (card) this.hand.push(card)
    },
    discard(id: string) {
      const index = this.hand.findIndex((card) => card.id === id)
      const card = this.hand.splice(index, 1)[0]
      this.discardPile.push(card)
    },

    // TODO: 手动标记别人已使用的卡牌
  },
})
