import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

export const constantRoutes: RouteConfig[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "index" */ '@/views/index/index.vue'),
        name: 'Index',
        meta: {
          title: 'index',
          icon: 'component',
          affix: true
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    meta: {
      title: 'guide',
      icon: 'component',
      noCache: true
    },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
        name: 'Guide',
        meta: {
          title: 'guide',
          noCache: true
        }
      },
      {
        path: 'index2',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
        name: 'Guide2',
        meta: {
          title: 'guide',
          noCache: true
        }
      },
      {
        path: 'form',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/form/index.vue'),
        name: 'Form',
        meta: {
          title: 'form',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: '/tab/index',
        component: () => import(/* webpackChunkName: "tab" */ '@/views/tab/index.vue'),
        name: 'Tab',
        meta: {
          title: 'tab',
          icon: 'component'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  }
]
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/icon',
    component: Layout,
    redirect: '/icon/index',
    meta:{
      title: 'icons',
      icon: 'component',
      alwaysShow: true
    },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "icons" */ '@/views/icons/index.vue'),
        name: 'Icons',
        meta: {
          title: 'icons',
          noCache: true
        }
      }
    ]
  },
]

const createRouter = () => new VueRouter({
  routes:constantRoutes,
  scrollBehavior: (to: any, from: any, savedPosition: any) => {
    // savedPosition 会在你使用浏览器前进或后退按钮时候生效
    // 这个跟你使用 router.go() 或 router.back() 效果一致
    // 这也是为什么我在 tab 栏结构中放入了一个 点击回退 的按钮
    if (savedPosition) {
      return savedPosition
    } else {
      // 如果不是通过上述行为切换组件，就会让页面回到顶部
      return {x: 0, y: 0}
    }
  },
})
const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
