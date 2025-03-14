<template>
  <header class="border-bottom lh-1 py-3">
    <div class="row flex-nowrap justify-content-between align-items-center">
      <div class="col-4 pt-1">
        <a class="link-secondary" href="#">Random Blog</a>
      </div>
      <div class="col-4 text-center">
        <a class="blog-header-logo text-body-emphasis text-decoration-none" href="/">Blog</a>
      </div>
      <div class="col-4 d-flex justify-content-end align-items-center">

        <router-link v-if="!isAuthenticated" to="/auth/login">Login</router-link>
        <button v-else @click="logout">Logout</button>

      </div>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const logout = () => {
      authStore.logout();
      router.push('/');
    };

    return {
      isAuthenticated: authStore.isAuthenticated,
      logout
    };
  },
}
</script>

  