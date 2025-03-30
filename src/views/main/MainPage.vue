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
  
    <div class="mb-5">
    <form @submit.prevent="search">
        <label for="searchKeywordList" class="form-label">
            <h2>블로그 검색</h2>
        </label>
        <div class="input-group">
        <input 
            class="form-control border-info-subtle" 
            list="datalistOptions" 
            id="searchKeywordList" 
            v-model="keyword"
            placeholder="블로그 이름으로 검색"
        />
        <button class="btn btn-warning btn-lg" type="submit">
            검색
        </button>
        </div>
    </form>
    </div>
  
    <div class="row">
        <div class="col-md-8">
            <blog-post 
            v-for="post in filteredPosts" 
            :key="post.id" 
            :post="post" 
            />
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
          const response = await api.get('/api/blogs/posts?offset=1&size=5&sort=createdAt,desc');
          this.posts = response.data.contents.map(post => ({
            id: post.id,
            title: post.title,
            date: post.date,
            author: post.author,
            link: `/blog/${post.author}?post-id=${post.id}`,
            description: post.description,
            tags: post.tags
          }));
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
  