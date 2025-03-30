<template>
  <component 
    :is="layout"
    :key="$route.fullPath"
  >
    <router-view />
  </component>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import BlogLayout from '@/layouts/BlogLayout.vue';

export default {
  components: {
    MainLayout,
    AuthLayout,
    BlogLayout
  },
  setup() {
    const route = useRoute();

    const layout = computed(() => {
      const layoutName = route.meta.layout;
      if (layoutName === 'AuthLayout') return 'AuthLayout';
      if (layoutName === 'BlogLayout') return 'BlogLayout';
      return 'MainLayout';
    });

    return {
      layout
    };
  }
};
</script>