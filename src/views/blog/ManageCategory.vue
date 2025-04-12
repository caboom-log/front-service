<template>
  <div class="container mt-5">
    <h2 class="mb-4">카테고리 관리</h2>

    <div class="mb-3">
      <button class="btn btn-primary" @click="openModal()">+ 카테고리 등록</button>
    </div>

    <CategoryTreeItem
      v-for="category in categories"
      :key="category.categoryId"
      :category="category"
      :hoveredCategoryId="hoveredCategoryId"
      @toggle="toggleCategoryPublic"
      @open="openModal"
      @manage="openManageModal"
      @hover-in="hoveredCategoryId = $event"
      @hover-out="hoveredCategoryId = null"
      @update="openManageModal"
    />

    <div v-if="showModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h5 class="modal-title">카테고리 등록</h5>

          <div class="mb-3">
            <label class="form-label">카테고리 이름</label>
            <input v-model="form.categoryName" type="text" class="form-control" />
          </div>

          <div class="mb-3">
            <label class="form-label">주제</label>
            <select v-model="selectedRootTopicId" class="form-select">
              <option disabled value="">주제 선택</option>
              <option v-for="topic in topics" :key="topic.topicId" :value="topic.topicId">
                {{ topic.topicName }}
              </option>
            </select>
          </div>

          <div class="mb-3" v-if="subTopics.length > 0">
            <label class="form-label">하위 주제</label>
            <select v-model="form.topicId" class="form-select">
              <option disabled value="">하위 주제 선택</option>
              <option v-for="sub in subTopics" :key="sub.topicId" :value="sub.topicId">
                {{ sub.topicName }}
              </option>
            </select>
          </div>

          <div class="mb-3 form-check">
            <input v-model="form.categoryPublic" type="checkbox" class="form-check-input" id="publicCheck" />
            <label class="form-check-label" for="publicCheck">공개</label>
          </div>

          <div class="d-flex justify-content-end">
            <button class="btn btn-secondary me-2" @click="closeModal">취소</button>
            <button class="btn btn-primary" @click="submitCategory" :disabled="!form.topicId">등록</button>
          </div>
        </div>
      </div>
    </div>

<div v-if="showManageModal" class="modal-mask">
  <div class="modal-wrapper">
    <div class="modal-container">
      <h5 class="modal-title">카테고리 관리</h5>

      <div class="mb-3">
        <label class="form-label">카테고리 이름</label>
        <input v-model="selectedCategoryForEdit.categoryName" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">주제</label>
        <select v-model="selectedEditRootTopicId" class="form-select">
          <option disabled value="">주제 선택</option>
          <option
            v-for="topic in topics"
            :key="topic.topicId"
            :value="topic.topicId"
          >
            {{ topic.topicName }}
          </option>
        </select>
      </div>

      <div class="mb-3" v-if="editSubTopics.length > 0">
        <label class="form-label">하위 주제</label>
        <select v-model="selectedCategoryForEdit.topicId" class="form-select">
          <option disabled value="">하위 주제 선택</option>
          <option
            v-for="sub in editSubTopics"
            :key="sub.topicId"
            :value="sub.topicId"
          >
            {{ sub.topicName }}
          </option>
        </select>
      </div>

      <div class="mb-3 form-check">
        <input
          v-model="selectedCategoryForEdit.categoryPublic"
          type="checkbox"
          class="form-check-input"
          id="editPublicCheck"
        />
        <label class="form-check-label" for="editPublicCheck">공개</label>
      </div>

      <div class="d-flex justify-content-end">
        <button class="btn btn-secondary me-2" @click="closeManageModal">취소</button>
        <button class="btn btn-primary" @click="updateCategory">수정</button>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/api';
import CategoryTreeItem from './CategoryTreeItem.vue';

const route = useRoute();
const blogFid = route.params.blogFid;

const categories = ref([]);
const topics = ref([]);
const subTopics = ref([]);
const hoveredCategoryId = ref(null);

const showModal = ref(false);
const parentId = ref(null);

const form = ref({
  categoryName: '',
  topicId: null,
  categoryPublic: true,
});

const selectedRootTopicId = ref('');
watch(selectedRootTopicId, (newId) => {
  const root = topics.value.find(t => t.topicId === newId);
  subTopics.value = root ? root.subTopics : [];
  form.value.topicId = '';
});

const showManageModal = ref(false);
const selectedCategoryForEdit = ref(null);
const selectedEditRootTopicId = ref('');
const editSubTopics = ref([]);


watch(selectedEditRootTopicId, (newId) => {
  const root = topics.value.find(t => t.topicId === newId);
  editSubTopics.value = root ? root.subTopics : [];
  selectedCategoryForEdit.value.topicId = '';
});

const openManageModal = (category) => {
  selectedCategoryForEdit.value = { ...category };
  let rootTopic = null;
  for (const t of topics.value) {
    if (t.subTopics && t.subTopics.some(sub => sub.topicId === category.topicId)) {
      rootTopic = t;
      break;
    }
  }

  selectedEditRootTopicId.value = rootTopic?.topicId || '';
  editSubTopics.value = rootTopic?.subTopics || [];
  showManageModal.value = true;
};


const closeManageModal = () => {
  showManageModal.value = false;
  selectedCategoryForEdit.value = null;
};

const updateCategory = async () => {
  try {
    await api.put(`/api/blogs/${blogFid}/categories/${selectedCategoryForEdit.value.categoryId}`, {
      categoryName: selectedCategoryForEdit.value.categoryName,
      categoryPublic: selectedCategoryForEdit.value.categoryPublic,
      topicId: selectedCategoryForEdit.value.topicId,
    });
    alert('카테고리가 수정되었습니다!');
    closeManageModal();
    await fetchCategories();
  } catch (e) {
    console.error(e);
    alert('수정 실패');
  }
};

const openModal = (pid = null) => {
  parentId.value = pid;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.value = {
    categoryName: '',
    topicId: null,
    categoryPublic: true,
  };
};

const submitCategory = async () => {
  try {
    await api.post(`/api/blogs/${blogFid}/categories`, {
      categoryName: form.value.categoryName,
      topicId: form.value.topicId,
      categoryPublic: form.value.categoryPublic,
      categoryPid: parentId.value,
    });
    alert('카테고리가 등록되었습니다!');
    closeModal();
    await fetchCategories();
  } catch (e) {
    if (e.response?.data?.code === 400) {
      alert(e.response.data.message);
    } else {
      alert('등록 실패');
    }
  }
};

const toggleCategoryPublic = async (category) => {
  const newStatus = !category.categoryPublic;
  try {
    await api.post(`/api/blogs/${blogFid}/categories/${category.categoryId}/public`, {
      categoryPublic: newStatus,
    });
    category.categoryPublic = newStatus;
    await fetchCategories();
  } catch (e) {
    console.error(e);
    alert('공개 여부 변경 실패');
  }
};

const fetchCategories = async () => {
  const res = await api.get(`/api/blogs/${blogFid}/categories`);
  categories.value = res.data.content;
};

const fetchTopics = async () => {
  const res = await api.get('/api/topics');
  topics.value = res.data.content;
};

onMounted(() => {
  fetchTopics();
  fetchCategories();
});
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-wrapper {
  width: 100%;
  max-width: 400px;
}
.modal-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
