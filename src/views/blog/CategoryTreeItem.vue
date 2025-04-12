<template>
    <ul class="list-group">
    <li class="list-group-item">
      <div class="d-flex justify-content-between align-items-center">
        <div>
            📂 <strong>{{ category.categoryName }}</strong>
          <small class="text-muted ms-2">[{{ formatTopic(category.topic) }}]</small>
  
          <span
            class="badge bg-secondary ms-2"
            role="button"
            @mouseenter="$emit('hover-in', category.categoryId)"
            @mouseleave="$emit('hover-out')"
            @click="$emit('toggle', category)"
          >
            {{
              isHovered
                ? category.categoryPublic
                  ? 'CHANGE TO PRIVATE'
                  : 'CHANGE TO PUBLIC'
                : category.categoryPublic
                  ? 'PUBLIC'
                  : 'PRIVATE'
            }}
          </span>
        </div>
  
        <div class="d-flex gap-2">
          <button
            class="btn btn-sm btn-outline-success"
            @click="$emit('open', category.categoryId)"
          >
            하위 카테고리 추가
          </button>
          <button
            class="btn btn-sm btn-outline-warning"
            @click="$emit('update', category)"
          >
            관리
          </button>
        </div>
      </div>
  
      <!-- 하위 카테고리 재귀 -->
      <ul
        v-if="category.children && category.children.length"
        class="mt-2 ms-4 list-group"
      >
        <CategoryTreeItem
          v-for="child in category.children"
          :key="child.categoryId"
          :category="child"
          :hoveredCategoryId="hoveredCategoryId"
          :prefix="'└'.repeat(child.depth - 1)"
          @toggle="$emit('toggle', $event)"
          @open="$emit('open', $event)"
          @hover-in="$emit('hover-in', $event)"
          @hover-out="$emit('hover-out')"
        />
      </ul>
    </li>
    </ul>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import CategoryTreeItem from './CategoryTreeItem.vue';
  
  const props = defineProps({
    category: Object,
    hoveredCategoryId: Number,
    prefix: {
      type: String,
      default: '└'
    }
  });
  
  const isHovered = computed(() => props.hoveredCategoryId === props.category.categoryId);
  
  const formatTopic = (topic) => {
    return topic?.rootName && topic?.subName
      ? `${topic.rootName} / ${topic.subName}`
      : topic?.topicName || '-';
  };
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
    