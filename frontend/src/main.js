// frontend/src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import './assets/main.css';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  ],
});

// Protección de rutas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/');
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');
