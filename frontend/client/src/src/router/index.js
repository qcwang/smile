import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/views/homepage/index'
import me from '@/views/home/me'

// 登录
import login from '@/views/login'
import list from '@/views/list'
import verification from '@/views/verification'
import resetPassword from '@/views/resetPassword'

// 课程
import resetDonePassword from '@/views/resetDonePassword'
import getCourseCategories from '@/views/course/list'
import getCourses from '@/views/course/courseList'
import getCourseDetails from '@/views/course/detail'
import commentCourse from '@/views/course/comment'

// 考试
import getExamList from '@/views/exam/list'
import getExamInfo from '@/views/exam/detail'
import startExam from '@/views/exam/exam'

Vue.use(Router)

var requiresAuth = true

export default new Router({
  mode: 'history',
  routes: [
    // 登录
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/verification',
      name: 'codeVerification',
      component: verification
    },
    {
      path: '/resetPassword',
      name: 'passwordReset',
      component: resetPassword
    },
    {
      path: '/resetPassword/done',
      name: 'passwordResetDone',
      component: resetDonePassword
    },
    // 课程
    {
      path: '/getCourseCategories',
      name: 'courseCategories',
      component: getCourseCategories,
      meta: { requiresAuth: requiresAuth }
    },
    {
      path: '/getCourses',
      name: 'courses',
      component: getCourses,
      meta: { requiresAuth: requiresAuth }
    },
    {
      path: '/getCourseDetails',
      name: 'courseDetails',
      component: getCourseDetails,
      meta: { requiresAuth: requiresAuth }
    },
    {
      path: '/commentCourse',
      name: 'courseComment',
      component: commentCourse,
      meta: { requiresAuth: requiresAuth }
    },
    // 考试
    {
      path: '/getExamList',
      name: 'getExamList',
      component: getExamList,
      meta: { requiresAuth: requiresAuth }
    },
    {
      path: '/getExamInfo',
      name: 'getExamInfo',
      component: getExamInfo,
      meta: { requiresAuth: requiresAuth }
    },
    {
      path: '/startExam',
      name: 'startExam',
      component: startExam,
      meta: {requiresAuth: requiresAuth}
    },
    // 其他
    {
      path: '/',
      name: 'homepage',
      component: homepage,
      meta: { requiresAuth: requiresAuth }
    },
    {
      path: '/me',
      name: 'me',
      component: me,
      meta: { requiresAuth: requiresAuth }
    },
    {
      path: '/list',
      name: 'list',
      component: list,
      meta: { requiresAuth: requiresAuth }
    }
  ]
})
