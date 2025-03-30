<template>
    <div
  class="hero-wrap js-fullheight"
  :style="{
    backgroundImage: `url(${bgImageUrl})`,
    height: '100vh',
    backgroundPosition: '50% 50px',
    dataStellarBackgroundRatio: '0.5'
  }"
  data-stellar-background-ratio="0.5"
>

      <div class="overlay"></div>
      <div class="js-fullheight d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div class="col-md-8 text text-center">
          <div class="img mb-4" :style="{ backgroundImage: `url(${authorImage})` }"></div>
          <div class="desc">
            <h2 class="subheading">Hello I'm</h2>
            <h1 class="mb-4">Elen Henderson</h1>
            <p class="mb-4">I am A Blogger Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                    <p><a href="#" class="btn-custom">More About Me <span class="ion-ios-arrow-forward"></span></a></p>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '@/api';
  
  import defaultBg from '@/assets/elen/images/bg_1.jpg';
  import authorImage from '@/assets/elen/images/author.jpg';
  
  const route = useRoute();
  const blogFid = route.params.blogFid;
  
  const bgImageUrl = ref(defaultBg);
  
  onMounted(async () => {
    // 🎯 블로그 이미지 불러오기
    try {
      const response = await api.get(`/api/blog/${blogFid}/main-img`, {
        responseType: 'blob',
      });
  
      const imageBlob = response.data;
      bgImageUrl.value = URL.createObjectURL(imageBlob);
    } catch (e) {
      console.warn('블로그 메인 이미지 가져오기 실패, 기본 이미지 사용:', e);
    }
  
    // 🧩 외부 JS 동적 로딩
    const jsFiles = [
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
      'google-map.js',
      'main.js'
    ];
  
    jsFiles.forEach(file => {
      const script = document.createElement('script');
      script.src = `/assets/elen/js/${file}`;
      script.async = false;
      document.body.appendChild(script);
    });
  
    
  });
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