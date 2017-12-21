import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index/Index'
import TagPage from '../pages/Index/TagPage'
import Template from '../pages/Template/Template'
import Recommend from '../pages/Recommend/Recommend'
import Search from '../pages/Search/Search'
import BeforeAfter from '../pages/Template/BeforeAfter'
import Collage from '../pages/Template/Collage'
import FacebookCover from '../pages/Template/FacebookCover'
import FacebookPost from '../pages/Template/FacebookPost'
import InstagramCover from '../pages/Template/InstagramCover'
import ShopEECover from '../pages/Template/ShopEECover'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/tagpage/:tagid?',
      name: 'TagPage',
      component: TagPage
    },
    {
      path: '/template',
      name: 'Template',
      component: Template
    },
    {
      path: '/beforeafter',
      name: 'BeforeAfter',
      component: BeforeAfter
    },
    {
      path: '/collage',
      name: 'Collage',
      component: Collage
    },
    {
      path: '/facebookcover',
      name: 'FacebookCover',
      component: FacebookCover
    },
    {
      path: '/instagramcover',
      name: 'InstagramCover',
      component: InstagramCover
    },
    {
      path: '/facebookpost',
      name: 'FacebookPost',
      component: FacebookPost
    },
    {
      path: '/shopeecover',
      name: 'ShopEECover',
      component: ShopEECover
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/Index',
      redirect: '/'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
