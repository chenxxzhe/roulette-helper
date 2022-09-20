import { createApp } from 'vue'
import './style.css'
import 'virtual:windi.css'
import { createPinia } from 'pinia'
import * as NaiveComponents from './naive-ui-components'
import App from './App.vue'

const { create: createNaive, ...comp } = NaiveComponents
const naive = createNaive({
  components: Object.values(comp),
})

createApp(App).use(naive).use(createPinia()).mount('#app')
