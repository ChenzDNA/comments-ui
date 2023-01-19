import { createApp } from 'vue'
import './assets/main.css'
import './assets/animation.css'
import App from './App.vue'
import 'highlight.js/styles/github.css'
import { createPinia } from "pinia";

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')
