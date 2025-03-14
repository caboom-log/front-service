<template>
    <div class="container">
        <app-header />
        <blog-navbar :topics="topics" />
        <div class="content-area">
            <slot></slot>
        </div>

        <div class="col-md-4">
            <blog-sidebar />
        </div>
    </div>
</template>

<script>
    import AppHeader from '../components/AppHeader.vue';
    import BlogNavbar from '../components/BlogNavbar.vue';
    import BlogSidebar from '../components/BlogSidebar.vue';

    export default {
    components: {
        AppHeader,
        BlogNavbar,
        BlogSidebar
    },
    props: {
        topics: {
        type: Array,
        required: true,
        default: () => []
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
  