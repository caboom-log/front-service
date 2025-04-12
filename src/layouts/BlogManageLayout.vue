<template>

  <div class="d-flex justify-content-start px-4 py-3">
      <router-link to="/" class="btn btn-outline-secondary">
        🏠 Home
      </router-link>
      <router-link :to="`/blog/${blogFid}`" class="btn btn-outline-secondary">
        📝 블로그 홈
      </router-link>
    </div>
    
    <div>
      <section class="ftco-section">
        <div class="container-fluid">
        <div class="blog-wrapper" style="width: 80%; margin: 0 auto;">
          <div class="row">
            <div class="col-lg-9">
              <slot></slot>
            </div>
            <div class="col-lg-3 sidebar ftco-animate">
              <BlogManageSidebar />
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import BlogManageSidebar from '@/views/blog/BlogManageSidebar.vue';
  
  export default {
    components: {
      BlogManageSidebar
    },
    setup() {
      const route = useRoute();
      const blogFid = ref('');
      
      onMounted(() => {
        blogFid.value = route.params.blogFid;
        const meta = document.createElement('meta');
   meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1, shrink-to-fit=no';

  // 중복 방지
  const existing = document.querySelector('meta[name="viewport"]');
  if (!existing) {
    document.head.appendChild(meta);
  }
        // 🔹 외부 JS 파일들 로드
        const scripts = [
          'jquery.min.js',
          'jquery-migrate-3.0.1.min.js',
          'popper.min.js',
          'bootstrap.min.js',
          'jquery.easing.1.3.js',
          'jquery.waypoints.min.js',
          'jquery.stellar.min.js',
          'owl.carousel.min.js',
          'jquery.magnific-popup.min.js',
          'aos.js',
          'jquery.animateNumber.min.js',
          'bootstrap-datepicker.js',
          'jquery.timepicker.min.js',
          'scrollax.min.js',
          'main.js'
        ];
  
        scripts.forEach(file => {
          const script = document.createElement('script');
          script.src = `/js/${file}`;
          script.async = false;
          document.body.appendChild(script);
        });
  
        // 🔹 Google Fonts 동적 로딩
        const fonts = [
          'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700',
          'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700'
        ];
  
        fonts.forEach(href => {
          const link = document.createElement('link');
          link.href = href;
          link.rel = 'stylesheet';
          document.head.appendChild(link);
        });
      });
      return {
        blogFid
      };
    }
  };
  </script>
  
  

<style scoped>
@import '@/assets/elen/css/open-iconic-bootstrap.min.css';
@import '@/assets/elen/css/animate.css';
@import '@/assets/elen/css/owl.carousel.min.css';
@import '@/assets/elen/css/owl.theme.default.min.css';
@import '@/assets/elen/css/magnific-popup.css';
@import '@/assets/elen/css/aos.css';
@import '@/assets/elen/css/ionicons.min.css';
@import '@/assets/elen/css/bootstrap-datepicker.css';
@import '@/assets/elen/css/jquery.timepicker.css';
@import '@/assets/elen/css/flaticon.css';
@import '@/assets/elen/css/icomoon.css';
@import '@/assets/elen/css/style.css';
</style>
