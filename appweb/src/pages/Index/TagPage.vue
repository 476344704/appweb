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
    <t-header :tag="tagmodel" ></t-header>
    <div style="height:8px;background-color:#F0F0F0;"></div>
    <div id="listtagpage">
        <ul>
            <m-content-list :time="i.time" :name="i.tagitems[0].tagname" :imgs="i.contentimgs" :videos="i.contentvideos"  :logo="i.tagitems[0].taglogo" :totallikes="i.totallikes" :iflikes="i.iflikes" :hotid="i.contentID" :content="i.content" v-for="i in MList" :key="i.contentid">
                    <span slot="author">{{i.author}}</span>
            </m-content-list>
        </ul>
    </div>
  </pull-to>
</template>
<style scoped rel="stylesheet/less" lang="less">
  @import '../../assets/lib/swiper/css/swiper.min.css';
  #listtagpage,#listtagpage li,.po-hd,.post {
    overflow: visible;
    padding: 10px 0 0;
    position: relative;
}
  .po-cmt {
    padding-bottom: 40px;
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
</style>

<script type="text/babel">
  import PullTo from 'vue-pull-to'
  import mContentList from '../../components/contentlist'
  import tHeader from '../../components/tagheader'
  export default {
    name: 'index',
    components: {
      PullTo,
      tHeader,
      mContentList
    },
    data () {
      return {
        NewList: [],
        MList: [],
        iconLink: '',
        tagmodel: []
      }
    },
    created () {
      this.getData(),
      this.getTag()
    },
    methods: {
      getTag () {
        var tid = this.$route.params.tagid
        this.$api.get('content/tag.ashx?tagid=' + tid, null, r => {
          let data = r.data
          let list = []
          for (var i in data) {
            list.push(data[i])
          }
          this.tagmodel = list[0]
        })
      },
      getData () {
        this.getPage = 1
        var tid = this.$route.params.tagid
        this.$api.get('content/tagpage.ashx?page=' + this.getPage + '&tagid=' + tid, null, r => {
          let data = r.data
          let list = []
          for (var i in data) {
            list.push(data[i])
          }
          this.MList = list
        })
      },
      loadmore (loaded) {
        setTimeout(() => {
          this.getPage++
          var tid = this.$route.params.tagid
          this.$api.get('content/tagpage.ashx?page=' + this.getPage + '&tagid=' + tid, null, r => {
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
            this.MList = this.MList.concat(this.NewList)
          })
          loaded('done')
        }, 2000)
      },
      refresh (loaded) {
        setTimeout(() => {
          this.getData()
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
      }
    }
  }
</script>
