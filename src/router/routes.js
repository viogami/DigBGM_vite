import about from '../pages/about.vue'
import NotFound from '../pages/404.vue'
import home from '../pages/Home/Home.vue'
import timeline from '../pages/Timeline.vue'
import UserPage from '../pages/UserPage.vue'
import docs from '../pages/doc/documents.vue'
import docCat from "../pages/doc/docCat.vue";

const routes = [
  { path: '/', component: home }, //  登陆页面
  { path: '/about', component: about }, //  关于页面
  { path: '/user/:username', name: 'UserPage', component: UserPage }, // 使用动态路由创建用户界面
  { path: '/timeline', component: timeline }, // 时间线界面
  { path: '/docs', component: docs, redirect: '/docs/introduce', //重定向到介绍界面
    children: [
      {
        path: ':page',
        name: 'DocPage',
        component: docCat, //必须定位至目录，不然无法config值无法获取
      }
    ]
  },  // 文章路由
  { path: '/:patchMatch(.*)', name: NotFound, component: NotFound }// 404 页面
]

export default routes
