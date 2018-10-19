import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home.vue'
import homePage from '../components/view/homePage'
import special from '../components/view/special'
import articleDetial from '../components/view/articleDetial'
import publishArticle from '../components/view/publishArticle'
import userDetial from '../components/view/userDetial'
import search from '../components/view/search'
import specialDetial from '../components/view/specialDetial'
import login from '../components/login'
import userAttention from '../components/view/user/userAttention'
import userArticle from '../components/view/user/userArticle'
import userComment from '../components/view/user/userComment'
import userFans from '../components/view/user/userFans'
import PersonInfo from '../components/view/user/PersonInfo'
import constant from '../vuex/constant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: login
    },
    {
      path: '/',
      name: 'home',
       meta: {
        title: '首页'
       },
      redirect:'/blog/home',
      children:[
        { path: '/blog/home', title: '首页', name: 'blog/home', component: homePage,children:[] },
        { path: '/blog/special', title: '首页', name: 'blog/special', component: special,children:[] },
        { path: '/blog/articleDetial', title: '文章详情', name: 'blog/articleDetial', component: articleDetial,children:[] },
        { path: '/blog/publishArticle', title: '发表文章', name: 'blog/publishArticle', component: publishArticle,children:[] },
        { path: '/blog/search', title: '发表文章', name:constant.SEARCH_ROUTE, component: search,children:[] },
        { path: '/blog/special_detial', title: '发表文章', name:constant.SPECIAL_DETIAL_ROUTE, component: specialDetial,children:[] },
        { path: '/blog/personinfo-edit', title: '信息编辑', name:constant.PERSONAL_INFO_EDIT, component: PersonInfo,children:[] },
        { path: '/blog/userDetial', title: '用户详情', name: 'blog/userDetial', component: userDetial,
          redirect:'/user/attention',
          children:[
            { path: '/user/attention', title: '用户关注', name: 'user/attention', component: userAttention,children:[] },
            { path: '/user/fans', title: '用户粉丝', name: 'user/fans', component: userFans,children:[] },
            { path: '/user/articlelist', title: '文章列表', name: 'user/articlelist', component: userArticle,children:[] },
            { path: '/user/comment', title: '用户评论', name: 'user/comment', component: userComment,children:[] },

          ] },
      ],
      component: home
    }
  ]
})
