<template>
  <div class="sidebar-box ftco-animate">
    <h3 class="sidebar-heading">Categories</h3>
    <ul class="categories">
      <CategoryItem
        v-for="category in categories"
        :key="category.categoryId"
        :category="category"
      />
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '@/api';
import CategoryItem from './CategoryItem.vue';

const categories = ref([]);

onMounted(async () => {
  try {
    const blogFid = window.location.pathname.split('/')[2];
    const res = await api.get(`/api/blogs/${blogFid}/categories/public`);
    categories.value = res.data.content;
  } catch (e) {
    console.error('카테고리 목록을 불러오지 못했습니다.', e);
  }
});
</script>
