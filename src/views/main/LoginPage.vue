<template>
  <div class="auth-form">
    <h2>Login</h2>
    <div class="input-group">
      <i class="bx bxs-user"></i>
      <input type="text" v-model="email" placeholder="이메일 아이디 입력">
    </div>
    <div class="input-group">
      <i class="bx bxs-lock-alt"></i>
      <input type="password" v-model="password" placeholder="패스워드 입력">
    </div>
    <button @click="login">로그인</button>
    <p>
      아직 가입하지 않으셨나요? 
      <router-link to="/member/signup">
        <b>회원가입</b>
      </router-link>
    </p>

    <p>
      <router-link to="/">
        <b>메인 페이지로 돌아가기</b>
      </router-link>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import api from '@/api';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const email = ref('');
    const password = ref('');

    if (authStore.isAuthenticated) {
      router.push(`/blog/${authStore.user.blogFid}`);
    }

    const login = async () => {
      try {
        const response = await api.post('/auth/login', {
          email: email.value,
          password: password.value
        });

        authStore.setToken(response.data.token);

        const userResponse = await api.get('/api/members', {
          headers: {
            Authorization: `Bearer ${response.data.token}`
          }
        });

        authStore.setUser(userResponse.data);

        if (response.status === 200) {
          router.push(`/blog/${userResponse.data.blogFid}`);
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    return {
      email,
      password,
      login
    };
  }
};
</script>

<style scoped>
@import '@/assets/auth.css';
</style>
