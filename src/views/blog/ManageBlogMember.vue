<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3>멤버 관리</h3>
      <button class="btn btn-outline-primary" @click="showInviteModal = true">멤버 초대</button>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>닉네임</th>
          <th>권한</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members" :key="member.mbUuid">
          <td>
            <router-link :to="`/blog/${member.mainBlogFid}`">
              {{ member.mbNickname }}
            </router-link>
          </td>
          <td>{{ member.role || '멤버' }}</td>
          <td>
            <button
              v-if="member.mbUuid !== myUuid"
              class="btn btn-sm btn-outline-warning"
              @click="delegateOwner(member.mbUuid)"
            >
              소유자 위임
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="d-flex justify-content-center mt-4">
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 0 }">
            <button class="page-link" @click="goToPage(currentPage - 1)">이전</button>
          </li>
          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page - 1 }"
          >
            <button class="page-link" @click="goToPage(page - 1)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
            <button class="page-link" @click="goToPage(currentPage + 1)">다음</button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Invite Modal -->
    <div v-if="showInviteModal" class="modal-backdrop">
      <div class="modal-dialog-centered modal-content p-4">
        <h5 class="mb-3">이메일로 멤버 초대</h5>
        <input
          v-model="inviteEmail"
          class="form-control mb-3"
          type="email"
          placeholder="초대할 회원의 이메일 주소를 입력하세요."
        />
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary me-2" @click="showInviteModal = false">취소</button>
          <button class="btn btn-primary" @click="inviteMember">초대</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/api';
import { useAuthStore } from '@/store/auth';

const route = useRoute();
const blogFid = route.params.blogFid;
const authStore = useAuthStore();

const members = ref([]);
const currentPage = ref(0);
const totalPages = ref(0);
const myUuid = ref(authStore.user?.mbUuid);

const showInviteModal = ref(false);
const inviteEmail = ref('');

const fetchMembers = async (page = 0) => {
  try {
    const res = await api.get(`/api/blogs/${blogFid}/members?page=${page}`);
    members.value = res.data.body.members;
    totalPages.value = res.data.body.totalPages;
    currentPage.value = res.data.body.currentPage;
  } catch (err) {
    console.error('멤버 조회 실패:', err);
  }
};

const goToPage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    fetchMembers(page);
  }
};

const inviteMember = async () => {
  try {
    await api.post(`/api/blogs/${blogFid}/members`, {
      mbEmail: inviteEmail.value,
    });
    alert('초대가 완료되었습니다.');
    showInviteModal.value = false;
    inviteEmail.value = '';
    fetchMembers(currentPage.value);
  } catch (err) {
    alert('초대에 실패했습니다.');
    console.error(err);
  }
};

const delegateOwner = async (mbUuid) => {
  try {
    await api.put(`/api/blogs/${blogFid}/transfer-ownership`, { mbUuid });
    alert('소유자가 변경되었습니다.');
    fetchMembers(currentPage.value);
  } catch (err) {
    alert('소유자 변경에 실패했습니다.');
    console.error(err);
  }
};

onMounted(() => {
  fetchMembers();
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  width: 400px;
  border-radius: 8px;
}
</style>
