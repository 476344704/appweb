<template>
    <div class="body_box_4">
      <!-- <div class="swiper-container" >
          <div class="swiper-wrapper">
              <div class="swiper-slide tag_box_4" slot="swiper-con" :key="tag.tagid" v-for="tag in tags" ><img :src="tag.taglogo"></div>
          </div>
      </div> -->
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
      <swiper-slide class="tag_box_4 word-v-middle">
          <router-link to="/facebookpost">
          <img src="../assets/images/menu/p_3.png">
          
          <p class="word-v-middle"><span>Poster</span></p>
          </router-link>
      </swiper-slide>
      <swiper-slide class="tag_box_4 word-v-middle">
        <router-link to="/facebookcover">
          <img src="../assets/images/menu/f_3.png">
         
           <p class="word-v-middle"><span>FB Cover</span></p>
        </router-link>
      </swiper-slide>
      <swiper-slide class="tag_box_4 word-v-middle">
           <router-link to="/instagramcover">
          <img src="../assets/images/menu/tb1.png">
          <p class="word-v-middle"><span>Instagram</span></p>
           </router-link>
      </swiper-slide>
       <swiper-slide class="tag_box_4 word-v-middle">
          <router-link to="/shopeecover">
          <img src="../assets/images/menu/s_3.png">
          <p class="word-v-middle"><span>Shopee</span></p>
          </router-link>
      </swiper-slide>
      <swiper-slide class="tag_box_4 word-v-middle">
          <router-link to="/beforeafter">
          <img src="../assets/images/menu/b_3.png">
          <p class="word-v-middle"><span>Before & After</span></p>
          </router-link>
      </swiper-slide>
      
       <swiper-slide class="tag_box_4 word-v-middle">
          <router-link to="/collage">
          <img src="../assets/images/menu/c_3.png">
           <p class="word-v-middle"><span>Collage</span></p>
          </router-link>
      </swiper-slide>
      
       <!-- <swiper-slide class=" tag_box_4">
          <img src="../assets/images/menu/r_3.png">
      </swiper-slide> -->
       
    </swiper>
</div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    props: ['tags'],
    components: {
      swiper,
      swiperSlide
    },
    name: 'tags',
    data () {
      return {
        swiperOption: {
          direction: 'horizontal',
          initialSlide: 0,
          slidesPerView: 4,
          observer: true, // 修改swiper自己或子元素时，自动初始化swiper
          observeParents: true// 修改swiper的父元素时，自动初始化swiper
        }
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>
<style lang="less">
  .body_box_4{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 10px 0 10px 10px;
    background-color:#FFFFFF;
  }
  .tag_box_4 img{
      margin: auto;
      text-align:center;
      display:block;
      height: 44px;
      width: 44px;
  }
  .word-v-middle{
margin-bottom: 0;
font-size: 12px;
display: flex;
align-items: center;
justify-content: center;
margin-top: 5px;
color: #444444;
white-space: normal;
}
.word-v-middle span{
text-align: left;
font-size: 13px;
text-overflow: -o-ellipsis-lastline;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
}
</style>


