<template>
  <div class="auth-form">
    <h2>Sign up</h2>

    <div class="input-group">
      <label for="email">이메일 아이디</label>
      <i class="bx bx-mail-send"></i>
      <input 
        type="email" 
        id="email"
        v-model="email" 
        required
      />
    </div>

    <div class="input-group">
      <label for="username">사용자 이름</label>
      <i class="bx bxs-user"></i>
      <input 
        type="text" 
        id="username"
        v-model="username" 
        required
      />
    </div>

    <div class="input-group">
      <label for="password">비밀번호</label>
      <i class="bx bxs-lock-alt"></i>
      <input 
        type="password" 
        id="password"
        v-model="password" 
        required
      />
    </div>

    <div class="input-group">
      <label for="passwordConfirm">비밀번호 확인</label>
      <i class="bx bxs-lock-alt"></i>
      <input 
        type="password" 
        id="passwordConfirm"
        v-model="passwordConfirm" 
        required
      />
    </div>

    <div class="input-group">
      <label for="mobile">휴대폰 번호</label>
      <i class="bx bxs-user"></i>
      <input 
        type="tel" 
        id="mobile"
        v-model="mobile" 
        placeholder="010-0000-0000"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        required
      />
    </div>

    <div class="input-group">
      <label for="blogFid">블로그 아이디</label>
      <i class="bx bxs-user"></i>
      <input 
        type="text" 
        id="blogFid"
        v-model="blogFid" 
        placeholder="영문 소문자와 숫자만 포함 가능"
        pattern="^[a-z][a-z0-9]*$"
        required
      />
    </div>

    <button @click="signup">
      회원가입
    </button>
  
    <p>
      이미 계정이 있으신가요?  
      <router-link to="/auth/login">
        <b>로그인</b>
      </router-link>
    </p>

  </div>
</template>
  
<script>
import api from '@/api';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      mobile: '',
      blogFid: ''
    };
  },
  methods: {
    async signup() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      try {
        const response = await api.post('/api/auth/register', {
          "username": this.username,
          "email": this.email,
          "password": this.password,
          "password-confirm": this.passwordConfirm,
          "mobile": this.mobile,
          "blog-fid": this.blogFid
        });

        if (response.status === 201) {
          this.$router.push('/auth/login');
        } else {
          alert(`회원가입 실패: ${response.data.message || '알 수 없는 오류가 발생했습니다.'}`);
        }
      } catch (error) {
        alert('오류가 발생했습니다.');
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/auth.css';
</style>
