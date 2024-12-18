import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from '@/utils/vuetifyTheme.js'
import Toast from 'vue-toastification'

import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'

import './style.css'
import 'vuetify/styles'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(vuetify)
app.use(Toast, {})
app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine)
  },
})

app.mount('#app')
