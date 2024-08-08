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
    path: '/dashboard',
    name: 'Dashboard',
    component: defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ "@/pages/SurveyPage/SurveyPage1"))
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