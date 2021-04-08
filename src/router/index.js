import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  // 登录路由
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  // 布局路由
  {
    path: '/',
    // name: 'layout', // 如果父路由有默认子路由 则给它设置name属性没有任何意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 子路由路径留空、表示默认子路由 默认访问的就是home路由 默认路由只有一个
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
