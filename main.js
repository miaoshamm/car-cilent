import App from './App'
import uviewPlus from 'uview-plus'
import * as Pinia from 'pinia';
import share from './utils/share.js'
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	app.mixin(share)
	const pinia = Pinia.createPinia();
	app.use(pinia);
	app.use(uviewPlus)
	wx.cloud.init();
  return {
    app,
		Pinia
  }
}
// #endif