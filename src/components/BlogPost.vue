<template>
  <div class="row featurette my-5 border-bottom pb-4">
    <div class="col-md-4" v-if="post.thumbnail">
      <img :src="post.thumbnail" class="img-fluid rounded" alt="thumbnail" />
    </div>
    <div :class="post.thumbnail ? 'col-md-8' : 'col-md-12'">
      <h2 class="featurette-heading fw-bold mb-2">
        <a 
          class="text-dark text-decoration-none hover-underline" 
          @click="goToPost"
        >
          {{ post.title }}
        </a>
      </h2>

      <div class="post-meta text-muted mb-3">
        <span>✍️ {{ post.writer?.mbNickname }}</span> |
        <span>📅 {{ post.createdAt }}</span> |
        <span><i class="icon-heart"></i> {{ post.likes || 0 }}</span> |
        <span><i class="icon-eye"></i>  {{ post.viewCount || 0 }}</span> |
        <span><i class="icon-comment"></i>{{ post.comments || 0 }}</span>
      </div>

      <p class="mb-2">
        <span 
          v-for="(category, idx) in post.categoryNames" 
          :key="idx" 
          class="badge bg-secondary me-1"
        >
          {{ category }}
        </span>
      </p>

      <p class="lead text-muted">
        {{ post.summary }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  post: Object
});

const router = useRouter();

const goToPost = () => {
  router.push(`/blog/${props.post.blogFid}/post/${props.post.postId}`);
};
</script>

<style scoped>
.hover-underline:hover {
  text-decoration: underline !important;
  color: #0d6efd !important; 
}
</style>
