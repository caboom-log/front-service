<template>
  <div class="auth-form">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="input-group">
        <i class="bx bxs-user"></i>
        <input type="text" v-model="email" placeholder="이메일 아이디 입력">
      </div>
      <div class="input-group">
        <i class="bx bxs-lock-alt"></i>
        <input type="password" v-model="password" placeholder="패스워드 입력">
      </div>
      <button type="submit" @click="login">로그인</button>
    </form>
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
      router.push(`/blog/${authStore.user.mainBlogFid}`);
    }

    const login = async () => {
      event?.preventDefault();
      try {
        const response = await api.post('/auth/login', {
          email: email.value,
          password: password.value
          }, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        const accessToken = response.data.token;
        authStore.setToken(accessToken);

        const userResponse = await api.get('/api/members');
        console.log("user response" , userResponse)
        authStore.setUser(userResponse.data.content);

        if (response.status === 401 || response.status === 403) {
          alert('아이디 또는 패스워드를 다시 확인해주세요.');
        } else if (response.status === 200) {
          router.push(`/blog/${authStore.user.mainBlogFid}`);
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
