import Vue from 'vue'
import Router from 'vue-router'

// Admin component
import Admin from '@/components/admin/Admin'
import Questions from '@/components/admin/Question/Questions'
import AdminTestClass from '@/components/admin/Test/TestClass'
import AdminTestResults from '@/components/admin/Test/TestResults'
import ExamSchedules from '@/components/admin/ExamSchedule/Schedule'
import Member from '@/components/admin/Member/Members'
import AllCourse from '@/components/admin/Course/AllCourse'
import Course from '@/components/admin/Course/Course'
import NewGrade from '@/components/admin/Course/NewGrade';
import Dev from '@/components/Dev/Dev'
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
      path: '/dev',
      component: Dev
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'questions',
          component: Questions
        },
        {
          path: 'tests',
          component: AdminTestClass
        },
        {
          path: 'tests/:code',
          component: AdminTestResults
        },
        {
          path: 'schedules',
          component: ExamSchedules
        },
        {
          path: 'members',
          component: Member
        },
        {
          path: 'courses',
          component: AllCourse
        },
        {
          path: 'courses/:handle',
          component: Course
        },
        {
          path: 'courses/:handle/new',
          component: NewGrade
        }
      ]
    }
    
  ]
})
