import Vue from 'vue'
import Router from 'vue-router'

// Admin component
import Admin from '@/components/admin/Admin'
import Questions from '@/components/admin/Questions'
import AdminTestClass from '@/components/admin/Test/TestClass'
import ExamSchedules from '@/components/admin/ExamSchedule/Schedule'

// User component
import User from '@/components/user/User'
import Test from '@/components/user/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: User,
      children: [
        {
          path: 'test',
          component: Test
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'questions',
          component: Questions,
        },
        {
          path: 'tests',
          component: AdminTestClass,
        },
        {
          path: 'schedules',
          component: ExamSchedules
        }
      ]
    }
    
  ]
})
