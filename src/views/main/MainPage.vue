<template>
    <div class="main-page">
      
    <div class="p-4 p-md-5 mb-4 rounded text-body-emphasis" style="background-color: #ffc107;">
        <div class="col-lg-6 px-0">
            <h1 class="display-5 fst-italic">Welcome to Caboom-log!</h1>
            <p class="lead my-3">🏍️🔥 🏍️🔥 🏍️🔥</p>
            <p class="lead mb-0">
                <router-link to="/member/signup" class="text-body-emphasis">
                회원가입
                </router-link>
            </p>
        </div>
    </div>
  
    <div class="container mt-5">
    <div class="row">
      <div class="col-md-10">
        <BlogPost
          v-for="post in posts"
          :key="post.postId"
          :post="post"
        />
      </div>
    </div>
  </div>
</div>
  </template>
  
  <script>
  import BlogPost from '@/components/BlogPost.vue';
  import api from '@/api';
  
  export default {
    components: {
      BlogPost
    },
    data() {
      return {
        keyword: '',
        posts: []
      };
    },
    computed: {
      filteredPosts() {
        if (!this.keyword) {
          return this.posts;
        }
        return this.posts.filter(post => 
          post.title.toLowerCase().includes(this.keyword.toLowerCase()) ||
          post.author.toLowerCase().includes(this.keyword.toLowerCase())
        );
      }
    },
    methods: {
      async fetchPosts() {
        try {
          const response = await api.get('/api/posts/public');
          this.posts = response.data.content.posts;
        } catch (error) {
          console.error('Failed to fetch posts:', error);
          this.posts=[];
        }
      },
      search() {
        console.log(`Searching for keyword: ${this.keyword}`);
      }
    },
    mounted() {
      this.fetchPosts();
    }
  };
  </script>
  
  <style scoped>
  .main-page {
    padding: 20px;
  }
  
  .input-group {
    display: flex;
    gap: 10px;
  }
  
  input {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
  }
  
  button {
    background-color: #ffc107;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #ffb300;
  }
  
  .row {
    margin-top: 20px;
  }
  </style>
