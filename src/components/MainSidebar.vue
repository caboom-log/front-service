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
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth';
import { computed } from 'vue';

export default {
  setup() {
    const authStore = useAuthStore();

    const blogLink = computed(() => {
      console.log(authStore.user)
      return authStore.user
        ? `/blog/${authStore.user.mainBlogFid}`
        : '/auth/login';
    });

    return {
      isAuthenticated: authStore.isAuthenticated,
      user: authStore.user,
      blogLink,
    };
  },
};
</script>
