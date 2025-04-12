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
      <div class="sidebar-box">
            <form action="#" class="search-form">
            <div class="form-group">
                <span class="icon icon-search"></span>
                <input type="text" class="form-control" placeholder="Type a keyword and hit enter">
            </div>
            </form>
        </div>
        <blog-category></blog-category>

        <div class="sidebar-box ftco-animate">
            <h3 class="sidebar-heading">Popular Articles</h3>
            <div class="block-21 mb-4 d-flex">
            <a class="blog-img mr-4" style="background-image: url(images/image_1.jpg);"></a>
            <div class="text">
                <h3 class="heading"><a href="#">Even the all-powerful Pointing has no control</a></h3>
                <div class="meta">
                <div><a href="#"><span class="icon-calendar"></span> Oct. 04, 2018</a></div>
                <div><a href="#"><span class="icon-person"></span> Dave Lewis</a></div>
                <div><a href="#"><span class="icon-chat"></span> 19</a></div>
                </div>
            </div>
            </div>
            <div class="block-21 mb-4 d-flex">
            <a class="blog-img mr-4" style="background-image: url(images/image_2.jpg);"></a>
            <div class="text">
                <h3 class="heading"><a href="#">Even the all-powerful Pointing has no control</a></h3>
                <div class="meta">
                <div><a href="#"><span class="icon-calendar"></span> Oct. 04, 2018</a></div>
                <div><a href="#"><span class="icon-person"></span> Dave Lewis</a></div>
                <div><a href="#"><span class="icon-chat"></span> 19</a></div>
                </div>
            </div>
            </div>
            <div class="block-21 mb-4 d-flex">
            <a class="blog-img mr-4" style="background-image: url(images/image_3.jpg);"></a>
            <div class="text">
                <h3 class="heading"><a href="#">Even the all-powerful Pointing has no control</a></h3>
                <div class="meta">
                <div><a href="#"><span class="icon-calendar"></span> Oct. 04, 2018</a></div>
                <div><a href="#"><span class="icon-person"></span> Dave Lewis</a></div>
                <div><a href="#"><span class="icon-chat"></span> 19</a></div>
                </div>
            </div>
            </div>
        </div>

        <div class="sidebar-box ftco-animate">
            <h3 class="sidebar-heading">Tag Cloud</h3>
            <ul class="tagcloud">
            <a href="#" class="tag-cloud-link">animals</a>
            <a href="#" class="tag-cloud-link">human</a>
            <a href="#" class="tag-cloud-link">people</a>
            <a href="#" class="tag-cloud-link">cat</a>
            <a href="#" class="tag-cloud-link">dog</a>
            <a href="#" class="tag-cloud-link">nature</a>
            <a href="#" class="tag-cloud-link">leaves</a>
            <a href="#" class="tag-cloud-link">food</a>
            </ul>
        </div>

                    <div class="sidebar-box subs-wrap img" style="background-image: url(images/bg_1.jpg);">
                        <div class="overlay"></div>
                        <h3 class="mb-4 sidebar-heading">Newsletter</h3>
                        <p class="mb-4">Far far away, behind the word mountains, far from the countries Vokalia</p>
            <form action="#" class="subscribe-form">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Email Address">
                <input type="submit" value="Subscribe" class="mt-2 btn btn-white submit">
            </div>
            </form>
        </div>

        <div class="sidebar-box ftco-animate">
            <h3 class="sidebar-heading">Archives</h3>
            <ul class="categories">
            <li><a href="#">October 2018 <span>(10)</span></a></li>
            <li><a href="#">September 2018 <span>(6)</span></a></li>
            <li><a href="#">August 2018 <span>(8)</span></a></li>
            <li><a href="#">July 2018 <span>(2)</span></a></li>
            <li><a href="#">June 2018 <span>(7)</span></a></li>
            <li><a href="#">May 2018 <span>(5)</span></a></li>
            </ul>
        </div>


        <div class="sidebar-box ftco-animate">
            <h3 class="sidebar-heading">Paragraph</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut.</p>
        </div>
        </div>
            
  </template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BlogCategory from './BlogCategory.vue'

const route = useRoute()
const blogFid = route.params.blogFid

const isMember = ref(false)

onMounted(async () => {
  try {
    const res = await fetch(`/api/blogs/${blogFid}/members/me}`, {
      method: 'GET',
    })
    const result = await res.json()
    isMember.value = result.isMember === true
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
