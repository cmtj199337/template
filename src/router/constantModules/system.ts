import { RouteRecordRaw } from 'vue-router'
import View from '@/components/view/Index.vue'
import Layout from '@/layout/Index.vue'
const SystemRouter: Array<RouteRecordRaw> = [
  {
    path: '/sub',
    component: window.__POWERED_BY_QIANKUN__ ? View : Layout,
    redirect: '/sub/role',
    name: 'sub',
    meta: {
      title: '缓存中心',
      icon: '#iconquanxian'
    },
    children: [
      {
        path: 'role',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/role/Index.vue'),
        name: 'role',
        meta: {
          title: '角色管理',
          icon: 'role',
          noCache: true
        }
      },
      {
        path: 'article',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/article/Index.vue'),
        name: 'article',
        meta: {
          title: '文章管理',
          icon: 'article',
          noCache: true
        }
      }
    ]
  }
]

export default SystemRouter
