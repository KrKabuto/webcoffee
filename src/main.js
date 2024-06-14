import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import anime from 'animejs/lib/anime.es.js';
  
//connectDatabase()
const app = createApp(App)

registerPlugins(app)
app.mount('#app')


    