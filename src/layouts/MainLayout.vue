<template>
    <div class="container">
        <app-header />
        <main-navbar :topics="topics" />
        <div class="row">
          <div class="col-md-8">
              <slot></slot>
          </div>

          <div class="col-md-4">
              <main-sidebar />
          </div>
        </div>
    </div>
</template>

<script>
    import AppHeader from '../components/AppHeader.vue';
    import MainNavbar from '../components/MainNavbar.vue';
    import MainSidebar from '../components/MainSidebar.vue';

    import api from '@/api';


    export default {
    components: {
        AppHeader,
        MainNavbar,
        MainSidebar
    },
    data() {
    return {
      topics: []
    };
    },
    async mounted() {
      try {
        const topicResponse = await api.get('/api/topics');
        console.log("topic: ", topicResponse);
        this.topics = topicResponse.data.content.map(topic => ({
          id: topic.topicId,
          name: topic.topicName,
          link: `/index?topic-id=${topic.topicId}`
        }));
      } catch (error) {
        console.error('Failed to fetch topics:', error);
      }
    }
    };
</script>

<style scoped>
  .container {
    padding: 20px;
  }
  
  .content-area {
    margin-bottom: 20px;
  }
  
  input {
    border: 1px solid #ccc;
    padding: 10px;
  }
  
  button {
    background-color: #ffc107;
    color: white;
    border: none;
  }
  </style>
  