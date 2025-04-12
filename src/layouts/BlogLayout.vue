<template>
    
    <div>
      <BlogHero />

      <section class="ftco-section" id="blog-section">

        <div class="container-fluid">
        <div class="blog-wrapper" style="width: 80%; margin: 0 auto;">
          <div class="row">
            <div class="col-lg-9">
              <slot></slot>
            </div>
            <div class="col-lg-3 sidebar ftco-animate">
              <BlogSidebar />
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import BlogHero from '@/views/blog/BlogHero.vue';
  import BlogSidebar from '@/views/blog/sidebar/BlogSidebar.vue';
  
  export default {
    components: {
      BlogHero,
      BlogSidebar
    },
    setup() {
      onMounted(() => {
        const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1, shrink-to-fit=no';

  const existing = document.querySelector('meta[name="viewport"]');
  if (!existing) {
    document.head.appendChild(meta);
  }
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
