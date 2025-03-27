import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { ToastService } from 'primevue'
import { WholistikaThemePreset } from './components/preset.theme'
const app = createApp(App)

app.use(createPinia())
app.use(ToastService)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: WholistikaThemePreset,
    options: {
      darkModeSelector: '.wholistika-dark-mode',
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
    },
  },
})

app.mount('#app')
