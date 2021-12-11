import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'
const constantFiles = require.context('./constantModules', true, /\.ts$/)
let constantModules: Array<RouteRecordRaw> = []
constantFiles.keys().forEach((key) => {
  if (key === './index.ts') return
  constantModules = constantModules.concat(constantFiles(key).default)
})

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/sub',
    component: Layout,
    meta: { hidden: true },
  },
  ...constantModules
]

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes: constantRoutes
// })

// export function resetRouter() {
//   const newRouter = router;
//   (router as any).matcher = (newRouter as any).matcher // reset router
// }

export default constantRoutes
