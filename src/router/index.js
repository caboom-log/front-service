import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';

import MainPage from '@/views/main/MainPage.vue';
import BlogMain from '@/views/blog/BlogMain.vue';
import WritePost from '@/views/blog/WritePost.vue';
import LoginPage from '@/views/main/LoginPage.vue';
import SignupPage from '@/views/main/SignupPage.vue';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    meta: { layout: 'MainLayout' }
  },
  {
    path: '/blog/:blogFid',
    name: 'BlogMain',
    component: BlogMain,
    meta: { layout: 'BlogLayout' }
  },
  {
    path: '/blog/:blogFid/write',
    name: 'WritePost',
    component: WritePost,
    meta: { layout: 'BlogLayout', requiresAuth: true }
  },
  {
    path: '/auth/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { layout: 'AuthLayout' }
  },
  {
    path: '/member/signup',
    name: 'SignupPage',
    component: SignupPage,
    meta: { layout: 'AuthLayout' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      alert('로그인이 필요합니다.');
      next('/auth/login');
    } else if (to.path === '/auth/login' && authStore.isAuthenticated) {
      next(`/blog/${authStore.user.blogFid}`);
    } else {
      next();
    }
  });

export default router;
