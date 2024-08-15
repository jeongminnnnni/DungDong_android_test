import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from "vue";

/* INFO rule
 * path
    1. camelCase 로 작성
    2. 파일 path와 동일하게 작성 예) folder1/folder2/my-file
 * name
    1. 파일명 작성 -> PascalCase 사용.
 * component
    1. 파일 path 작성
 */

const routes = [
  {
    path: '/',
    redirect: '/home' // Redirect root path to dashboard
  },
  {
    path: '/home',
    name: 'Home',
    component: defineAsyncComponent(() => import(/* webpackChunkName: "home" */ "@/pages/Home.vue"))
  },
  {
    path: '/survey1',
    name: 'SurveyPage1',
    component: defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ "@/pages/SurveyPage/SurveyPage1"))
  },
  {
    path: '/survey2',
    name: 'SurveyPage2',
    component: defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ "@/pages/SurveyPage/SurveyPage2"))
  },
  {
    path: '/survey3',
    name: 'SurveyPage3',
    component: defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ "@/pages/SurveyPage/SurveyPage3"))
  },
  {
    path: '/survey4',
    name: 'SurveyPage4',
    component: defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ "@/pages/SurveyPage/SurveyPage4"))
  },
  {
    path: '/survey5',
    name: 'SurveyPage5',
    component: defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ "@/pages/SurveyPage/SurveyPage5"))
  },
  {
    path: '/survey6',
    name: 'SurveyPage6',
    component: defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ "@/pages/SurveyPage/SurveyPage6"))
  },
  {
    path: '/survey7',
    name: 'SurveyPage7',
    component: defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ "@/pages/SurveyPage/SurveyPage7"))
  },
  {
    path: '/end',
    name: 'End',
    component: defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ "@/pages/End"))
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if(to.path !== '/admin/loginPage' && to.path !== '/admin/registerAdminPage' && to.path !== '/admin/adminSignupSuccPage') {
//     if(needLogin()) {
//       next('/admin/loginPage');
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// })

export default router;

// function needLogin() {
//   if (localStorage.getItem("requireLogin") === 'false') {
//       return false
//   } else {
//       return true
//   }
// }

export { routes }