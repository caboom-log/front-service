<template>
  <div class="position-sticky" style="top: 2rem;">
    <div class="p-4 mb-3 bg-body-tertiary rounded">
      <div v-if="isAuthenticated" class="mb-2">
        {{ user.mbEmail }}님 반갑습니다 😊
      </div>
      <router-link
        :to="blogLink"
        class="btn btn-lg btn-outline-info me-2"
      >
        내 블로그 바로가기
      </router-link>
      <router-link
        to="/member/signup"
        class="btn btn-lg btn-outline-info"
      >
        회원가입
      </router-link>

      <router-link
        to="/blog-create"
        class="btn btn-lg btn-outline-info"
      >
        블로그 만들기
      </router-link>
    </div>

    <div v-if="blogs.length" class="mt-4">
        <h6 class="fw-bold">내 블로그 목록</h6>
        <div
          v-for="blog in blogs"
          :key="blog.blogFid"
          class="d-flex justify-content-between align-items-center mb-2"
        >
          <span>{{ blog.blogName }}</span>
          <div>
            <router-link :to="`/blog/${blog.blogFid}`" class="btn btn-sm btn-outline-primary me-2">
              바로가기
            </router-link>
            <router-link :to="`/blog/${blog.blogFid}/manage/member`" class="btn btn-sm btn-outline-secondary">
              관리하기
            </router-link>
          </div>
          </div>
          </div>
    
    </div>
 
</template>

<script>
import { useAuthStore } from '@/store/auth';
import { computed, ref, onMounted } from 'vue';
import api from '@/api';

export default {
  setup() {
    const authStore = useAuthStore();
    const blogs = ref([]);

    const blogLink = computed(() => {
      return authStore.user
        ? `/blog/${authStore.user.mainBlogFid}`
        : '/auth/login';
    });

    const fetchBlogs = async () => {
      if (!authStore.user) return;
      try {
        const res = await api.get(`/api/blogs/me`);
        blogs.value = res.data.content;
      } catch (err) {
        console.error('블로그 목록 조회 실패', err);
      }
    };

    onMounted(() => {
      if (authStore.isAuthenticated) {
        fetchBlogs();
      }
    });

    return {
      isAuthenticated: authStore.isAuthenticated,
      user: authStore.user,
      blogLink,
      blogs,
    };
  },
};
</script>