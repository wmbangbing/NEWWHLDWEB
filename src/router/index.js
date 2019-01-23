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
        "path": "http://223.255.43.21:82/treeTest",
        // "path": "http://202.114.148.160/qctest/treeTest/",
        // path: 'sceneview',
        // name: 'SceneView',
        // component: () => import('@/views/esriScene/index'),
        meta: { title: '三维', icon: '3dmap' }
      }
    ]
  },
  {
    path: '/chart',
    component: Layout,
    redirect: '/view/chart',
    name: 'chart',
    alwaysShow: true,
    meta: { title: '统计分析', icon: 'chart' },
    children: [
      {
        path: 'xbArea',
        name: 'xbArea',
        component: () => import('@/views/statisticChart/xbArea'),
        meta: { title: '县区', icon: 'chart_1' }
      },
      {
        path: 'xbAreaByDL',
        name: 'xbAreaByDL',
        component: () => import('@/views/statisticChart/xbAreaByDL'),
        meta: { title: '县区地类', icon: 'chart_1' }
      },
      {
        path: 'yssz',
        name: 'yssz',
        component: () => import('@/views/statisticChart/yssz'),
        meta: { title: '优势树种', icon: 'chart_1' }
      }
    ]
  },
  // {
  //   path:"/task",
  //   component: Layout,
  //   redirect: '/task/test',   
  //   name: 'task',
  //   meta: { title: '任务管理', icon: 'mission' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'test',
  //       name: 'test',
  //       component: () => import('@/views/task/test'),
  //       meta: { title: '测试', icon: '2dmap' }
  //     },
  //     {
  //       path: 'admin',
  //       name: 'admin',
  //       component: () => import('@/views/task/admin/index'),
  //       meta: { title: '任务审查', icon: '2dmap' }
  //     },
  //     {
  //       path: 'districtReview',
  //       name: 'districtReview',
  //       component: () => import('@/views/task/district/reviewTask'),
  //       meta: { title: '任务上传', icon: '2dmap' }
  //     }
  //   ]
  // }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path:"/task",
    component: Layout,
    redirect: '/view/mapview',   
    name: 'task',
    meta: { 
      title: '任务管理', 
      icon: 'mission',
      roles: ['district','admin'] 
    },
    alwaysShow: true,
    children: [
      // {
      //   path: 'test',
      //   name: 'test',
      //   component: () => import('@/views/task/test'),
      //   meta: { 
      //     title: '测试', 
      //     icon: '2dmap'
      //   }
      // },
      {
        path: 'adminReview',
        name: 'adminReview',
        component: () => import('@/views/task/admin/index'),
        meta: { 
          title: '任务审查', 
          icon: 'review' ,
          roles: ['admin'] 
        }
      },
      {
        path: 'adminRelease',
        name: 'adminRelease',
        component: () => import('@/views/task/admin/releaseTask'),
        meta: { 
          title: '任务发布', 
          icon: 'release' ,
          roles: ['admin'] 
        }
      },
      {
        path: 'inquireTask',
        name: 'inquireTask',
        component: () => import('@/views/task/inquireTask'),
        meta: { 
          title: '实施查询', 
          icon: 'release' ,
          // roles: ['admin'] 
        }
      },
      {
        path: 'districtReview',
        name: 'districtReview',
        component: () => import('@/views/task/district/reviewTask'),
        meta: { 
          title: '上报任务', 
          icon: 'upload',
          roles: ['district'] 
        },
      },
      {
        path: 'districtBase',
        name: 'districtBase',
        component: () => import('@/views/task/district/baseTask'),
        meta: { 
          title: '非上报任务', 
          icon: 'upload',
          roles: ['district'] 
        },
      },
      {
        path: 'adminTask',
        name: 'adminTask',
        component: () => import('@/views/task/admin/releaseTask'),
        meta: { 
          title: '林业局任务', 
          icon: 'release' ,
          roles: ['district'] 
        }
      },
    ]
  },
  {
    path:"/user",
    component: Layout,
    redirect: '/view/mapview',   
    name: 'user',
    meta: { 
      title: '用户管理', 
      icon: 'user',
      roles: ['district','admin','visitor'] 
    },
    alwaysShow: true,
    children: [
      {
        path: 'createUser',
        name: 'createUser',
        component: () => import('@/views/user/createUser'),
        meta: { 
          title: '创建用户', 
          icon: 'create' ,
          roles: ['admin'] 
        }
      },
      {
        path: 'modifyPassword',
        name: 'modifyPassword',
        component: () => import('@/views/user/modifyPassword'),
        meta: { 
          title: '修改密码', 
          icon: 'modifyPsd',
          roles: ['district','admin','visitor'] 
        }
      }
    ]
  }
]