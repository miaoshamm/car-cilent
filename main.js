import App from './App'
import uviewPlus from 'uview-plus'
import * as Pinia from 'pinia';
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	const pinia = Pinia.createPinia();
	app.use(pinia);
	app.use(uviewPlus)
  return {
    app,
		Pinia
  }
}
// #endif