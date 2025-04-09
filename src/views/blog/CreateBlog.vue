<template>
    <div class="create-blog container mt-5">
      <h2 class="mb-4">블로그 생성</h2>
      <form @submit.prevent="createBlog">
        <div class="mb-3">
          <label class="form-label">블로그 주소 * </label>
          <input type="text" class="form-control" placeholder="url 상에 표시될 주소를 입력하세요✨ (영문, 숫자만 허용)"
          v-model="blog.blogFid" required />
        </div>

        <div class="mb-3">
          <label class="form-label">블로그 이름 * </label>
          <input type="text" class="form-control" v-model="blog.blogName" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">닉네임 *</label>
          <input type="text" class="form-control" placeholder="블로그 내에서 사용할 닉네임을 입력하세요.✨"
          v-model="blog.mbNickname" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">블로그 설명</label>
          <textarea class="form-control" rows="3" v-model="blog.blogDesc" />
        </div>
  
        <div class="mb-3">
          <label class="form-label">공개 여부</label>
          <select class="form-select" v-model="blog.blogPublic">
            <option :value="true">공개</option>
            <option :value="false">비공개</option>
          </select>
        </div>
  
        <div class="mb-3">
          <label class="form-label">블로그 유형</label>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="personal" value="personal" v-model="blog.blogType" />
            <label class="form-check-label" for="personal">개인 블로그</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="team" value="team" v-model="blog.blogType" />
            <label class="form-check-label" for="team">팀 블로그</label>
          </div>
        </div>
  
        <button type="submit" class="btn btn-primary mt-3">블로그 생성</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import api from '@/api';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const blog = ref({
    blogFid: '',
    mbNickname: '',
    blogName: '',
    blogDesc: '',
    blogPublic: true,
    blogType: 'personal'
  });
  
  const createBlog = async () => {
    try {
      await api.post('/api/blogs', blog.value);
      alert('블로그가 성공적으로 생성되었습니다!');
      router.push(`/blog/${blog.value.blogFid}`);
    } catch (e) {
      console.error(e);
      alert('블로그 생성 중 오류가 발생했습니다.');
    }
  };
  </script>
  
    <style scoped>

.create-blog {
    max-width: 600px;
    margin: 0 auto;
  }
  
    </style>