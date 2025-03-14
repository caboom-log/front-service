<template>
  <component 
    :is="layout"
    :key="$route.path"
    v-bind="layoutProps"
  >
    <router-view />
  </component>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import BlogLayout from '@/layouts/BlogLayout.vue';
import api from '@/api';

export default {
  components: {
    MainLayout,
    AuthLayout,
    BlogLayout
  },
  setup() {
    const route = useRoute();

    const topics = ref([]);
    const layout = computed(() => {
      if (route.meta.layout === 'AuthLayout') return 'AuthLayout';
      else if (route.meta.layout === 'BlogLayout') return 'BlogLayout';
      else return 'MainLayout';
    });

    const layoutProps = computed(() => ({
      topics: topics.value
    }));

    onMounted(async () => {
      try {
        const topicResponse = await api.get('/api/topics');
        topics.value = topicResponse.data.contents.map(topic => ({
          id: topic['topic-id'],
          name: topic['topic-name'],
          link: `/index?topic-id=${topic['topic-id']}`
        }));
      } catch (error) {
        console.error('Failed to fetch topics:', error);
      }
    });

    return {
      layout,
      layoutProps,
    };
  }
};
</script>
