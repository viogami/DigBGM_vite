import about from '../pages/about.vue'
import NotFound from '../pages/404.vue'
import login from '../pages/login.vue'
import UserPage from '../pages/UserPage.vue'

const routes = [
  { path: '/', component: login }, //  登陆页面
  { path: '/about', component: about }, //  关于页面
  { path: '/user/:username', name: 'UserPage', component: UserPage }, // 使用动态路由创建用户界面
  { path: '/:patchMatch(.*)', name: NotFound, component: NotFound }// 404 页面
]

export default routes
