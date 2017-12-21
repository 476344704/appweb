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
    <t-item :temps="templates"  v-model="templates" :key="templates.index">
    </t-item>

</pull-to>
</template>

<style>
@import '../../assets/css/template.css';
.scroll-container {
  background-color:#FFFFFF;
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
<script>
import PullTo from 'vue-pull-to'
import tItem from '../../components/temp-item'
export default {
  name: 'template',
  components: {
    tItem,
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
      this.$api.get('poster/appposterlist.ashx?client=0&page=' + this.getPage, null, r => {
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
        this.$api.get('poster/appposterlist.ashx?client=0&page=' + this.getPage, null, r => {
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
    }
  }

}
</script>
