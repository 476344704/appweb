<template>
  <pull-to
    :bottom-load-method="loadmore"
    @bottom-state-change="stateChange">
    <!-- vue 2.5 use slot-scope -->
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
    <header class="search-box">
     
    
    <input type="search" v-model="search" placeholder="Search for a template"/>
    <!-- <a class="sbutton" value="Search" @click="getSearch(search)">Search</a> -->
    <!-- <a class="sbutton" value="Cancel">Cancel</a> -->
     <router-link class="sbutton" to="/recommend">Cancel</router-link>
  </header>
  <div class="grid">
    <div class="grid__item" v-for="temp in listt0" :key="temp.index">
        <a class="" v-on:click="getdata(temp)"><img class="grid__img" :src="temp.thumbnailsrc" :alt="temp.pname" /></a>
    </div>
  </div>
  </pull-to>
</template>


<style>
  @import '../../assets/css/template.css';

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
.tags{
  height: 100px;
  width: 100%;
    background-color: #FFFFFF;
}
.sbutton{
  -webkit-appearance: none;
  position: relative;
  border: 0;
  border-color: #ffffff;
  font-size: 14px;
  vertical-align: middle;
  text-align: center;
}
.search{
    margin:0 auto;
    height: 80px;
    background-color: #FFFFFF;
}
.searchinput{
    height: 30px;
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color:#f1f1f1;
    border: none;
    margin-top: 20px;
    margin-left:18px;  
}
.search-box {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-radius: 5px;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  padding: 20px 10px 20px 10px;
  background: #FFFFFF;
  height: 30px;
}
.search-box .placeholder {
  position: fixed;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  text-align: center;
  font-size: 14px;
  color: #9A9A9A;
  cursor: text;
  vertical-align: middle;
  height: 30px;
}
.search-box .placeholder::before {
  /* content: '\e601'; */
  font-family: iconfont;
  font-size: 18px;
}
.search-box input[type="search"] {
  /* background-image:url('../../assets/images/ic_search.png');
  background-repeat:no-repeat; */
  -webkit-appearance: none;
  width: 100%;
  height: 30px;
  border: 0;
  /* border-radius: 15px; */
  /* color: #e4f7ee; */
  background: #f1f1f1;
  font-size: 14px;
  padding: 0 10px 0 10px;
  /* text-align: center; */
  outline: 0;
  margin: 0 5px 0 5px;
}
.search-box input[type="search"]::-webkit-input-placeholder {
  color: #9A9A9A;
}
.search-box input[type="search"]::-moz-placeholder {
  color: #9A9A9A;
}
.search-box input[type="search"]:-ms-input-placeholder {
  color: #9A9A9A;
}
.search-box input[type="search"]::placeholder {
  color: #9A9A9A;
}
</style>
<script>
import PullTo from 'vue-pull-to'
export default {
  name: 'Search',
  components: {
    PullTo
  },
  data () {
    return {
      list0: [], // 原始
      listt0: [], // 处理过的
      search: '', // 搜索框内容
      iconLink: ''
    }
  },
  methods: {
    getSearch (search) {
      if (this.search) {
        this.getPage = 1
        this.$api.get('poster/appposterlist.ashx?client=0&page=' + this.getPage + '&tag=' + this.search, null, r => {
          let tempsvar = r.data
          let templist = []
          for (var i in tempsvar) {
            templist.push(tempsvar[i])
          }
          this.listt0 = templist
        })
      } else {
        // alert('请输入筛选条件!')
        console.log('请输入筛选条件!')
      }
    },
    loadmore (loaded) {
      setTimeout(() => {
        this.getPage++
        this.$api.get('poster/appposterlist.ashx?client=0&page=' + this.getPage + '&tag=' + this.search, null, r => {
          let data = r.data
          let list = []
          for (var i in data) {
            list.push(data[i])
          }
          this.list0 = list
          if (list.length === 0) {
            this.getPage--
            console.log(list.length)
          }
          this.listt0 = this.listt0.concat(this.list0)
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
  // beforeRouteLeave (to, from, next) {
  //        // 设置下一个路由的 meta
  //   to.meta.keepAlive = true  // 让 A 缓存，即不刷新
  //   next()
  // }
}
</script>