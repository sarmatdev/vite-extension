import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import registerBaseComponents from './helpers/registerBaseComponents'
import registerDirectives from './helpers/registerDirectives'
import './assets/styles/tailwind.css'
import 'animate.css'

export const app = createApp(App)

registerBaseComponents(app)
registerDirectives(app)

app.use(store).use(router).mount('#app')
