import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/add',
      name: 'add',
      component: () => import(/* webpackChunkName: "about" */ './views/Add.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import(/* webpackChunkName: "about" */ './views/Detail.vue')
    },
    {
      path: '/log',
      name: 'log',
      component: () => import(/* webpackChunkName: "about" */ './views/Log.vue')
    }
  ]
})
