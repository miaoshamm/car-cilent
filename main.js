import App from './App'
import uviewPlus from 'uview-plus'
import { createPinia } from 'pinia'

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	const pinia = createPinia()
	app.use(pinia)
	app.use(uviewPlus)
  return {
    app
  }
}
// #endif