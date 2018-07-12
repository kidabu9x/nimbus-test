import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// Admin component
import Questions from '@/components/admin/Questions'

// User component
import Test from '@/components/user/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/admin/questions',
      name: 'admin/questions',
      component: Questions
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})
