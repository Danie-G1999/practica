import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router.js';
import './assets/main.css';
import notifier from './assets/utils/notifier.js';
import '@fortawesome/fontawesome-free/css/all.css'
import '@splidejs/vue-splide/css'

const app = createApp(App)

app.config.globalProperties.$notifier = notifier

app.use(router)
app.mount('#app')