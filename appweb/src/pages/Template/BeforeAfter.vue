<template>
<pull-to
    :top-load-method="refresh"
    @top-state-change="stateChange"
    :bottom-load-method="loadmore"
    @bottom-state-change="stateChange">
    <!-- vue 2.5 use slot-scope -->
    <template slot="top-block" slot-scope="props">
      <div class="top-load-wrapper">
        <svg class="icon"
             :class="{
                'icon-arrow': props.state === 'trigger',
                'icon-loading': props.state === 'loading'
             }"
             aria-hidden="true">
          <use :xlink:href="iconLink"></use>
        </svg>
        {{ props.stateText }}
    </div>
    </template>
     <template slot="bottom-block" slot-scope="props">
      <div class="bottom-load-wrapper">
        <svg class="icon"
             :class="{
                'icon-arrow': props.state === 'trigger',
                'icon-loading': props.state === 'loading'
             }"
             aria-hidden="true">
          <use :xlink:href="iconLink"></use>
        </svg>
        {{ props.stateText }}
      </div>
    </template>
    <header class="header-box" >
        <div class="back" alt="home">
          <router-link to="/recommend">
            <img src="../../assets/images/ic_tab_home_normal.png">
          </router-link>
        </div>
      <div class="title">Before & After</div>
    </header>
    <div class="container">
      <div class="waterfall">
        <div v-for="temp in templates" :key="temp.index" class="item">
          <a v-on:click="getdata(temp)"><img :src="temp.thumbnailsrc" :alt="temp.pname" /></a>
        </div>
      </div>
    </div>
</pull-to>
</template>

<style>
@import '../../assets/css/template.css';

.template {
    height: 100%;
    padding: 10px 0 0;
    position: relative;
}
.back{
  width: 10%;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  z-index: 999;
}
.back img {
  text-align:center;
      display:block;
      height: 30px;
      width: 30px;
}
.title {
  width: 90%;
  text-align: center;
 -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
          display: flex;
          position: relative;
          font-size: 18px;
          font-weight: bold;
          font-family: Arial, Helvetica, sans-serif;
}
.header-box {
  display: flex;
  padding: 10px 10px 10px 10px;
  background: #FFFFFF;
  height: 30px;
}
.is-fixed ~ .page-content{
padding-top:44px;
padding-bottom: 10px;
}
  .top-load-wrapper {
    line-height: 50px;
    text-align: center;
  }
  .bottom-load-wrapper {
    line-height: 50px;
    text-align: center;
  }
  .icon-arrow {
    transition: .2s;
    transform: rotate(180deg);
  }
  .icon-loading {
    transform: rotate(0deg);
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes loading
  {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
  } 



/*大层*/
.container{width:100%;margin: 0 auto;}
/*瀑布流层*/
.waterfall{
-moz-column-count:2; /* Firefox */
-webkit-column-count:2; /* Safari 和 Chrome */
column-count:2; /* 用整数值来定义列数。不允许负值 */
-moz-column-gap: 1em;
-webkit-column-gap: 1em;
column-gap: 0em; /*用长度值来定义列与列之间的间隙。不允许负值*/
}
/*一个内容层*/
.item{
padding: 5px 5px 0 5px;
break-inside: avoid;
border: 1px solid #F0F0F0;
}
.item img{
width: 100%;
}

</style>
<script>
import PullTo from 'vue-pull-to'
export default {
  name: 'template',
  components: {
    PullTo
  },
  data () {
    return {
      templates: [],
      NewList: [],
      iconLink: ''
    }
  },
  created () {
    this.getTemps()
  },
  mounted () {
  },
  methods: {
    getTemps () {
      this.getPage = 1
      this.$api.get('poster/iosPosters.ashx?type=5&page=' + this.getPage, null, r => {
        let tempsvar = r.data
        let templist = []
        for (var i in tempsvar) {
          templist.push(tempsvar[i])
        }
        this.templates = templist
      })
    },
    loadmore (loaded) {
      setTimeout(() => {
        this.getPage++
        this.$api.get('poster/iosPosters.ashx?type=5&page=' + this.getPage, null, r => {
          let data = r.data
          let list = []
          for (var i in data) {
            list.push(data[i])
          }
          this.NewList = list
          if (list.length === 0) {
            this.getPage--
            console.log(list.length)
          }
          this.templates = this.templates.concat(this.NewList)
        })
        loaded('done')
      }, 2000)
    },
    refresh (loaded) {
      setTimeout(() => {
        this.getTemps()
        loaded('done')
      }, 1000)
    },
    stateChange (state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = '#icon-arrow-bottom'
      } else if (state === 'loading') {
        this.iconLink = '#icon-loading'
      } else if (state === 'loaded-done') {
        this.iconLink = '#icon-finish'
      }
    },
    getdata (temp) {
      var params = JSON.stringify(temp)
    // js 调用 android/ios 获取用户信息
      this.$bridge.callHandler('getPosterPreviewData', params, function (data) {
      })
    }
  }

}
</script>
