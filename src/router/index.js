import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';

import MainPage from '@/views/main/MainPage.vue';
import BlogMain from '@/views/blog/BlogMain.vue';
import WritePost from '@/views/blog/posts/WritePost.vue';
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
  },
  {
    path: '/blog/:blogFid/manage/info',
    name: 'ManageBlogInfo',
    component: ManageBlogInfo,
    meta: { layout: 'BlogManageLayout', requiresAuth: true }
  },
  {
    path: '/blog/:blogFid/manage/category',
    name: 'ManageCategory',
    component: ManageCategory,
    meta: { layout: 'BlogManageLayout', requiresAuth: true }
  },
  {
    path: '/blog/:blogFid/write',
    name: 'WritePost',
    component: WritePost,
    meta: { layout: 'BlogSimpleLayout', requiresAuth: true }
  },
  {
    path: '/blog/:blogFid/post/:postId',
    name: 'PostDetail',
    component: PostDetail,
    meta: { layout: 'BlogSimpleLayout' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
import api from '@/api.js';
import CreateBlog from '@/views/blog/CreateBlog.vue';
import ManageBlog from '@/views/blog/manage/ManageBlogMember.vue';
import ManageBlogInfo from '@/views/blog/manage/ManageBlogInfo.vue';
import ManageCategory from '@/views/blog/manage/ManageCategory.vue';
import PostDetail from '@/views/blog/posts/PostDetail.vue';

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
