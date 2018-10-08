import Vue from 'vue'
import Router from 'vue-router'

//------------- Admin component -------------
import Admin from '@/components/admin/Admin'
import Questions from '@/components/admin/Questions'
import AdminTests from '@/components/admin/Test/TestClass'
import AdminTestResults from '@/components/admin/Test/TestResults'
import IncorrectAns from '@/components/admin/Test/IncorrectAns'
import ExamSchedules from '@/components/admin/ExamSchedule/Schedule'
import Member from '@/components/admin/Member/Members'
// Course
import AllCourse from '@/components/admin/Course/AllCourse'
import NewCourse from '@/components/admin/Course/NewCourse'
import CourseDetails from '@/components/admin/Course/CourseDetails'
import Grade from '@/components/admin/Course/Grade'
import NewClass from '@/components/admin/Course/NewClass'
import Dev from '@/components/Dev/Dev'
// ---------- end admin component ------------

// ------------- User component --------------
import User from '@/components/user/User'
import Test from '@/components/user/Test'
import Homepage from '@/components/user/Homepage'
// ----------- end user component ------------

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: User,
      children: [
        {
          path: '',
          name: 'Homepage',
          component: Homepage
        }
      ]
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/dev',
      name: 'Dev',
      component: Dev
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'questions',
          name: 'adminQuestions',
          component: Questions
        },
        {
          path: 'tests',
          name: 'adminTests',
          component: AdminTests
        },
        {
          path: 'tests/:handle',
          name: 'adminTestResults',
          component: AdminTestResults
        },
        {
          path: 'tests/:handle/:answerId',
          name: 'adminTestIncorrectAns',
          component: IncorrectAns
        },
        {
          path: 'schedules',
          component: ExamSchedules
        },
        {
          path: 'members',
          name: 'adminMembers',
          component: Member
        },
        {
          path: 'courses',
          name: 'adminCourses',
          component: AllCourse
        },
        {
          path: 'courses/new-course',
          name: 'adminNewCourse',
          component: NewCourse
        },
        {
          path: 'courses/:handle',
          name: 'adminCourseDetails',
          component: CourseDetails
        },
        {
          path: 'courses/:handle/new-class',
          name : 'adminNewClass',
          component: NewClass
        },
        {
          path: 'courses/:handle/:gradeHandle',
          component: Grade
        }
      ]
    }
    
  ]
})
