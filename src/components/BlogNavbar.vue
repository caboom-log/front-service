<template>
    <div class="nav-scroller py-1 mb-3 border-bottom">
      <nav class="nav nav-underline justify-content-between">
        <a 
          v-for="topic in topics" 
          :key="topic.id" 
          class="nav-item nav-link link-body-emphasis" 
          :href="topic.link"
        >
          {{ topic.name }}
        </a>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      'topics': {
        type: Array,
        required: true
      }
    }
  };
  </script>
  