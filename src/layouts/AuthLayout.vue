<template>
    <div class="auth-container">
    <div class="auth-content">
    <div class="text">
        <h2>{{ isSignIn ? 'Please log in ✨' : 'Join with us😎' }}</h2>
    </div>
    <div class="form-wrapper">
        <slot></slot>
    </div>
    </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute();  
      const isSignIn = computed(() => route.path === '/auth/login');
  
      return {
        isSignIn
      };
    }
  };
  </script>
  
  <style scoped>
  @import '@/assets/auth.css';
  </style>
  