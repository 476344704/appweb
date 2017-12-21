<template>
  <pull-to
    :top-load-method="refresh"
    @top-state-change="stateChange">
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
    <r-search></r-search>
    <r-tags></r-tags>
    <div style="height:0px;background-color:#F0F0F0;"></div>
    <div id="list">
      <r-item :temps="recommends"  v-model="recommends" :key="recommends.index"></r-item>
    </div>
  </pull-to>
</template>

<style scoped rel="stylesheet/less" lang="less">
   @import '../../assets/lib/swiper/css/swiper.css';
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
<script>
import PullTo from 'vue-pull-to'
import rItem from '../../components/reco-item'
import rTags from '../../components/reco-tags'
import rSearch from '../../components/search'
export default {
  name: 'recommend',
  components: {
    rItem,
    rTags,
    rSearch,
    PullTo
  },
  data () {
    return {
      recommends: [],
      iconLink: ''
    }
  },
  created () {
    this.getTemps()
  },
  methods: {
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
    getTemps () {
      this.$api.get('recommend/recommendlist.ashx', null, r => {
        let tempsvar = r.data
        let templist = []
        for (var i in tempsvar) {
          templist.push(tempsvar[i])
        }
        this.recommends = templist
      })
    },
    winReload () {
      window.location.reload()
    }
  }

}
</script>
