import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'


export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/view',
    name: 'default',
    hidden: true,
    // children: [{
    //   path: 'map',
    //   component: () => import('@/views/esriMap/index')
    // }]
  },
  {
    path: '/view',
    component: Layout,
    redirect: '/view/mapview',
    name: 'map',
    meta: { title: '地图', icon: 'map' },
    children: [
      {
        path: 'mapview',
        name: 'MapView',
        component: () => import('@/views/esriMap/index'),
        meta: { title: '二维', icon: '2dmap' }
      },
      {
        // "path": "http://223.255.43.21/treeTest",
        "path": "http://202.114.148.160/treeTest",
        // path: 'sceneview',
        // name: 'SceneView',
        // component: () => import('@/views/esriScene/index'),
        meta: { title: '三维', icon: '3dmap' }
      }
    ]
  },
]

export default new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
