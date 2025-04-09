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
            <h2 class="subheading">Welcome to</h2>
            <h1 class="mb-4">{{ blogInfo.blogName }}</h1>
            <p class="mb-4">{{ blogInfo.blogDesc }}</p>
                    <p><a href="#" class="btn-custom">Explore the Blog <span class="ion-ios-arrow-down"></span></a></p>
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
  import authorImage from '@/assets/blog_default.png';
  
  const route = useRoute();
  const blogFid = route.params.blogFid;
  const blogInfo = ref({ blogName: '', blogDesc: '', blogMainImg: '' })
  
  const bgImageUrl = ref(defaultBg);
  
  onMounted(async () => {

    try {
      const blogInfoResponse = (await api.get(`/api/blogs/${blogFid}`));
      console.log('블', blogInfoResponse);
      blogInfo.value = blogInfoResponse.data.content;
    } catch(e) {
      console.warn('블로그 정보 가져오기 실패');
    }

    try {
      const blogMainImg = await api.get(`/api/blogs/${blogFid}/main-img`, {
        responseType: 'blob',
      });
  
      const imageBlob = blogMainImg.data;
      bgImageUrl.value = URL.createObjectURL(imageBlob);
    } catch (e) {
      console.log('블로그 메인 이미지 가져오기 실패, 기본 이미지 사용:', e);
    }
  
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