<template>
    <div class="row featurette mb-4">
      <div class="col">
        <h2 class="featurette-heading fw-normal lh-1">{{ post.title }}</h2>
        <p class="blog-post-meta">
          <span>{{ post.date }}</span> by <a :href="post.authorLink">{{ post.author }}</a>
        </p>
        <p class="blog-post-meta">
          <span 
            v-for="tag in post.tags" 
            :key="tag.label" 
            :class="tag.class" 
            class="badge me-1"
          >
            {{ tag.label }}
          </span>
        </p>
        <p class="blog-post-meta">
          <a :href="post.link">{{ post.link }}</a>
        </p>
        <p class="lead">
          <a :href="post.link" class="text-decoration-none text-reset">
            {{ post.description }}
          </a>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      post: Object
    }
  };
  </script>
  