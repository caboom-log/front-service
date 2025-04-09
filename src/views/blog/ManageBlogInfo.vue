<template>
    <div class="container mt-5">
      <h2 class="mb-4">블로그 정보 관리</h2>
  
      <div v-if="blog">
        <div class="mb-3">
          <label class="form-label">블로그 이름</label>
          <input v-model="form.blogName" type="text" class="form-control" />
        </div>
  
        <div class="mb-3">
          <label class="form-label">블로그 설명</label>
          <textarea v-model="form.blogDesc" class="form-control" rows="3" />
        </div>
  
        <div class="mb-3">
          <label class="form-label">공개 여부</label>
          <select v-model="form.blogPublic" class="form-select">
            <option :value="true">공개</option>
            <option :value="false">비공개</option>
          </select>
        </div>
  
        <div class="mb-3">
          <p><strong>생성일:</strong> {{ new Date(blog.createdAt).toLocaleString() }}</p>
          <p><strong>현재 메인 블로그 여부:</strong> {{ blog.blogMain ? "✔️" : "❌" }}</p>
        </div>
  
        <div class="d-flex gap-2">
          <button @click="updateBlog" class="btn btn-primary">수정하기</button>
          <button v-if="!blog.blogMain" @click="openModal" class="btn btn-outline-warning">
            메인 블로그 변경
          </button>
        </div>
      </div>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <h5 class="modal-title">메인 블로그로 변경할 블로그 선택</h5>
            <ul>
              <li v-for="b in myBlogs" :key="b.blogFid">
                <button @click="switchMainBlog(b.blogFid)" class="btn btn-sm btn-outline-secondary me-2">
                  {{ b.blogName }}
                </button>
              </li>
            </ul>
            <button @click="showModal = false" class="btn btn-sm btn-secondary">닫기</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '@/api';
  
  const route = useRoute();
  const blogFid = route.params.blogFid;
  
  const blog = ref(null);
  const form = ref({
    blogName: '',
    blogDesc: '',
    blogPublic: true
  });
  const showModal = ref(false);
  const myBlogs = ref([]);
  
  const fetchBlogInfo = async () => {
    const res = await api.get(`/api/blogs/${blogFid}`);
    blog.value = res.data.content;
    form.value.blogName = blog.value.blogName;
    form.value.blogDesc = blog.value.blogDesc;
    form.value.blogPublic = blog.value.blogPublic;
  };
  
  const updateBlog = async () => {
    try {
      await api.put(`/api/blogs/${blogFid}`, form.value);
      alert('블로그 정보가 수정되었습니다.');
    } catch (e) {
      alert('수정 실패');
      console.error(e);
    }
  };
  
  const openModal = async () => {
    try {
      const res = await api.get('/api/blogs/me');
      myBlogs.value = res.data.result;
      showModal.value = true;
    } catch (e) {
      alert('내 블로그 목록 조회 실패');
      console.error(e);
    }
  };
  
  const switchMainBlog = async (newBlogFid) => {
    try {
      await api.put(`/api/blogs/${newBlogFid}/main`);
      alert('메인 블로그가 변경되었습니다.');
      showModal.value = false;
      await fetchBlogInfo(); // 변경 후 새로고침
    } catch (e) {
      alert('메인 블로그 변경 실패');
      console.error(e);
    }
  };
  
  onMounted(fetchBlogInfo);
  </script>
  
  <style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
  }
  </style>
  