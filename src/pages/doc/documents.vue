<template>
<div style="display: flex; flex-direction: column;">
<!-- 文章主组件，负责显示页面，文章列表，文章点击路由 -->
<!--  导航  -->
<Header :menu-index="'2'"/>
  <!--  定义文章列表显示模式  -->
  <div class="container">
    <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4" style="display: flex;flex: 1;">
      <el-menu class="article-menu" router>
        <!-- 一级目录 -->
        <el-menu-item :index="menu.name" v-for="menu in menuList" :key="menu.title">
          <span>{{ menu.title }}</span>
        </el-menu-item>
        <!-- 二级目录 -->
        <el-sub-menu :index="menu.name" v-for="menu in subMenuList" :key="menu.title">
          <template #title>
            <span>{{ menu.title }}</span>
          </template>
          <!-- 子目录群 -->
          <el-menu-item-group>
            <el-menu-item :index="item.name" v-for="item in menu.children" :key="item.name">
              {{ item.title }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-col>

    <el-col :xs="16" :sm="18" :md="20" :lg="20" :xl="20">
      <router-view :key=route.path />
    </el-col>
  </div>
</div>
</template>

<script setup>
import Header from '../Home/Header.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 一级目录
const menuList = [
  {
    name: '/docs/introduce',
    title: 'Introduce'
  }
]
// 二级目录
const subMenuList = [
  {
    name: '/Tech-Stack',
    title: 'Tech Stack',
    children: [
      {
        name: '/docs/frontend',
        title: 'Front End'
      },
      {
        name: '/docs/backend',
        title: 'Back End'
      }
    ]
  }
]
// 无子目录群

</script>

<style scoped>
.container{
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  text-align: start;
}
.article-menu{
  padding-top: 1rem;
  padding-bottom: 1rem;
  flex-grow: 1;
  overflow-x: hidden;
  font-weight: bold;
}

</style>
