import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../layouts/Layout.vue';
import Login from '../views/Login.vue';
import Titles from '../views/Titles.vue';
import Testimonies from '../views/Testimonies.vue';
import Settings from '../views/Settings.vue';
import Services from '../views/Services.vue';
import Home from '../views/Home.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: Titles },
      { path: 'testimonies', component: Testimonies },
      { path: 'settings', component: Settings },
      { path: 'services', component: Services }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/');
  } else {
    next();
  }
});

export default router;
