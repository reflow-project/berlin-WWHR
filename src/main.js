import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './modules/store.js'

let app = createApp(App)
app.use(router);
app.use(store);
app.mount('#app');
