<template>
<div>
    <div v-for="temp in temps" :key="temp.index" class="recoslist">
        <a>{{ temp.title }}</a>
        <div class="body_box_5">
            <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
                <swiper-slide class="tag_box_5"  v-for="recos in temp.recommemds" :key="recos.index" >
                  <img :src="recos.thumbnailsrc" v-on:click="getdata(recos)">
                </swiper-slide>
            </swiper>
        </div>
    </div>
</div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: ['temps'],
  data () {
    return {
      swiperOption: {
        // initialSlide: 0,
        // pagination: '.swiper-pagination',
        // loop: true,
        // speed: 400,
        // autoplay: 22000,
        // autoplayDisableOnInteraction: false,
        autoplayDisableOnInteraction: false,
        freeMode: true,
        slidesPerView: 2.2,
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
    getdata (temp) {
      var params = JSON.stringify(temp)
      // console.log(params)
      // js 调用 android/ios 获取信息
      this.$bridge.callHandler('getPosterPreviewData', params, function (data) {
      })
    }
  }
}
</script>

<style lang="less">
@import '../assets/template/css/app.css';
.scroll-container{
  height: 100%;
}
  .body_box_5{
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 10px 15px 10px 15px;
    background-color:#FFFFFF;
  }
  .tag_box_5 img{
      text-align:center;
      display:block;
      width: 140px;
      border-radius: 5px;
      border:1px solid #FFFFFF;
      box-shadow:0px 0px  1px 1px #FFFFFF;
      /* box-shadow:20px 0px 30px 10px #abcdef  inset; */
  }
  .recoslist {
      background-color: #FFFFFF;
  }
  .recoslist a {
      line-height: 40px;
      padding-left: 10px;
      font-size: 16px;
      font-weight: bold;
  }
  
</style>