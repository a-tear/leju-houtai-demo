import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },



  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'Dashboard',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/good',
    component: Layout,
    redirect: '/good/goods',
    name: 'good',
    meta: {
      title: '商品',
      icon: 'dashboard'
    },
    children: [{
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/good/goods/index'),
        meta: {
          title: '商品管理',
          icon: 'dashboard'
        }
      },
      {
        path: 'classification',
        name: 'classification',
        component: () => import('@/views/good/classification/index'),
        meta: {
          title: '分类管理',
          icon: 'dashboard'
        }
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/good/brand/index'),
        meta: {
          title: '品牌管理',
          icon: 'dashboard'
        }
      },
      {
        path: 'dictionary',
        name: 'dictionary',
        component: () => import('@/views/good/dictionary/index'),
        meta: {
          title: '字典管理',
          icon: 'dashboard'
        }
      },
      {
        path: 'series',
        name: 'series',
        component: () => import('@/views/good/series/index'),
        meta: {
          title: '系列管理',
          icon: 'dashboard'
        }
      },
    ]
  },

  {
    path: '/material',
    component: Layout,
    redirect: '/material/images',
    name: 'images',
    meta: {
      title: '素材管理',
      icon: 'dashboard'
    },
    children: [{
        path: 'images',
        name: 'images',
        component: () => import('@/views/material/images/index'),
        meta: {
          title: '图片管理',
          icon: 'form'
        }
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/material/article/index'),
        meta: {
          title: '文章管理',
          icon: 'form'
        }
      }
    ]
  },
  {
    path: '/stock',
    component: Layout,
    children: [{
      path: 'stock',
      name: 'stock',
      component: () => import('@/views/stock/index'),
      meta: {
        title: '库存管理',
        icon: 'form'
      }
    }]
  },

  {
    path: '/order',
    component: Layout,
    children: [{
      path: 'order',
      name: 'order',
      component: () => import('@/views/order/index'),
      meta: {
        title: '订单管理',
        icon: 'form'
      }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [{
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: {
          title: 'Table',
          icon: 'table'
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {
          title: 'Tree',
          icon: 'tree'
        }
      }
    ]
  },







  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
