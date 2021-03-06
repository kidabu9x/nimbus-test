import Vue from 'vue';
import Router from 'vue-router';

//------------- Admin component -------------
import Admin from '@/components/Admin'
// --Login
import AdminLogin from '@/components/admin/Login';
// --Question
import Questions from '@/components/admin/Questions';
// --Tests
import AdminTests from '@/components/admin/Test';
import AdminTestResults from '@/components/admin/Test/TestResults';
import IncorrectAns from '@/components/admin/Test/IncorrectAns';
// --Members
import Member from '@/components/admin/Members';
// --Course
import Courses from '@/components/admin/Courses';
import NewCourse from '@/components/admin/Course/NewCourse';
import CourseDetails from '@/components/admin/Course/CourseDetails';
import CourseSchedules from '@/components/admin/Course/Schedules';
import CourseClasses from '@/components/admin/Course/Classes';
import Grade from '@/components/admin/Course/Grade';
import NewClass from '@/components/admin/Course/NewClass';
import Dev from '@/components/Dev/Dev';
// --Teachers Schedule
import TeacherSchedules from '@/components/admin/TeacherSchedules';
// ---------- end admin component ------------

// ------------- User component --------------
import User from '@/components/User';
import Test from '@/components/user/Test';
import TestMos from '@/components/user/TestMos';
import Homepage from '@/components/user/Homepage';
import ExamRegistration from '@/components/user/ExamRegistration';
import ConfirmEmail from '@/components/user/ConfirmEmail';
// ----------- end user component ------------

Vue.use(Router)

let router = new Router({
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
        },
        {
          path: '/dang-ki-thi',
          name: 'ExamRegistration',
          component: ExamRegistration
        }
      ]
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/test-mos',
      name: 'TestMos',
      component: TestMos
    },
    {
      path: '/confirm-email',
      name: 'ConfirmEmail',
      component: ConfirmEmail
    },
    {
      path: '/dev',
      name: 'Dev',
      component: Dev
    },
    {
      path: '/admin/auth',
      name: 'adminLogin',
      component: AdminLogin
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta : {
        requiresAuth: true
      },
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
          path: 'members',
          name: 'adminMembers',
          component: Member
        },
        {
          path: 'courses',
          name: 'adminCourses',
          component: Courses
        },
        {
          path: 'courses/new-course',
          name: 'adminNewCourse',
          component: NewCourse
        },
        {
          path: 'courses/:handle',
          name: 'adminCourseDetails',
          component: CourseDetails,
          children: [
            {
              path: 'schedules',
              name: 'adminCourseSchedule',
              component: CourseSchedules
            },
            {
              path: 'classes',
              name: 'adminCourseClasses',
              component: CourseClasses
            }
          ]
        },
        {
          path: 'courses/:handle/new-class',
          name : 'adminNewClass',
          component: NewClass
        },
        {
          path: 'courses/:handle/:gradeHandle',
          component: Grade
        },
        {
          path: 'schedules',
          component: TeacherSchedules
        }
      ]
    }
    
  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/admin/auth',
        query: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next() 
  }
});

export default router;
