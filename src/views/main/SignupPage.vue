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
      <button 
        @click="sendEmailCode" 
        :disabled="isSendingCode"
      >
        {{ isSendingCode ? '인증코드 재전송' : '인증코드 보내기' }}
      </button>
    </div>

    <div class="input-group">
      <label for="emailCode">이메일 인증코드</label>
      <input 
        type="text" 
        id="emailCode"
        v-model="emailCode" 
        placeholder="인증코드 입력"
        required
      />
      <button @click="verifyEmailCode">
        인증
      </button>
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
      emailCode: '',
      isEmailVerified: false,
      isSendingCode: false
    };
  },
  methods: {

    async sendEmailCode() {
      if (!this.email) {
        alert('이메일을 입력해주세요.');
        return;
      }

      try {
        this.isSendingCode = true;
        const response = await api.post('/auth/send-email-code', {
          email: this.email
        });

        alert(response.data.message || '인증코드 발송 성공');
        setTimeout(() => {
          this.isSendingCode = false;
        }, 30000);
      } catch (error) {
        alert('인증코드 발송 실패. 다시 시도해주세요.');
      }
    },

    async verifyEmailCode() {
      if (!this.emailCode) {
        alert('인증코드를 입력해주세요.');
        return;
      }

      try {
        const response = await api.post('/auth/verify-email', {
          email: this.email,
          code: this.emailCode
        });

        if (response.data.verified) {
          this.isEmailVerified = true;
          alert('이메일 인증 완료!');
        } else {
          alert('인증코드가 올바르지 않습니다.');
        }
      } catch (error) {
        alert('인증 실패. 다시 시도해 주세요.');
      }
    },


    async signup() {
      if (!this.isEmailVerified) {
        alert('이메일 인증을 완료해주세요.');
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      try {
        const response = await api.post('/auth/register', {
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
