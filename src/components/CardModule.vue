<script setup lang="ts">
import { ref } from 'vue'
import { useCardStore } from '@/stores/cards'
import cardBack from '@/assets/card-back.png'
import BulletIcon from '@/assets/bullet.svg'
import { useBulletStore } from '@/stores/bullet'

const store = useCardStore()
const bulletStore = useBulletStore()
const visible = ref(false)

const index = ref(0)

const draw = () => {
  store.draw()
  index.value = store.hand.length - 1
}

const checkModalVisible = ref(false)
const checkNum = ref(1)
const check = (num: number) => {
  checkNum.value = num
  checkModalVisible.value = true
}

const rollModalVisible = ref(false)
const rollNum = ref(1)
const roll = () => {
  rollNum.value = Math.ceil(Math.random() * 6)
  rollModalVisible.value = true
}
</script>

<template>
  <div class="p-6px" v-bind="$attrs">
    <p>行动卡({{ store.hand.length }})</p>
    <div class="flex">
      <img
        :src="cardBack"
        class="w-30 h-40 object-contain"
        alt="cardBack"
        @click="visible = true"
      />
    </div>
  </div>

  <n-modal v-model:show="visible">
    <n-card :title="'行动卡\:' + store.hand.length" class="w-350px h-430px">
      <template #header-extra>
        <n-button type="primary" @click="draw"> 抽一张 </n-button>
      </template>
      <n-carousel
        v-model:current-index="index"
        class="h-5/6"
        :space-between="10"
        :slides-per-view="1"
        :loop="false"
        :show-dots="false"
        draggable
      >
        <n-card
          v-for="card in store.hand"
          :key="card.id"
          embedded
          :title="card.name"
          class="w-300px h-260px"
        >
          <template #header-extra> 使用阶段：{{ card.phase }} </template>
          <p>{{ card.description }}</p>
          <template #action>
            <n-button type="info" @click="() => store.discard(card.id)">
              使用
            </n-button>
          </template>
        </n-card>
      </n-carousel>
      <div class="flex justify-between">
        <n-button type="primary" @click="() => check(3)">看3颗子弹</n-button>
        <n-button type="primary" @click="() => check(1)">看1颗子弹</n-button>
        <n-button type="primary" @click="roll">投骰子</n-button>
      </div>
    </n-card>
  </n-modal>

  <n-modal v-model:show="checkModalVisible">
    <n-card title="查看子弹" class="w-350px">
      <n-icon
        v-for="(isReal, i) in bulletStore.seq.slice(0, checkNum)"
        :key="i"
        :color="isReal ? 'red' : 'gray'"
        size="60"
      >
        <BulletIcon />
      </n-icon>
    </n-card>
  </n-modal>
  <n-modal v-model:show="rollModalVisible">
    <n-card title="投骰子" class="w-350px">
      <span class="text-size-10rem">{{ rollNum }}</span>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
