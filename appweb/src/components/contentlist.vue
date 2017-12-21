<template>
  <li>
    <router-link :to="{name:'TagPage',params: {tagid: tagid}}">
        <div class="po-avt-wrap">
                <img class="po-avt data-avt" :src="logo">
        </div>
    </router-link>
    <div class="po-cmt">
        <div class="po-hd">
            <p class="po-name"><span class="data-name">{{ name }}</span></p>
            <div class="post">
                <div ref="element">
                    <a v-html="content"></a>
                    <!-- <div class='Expand'><a>Expand</a></div> -->
                </div>
                <!-- <div v-else>
                    <a v-html="content"></a>
                </div> -->
                <p>
                    <!-- <img class="list-img" :src="i.imgpath" v-for="i in imgs" :key="i.imgid" > -->
                    <img class="previewer-demo-img list-img imgs" v-for="(item, index) in imgs" :src="item.imgpath" :key="item.imgid" v-on:click="getdata(item.imgid, imgs)">
                    <!-- <div v-transfer-dom>
                        <previewer :list="list" ref="previewer" :options="options"></previewer>
                    </div> -->
                    <!-- <see-box>
                        <see-item  v-for="(item,index) in imgs" :key="index" :url="item.imgpath"></see-item>
                    </see-box> -->
                    <video style="object-fit: fill;padding: 10px 5px 0 0;display: block;float: left;max-height: 240px;max-width: 240px;" controls="controls" poster="http://47.88.192.20:8011/images/hottag/2017/1031/201710311612599899.jpg" v-for="(item,index) in videos" :key="index" :src="item.videopath">
                        Your browser does not support the video tag.
                    </video> 
                </p>
                
            </div>
            
            <p class="time">{{ time }}</p>
            <a class="ikcount">{{ total }}</a>
            <img class="c-icon" v-if="seen" v-on:click="notlikethis" src="../assets/template/images/like.png">
            <img class="c-icon" v-else v-on:click="likethis" src="../assets/template/images/likeout.png">
        </div>
    </div>
    <hr style="height: 10px;border: 1px solid #F1F1F1;background-color: #F2F2F2;"/>
  </li>
</template>
<script>
  
  export default {
    props: ['name', 'time', 'tagid', 'logo', 'content', 'imgs', 'videos', 'hotid', 'totallikes', 'iflikes'],
    name: 'likeornot',
    data () {
      return {
        seen: this.iflikes,
        total: this.totallikes
      }
    },
    computed: {
    },
    methods: {
      likethis: function () {
        this.$api.post('content/likeornot.ashx?hotid=' + this.hotid, null, r => {
          this.seen = true
          this.total++
        })
      },
      notlikethis: function () {
        this.$api.post('content/likeornot.ashx?hotid=' + this.hotid, null, r => {
          this.seen = false
          this.total--
          if (this.total < 0) { this.total = 0 }
        })
      },
      getdata (seletid, imgs) {
        // 删除所有选中标识
        for (var item in imgs) {
          delete imgs[item].seleted
        }
        // 查找选中数据
        var seleted = imgs.filter((p) => {
          return p.imgid === seletid
        })
        // 修改点击数据
        seleted[0].seleted = 'true'
        // 查找点击数据的索引值
        // var index = imgs.indexOf(seleted[0])
        console.log('seleted数据加载成功:' + JSON.stringify(imgs))
        var imgss = JSON.stringify(imgs)
        this.$bridge.callHandler('getImgPreviewData', imgss, function (data) {
        })
      }
    }
  }
</script>
<style lang="less">
    @import '../assets/template/css/app.css';
     .po-cmt {
    padding-bottom: 40px;
    }
    .imgs {
       padding-top: 5px;
    }
    .ikcount {
        float: right;
    }
    .Expand {
        height: 30px;
        vertical-align: middle;
    }
    .Expand a {
        color:#F00;
    }
</style>
