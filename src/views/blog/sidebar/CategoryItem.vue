<template>
    <li>
      <a href="#">
        {{ category.categoryName }}
        <span v-if="category.children && category.children.length">
          ({{ category.children.length }})
        </span>
      </a>
  
      <ul v-if="category.children && category.children.length" class="ms-3">
        <SidebarCategoryItem
          v-for="child in category.children"
          :key="child.categoryId"
          :category="child"
        />
      </ul>
    </li>
  </template>
  
  <script setup>
  defineProps({
    category: {
      type: Object,
      required: true
    }
  });
  </script>
  
  <style scoped>
  ul.categories {
    list-style: none;
    padding-left: 0;
  }
  
  ul.categories li {
    margin-bottom: 5px;
  }
  
  ul.categories li ul {
    margin-top: 5px;
    padding-left: 20px;
  }
  </style>
  