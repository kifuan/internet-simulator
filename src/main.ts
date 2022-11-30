import { createApp } from 'vue'
import { Dialog, Quasar } from 'quasar'
import 'quasar/dist/quasar.css'

import App from './App.vue'
import './style.css'

createApp(App).use(Quasar, {
  plugins: { Dialog },
}).mount('#app')
