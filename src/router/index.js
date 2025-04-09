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
  },
  {
    path: '/blog-create',
    name: 'CreateBlog',
    component: CreateBlog,
    meta: { layout: 'MainLayout', requiresAuth: true }
  },
  {
    path: '/blog/:blogFid/manage/member',
    name: 'ManageBlogMember',
    component: ManageBlog,
    meta: { layout: 'BlogManageLayout', requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
import api from '@/api.js';
import CreateBlog from '@/views/blog/CreateBlog.vue';
import ManageBlog from '@/views/blog/ManageBlogMember.vue';

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.token && !authStore.user) {
    try {
      const res = await api.get('/api/members');
      authStore.setUser(res.data);
    } catch (e) {
      console.error('Failed to fetch user info:', e);
      authStore.logout();
      return next('/auth/login');
    }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    alert('로그인이 필요합니다.');
    return next('/auth/login');
  }

  if (to.path === '/auth/login' && authStore.isAuthenticated) {
    return next(`/blog/${authStore.user.mainBlogFid}`);
  }

  return next();
});


export default router;
