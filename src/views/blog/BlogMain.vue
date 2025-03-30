<template>
  <div class="row">
    <div class="col-lg-10">
      <div class="row">
        <div
          v-for="post in posts"
          :key="post.id"
          class="col-md-12"
        >
          <div class="blog-entry ftco-animate">
            <a
              href="#"
              class="img"
              :style="{ backgroundImage: `url(${post.thumbnail})` }"
            ></a>
            <div class="text pt-2 mt-3">
              <span class="category mb-1 d-block"><a class="custom" href="#"></a></span>
              <h3 class="mb-4">
                <a href="#" class="post-title">{{ post.title }}</a>
              </h3>
              <p class="mb-4 custom">{{ post.summary }}</p>
              <div class="author mb-4 d-flex align-items-center">
                <a
                  href="#"
                  class="img"
                  :style="{ backgroundImage: `url(${post.authorImg})` }"
                ></a>
                <div class="ml-3 info">
                  <span>Written by</span>
                  <h3>
                    <a href="#">{{ post.author }}</a>,
                    <span>{{ post.date }}</span>
                  </h3>
                </div>
              </div>
              <div class="meta-wrap d-md-flex align-items-center">
                <div class="half order-md-last text-md-right">
                  <p class="meta">
                    <span><i class="icon-heart"></i>{{ post.likes }}</span>
                    <span><i class="icon-eye"></i>{{ post.views }}</span>
                    <span><i class="icon-comment"></i>{{ post.comments }}</span>
                  </p>
                </div>
                <div class="half">
                  <p>
                    <a href="#" class="btn btn-primary p-3 px-xl-4 py-xl-3">Continue Reading</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="row mt-5">
        <div class="col">
          <div class="block-27">
            <ul>
              <li><a href="#">&lt;</a></li>
              <li class="active"><span>1</span></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
              <li><a href="#">&gt;</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/api';

const route = useRoute();
const blogFid = route.params.blogFid;
const posts = ref([]);

const defaultThumbnail = new URL('@/assets/elen/images/image_5.jpg', import.meta.url).href;
const defaultAuthorImg = new URL('@/assets/elen/images/image_2.jpg', import.meta.url).href;
onMounted(async () => {
  const dummyPosts = [
    { id: 1, title: 'The Newest Technology!!', summary: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.', author: 'Dave Lewis', date: 'Nov 28, 2018', likes: 3, views: 100, comments: 5 },
    { id: 2, title: 'Vue 3 Composition API', summary: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of ...', author: 'Insub Yoon', date: 'Mar 30, 2025', likes: 12, views: 251, comments: 7 },
    { id: 3, title: 'Redis + Spring Boot', summary: 'How to use Redis...', author: 'Alice Kim', date: 'Feb 12, 2025', likes: 5, views: 89, comments: 2 },
  ];

  posts.value = dummyPosts.map(p => ({
    ...p,
    thumbnail: defaultThumbnail,
    authorImg: defaultAuthorImg
  }));
  console.log('posts:', posts.value);


  for (const post of posts.value) {
    try {
      const res = await api.get(`/api/blog/${blogFid}/posts/${post.id}/thumbnails`, {
        responseType: 'blob'
      });
      const blobUrl = URL.createObjectURL(res.data);
      post.thumbnail = blobUrl;
    } catch (e) {
      console.warn(`Post ${post.id} 썸네일 불러오기 실패`, e);
    }
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


a.custom {
  color: #F05D23;
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 16px;
  text-decoration: none;
}
a.custom:hover {
  text-decoration: underline;
}
p.custom {
  color: #999999;
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 24px;
  margin: 0 0 24px 0;
}
a.post-title {
  color: #000000CC;
  font-family: 'Poppins', Arial, sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 16px 0;
  text-decoration: none;
}
a.post-title:hover {
  text-decoration: underline;
}

</style>