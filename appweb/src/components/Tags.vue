<template>
    <div class="body_box_2">
      <!-- <div class="swiper-container" >
          <div class="swiper-wrapper">
              <div class="swiper-slide tag_box_2" slot="swiper-con" :key="tag.tagid" v-for="tag in tags" ><img :src="tag.taglogo"></div>
          </div>
      </div> -->
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
      <swiper-slide class=" tag_box_2" :key="tag.tagid" v-for="tag in tags" >
         <router-link :to="{name:'TagPage',params: {tagid: tag.tagid}}">
        <img :src="tag.taglogo">
         </router-link>
         <p class="word-v-middle"><span>{{ tag.tagname }}</span></p>
          <!-- <a v-on:click="getdata(recos)" > {{ recos.id }} </a> -->
      </swiper-slide>
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
          initialSlide: 0,
        // pagination: '.swiper-pagination',
        // loop: true,
        // speed: 400,
        // autoplay: 22000,
        // autoplayDisableOnInteraction: false,
          //freeMode: true,
          direction: 'horizontal',
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
    .content_2{
    min-height: 100px;
    /* padding: 15px; */
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
  }
  .body_box_2{
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 20px 20px 10px 20px;
    background-color:#FFFFFF;
  }
  .tag_box_2 img{
      text-align:center;
      display:block;
      height: 44px;
      width: 44px;
      border-radius: 5px;
      margin: auto;
      // border: 1px solid black;
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
  //   .scroll-container {
  //   background-color: #f0f0f0;
  // }
</style>


