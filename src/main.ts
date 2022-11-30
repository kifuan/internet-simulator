import { createApp } from 'vue'
import { Dialog, Quasar } from 'quasar'
import { createPinia } from 'pinia'
import 'quasar/dist/quasar.css'

import App from './App.vue'
import './style.css'

createApp(App).use(createPinia()).use(Quasar, {
  plugins: { Dialog },
}).mount('#app')
