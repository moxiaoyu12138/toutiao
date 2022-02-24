import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login
  // }
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/acticle/:articleId',
    name: 'acticle',
    component: () => import('@/views/acticle'),
    props: true
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  }

]

const router = new VueRouter({
  routes
})

export default router
