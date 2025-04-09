<template>
    <div>

        <div v-if="isMember" class="mb-3">
      <router-link
        :to="`/blog/${blogFid}/write`"
        class="btn btn-primary"
      >
        글쓰기
      </router-link>
    </div>

      <!-- Search -->
      <!-- <div class="sidebar-box">
            <form action="#" class="search-form">
            <div class="form-group">
                <span class="icon icon-search"></span>
                <input type="text" class="form-control" placeholder="Type a keyword and hit enter">
            </div>
            </form>
        </div> -->
        <div class="sidebar-box ftco-animate">
            <h3 class="sidebar-heading">🌸 Manage blog </h3>
            <ul class="categories">
            <li><a href="#">블로그 통계 </a></li>
            <li><a href="#">블로그 정보 수정 </a></li>
            <li v-if="blogType === 'team'"><a href="#">블로그 멤버 관리 </a></li>
            <li><a href="#">블로그 탈퇴 </a></li>
            </ul>
        </div>

        
        </div>
            
  </template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const blogFid = route.params.blogFid

const blogType = ref('')

onMounted(async () => {
  try {
    const res = await fetch(`/api/blogs/${blogFid}/members/me}`, {
      method: 'GET',
    })
    const result = await res.json();
    blogType.value = result.blogType;
  } catch (e) {
    console.log('')
  }
})
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
