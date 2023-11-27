<script lang="ts" setup>
import SearchPage from "./search.vue"
import HeaderPage from "./Header.vue"
import FooterPage from "./footer.vue"
import { ref } from 'vue'
import {
  Menu as IconMenu,
  Headset,
  SwitchFilled,
  VideoPlay,
  Avatar,
  Reading,
  Expand,
  Fold,
} from '@element-plus/icons-vue'

//侧边栏折叠面板逻辑
const isCollapse = navigator.userAgent.match(/Phone|iPad/) ? ref(true) : ref(false)
const collapseMenu = () => {
  isCollapse.value = !isCollapse.value
}

</script>

<template>
<!--页头-->
  <HeaderPage :menuIndex="'1'"/>
  
<!--侧边栏-->
<el-container>
<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
<el-aside width="250px" class="sidebar">
  <h4 style="text-align:start;margin-left: 30px;">查询类型</h4>
  <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
  >
    <el-menu-item index="0">
      <el-icon><icon-menu /></el-icon>
      <span>全部类型</span>
    </el-menu-item>
    <el-menu-item index="1">
      <el-icon><reading /></el-icon>
      <span>书籍</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><video-play /></el-icon>
      <span>动画</span>
    </el-menu-item>
    <el-menu-item index="3" >
      <el-icon><headset /></el-icon>
      <span>音乐</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><switch-filled /></el-icon>
      <span>游戏</span>
    </el-menu-item>
    <el-menu-item index="6">
      <el-icon><avatar /></el-icon>
      <span>三次元</span>
    </el-menu-item>
  </el-menu>
</el-aside>
</el-col>
<!--搜索框-->
<el-main class="main-container">
  <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" >
  <SearchPage/>
  </el-col>
</el-main>
</el-container>
  
<!--侧边栏放缩图标按钮-->
<div class="collapseIcon">
  <div v-if="isCollapse">
    <el-icon v-model="isCollapse" size="20" @click="collapseMenu">
      <fold/>
    </el-icon>
  </div>
  <div v-else>
    <el-icon v-model="isCollapse" size="20" @click="collapseMenu">
      <expand/>
    </el-icon>
  </div>
</div>
  
<!--页脚-->
<footer-page/>
</template>

<style scoped>

.sidebar {
  padding-bottom: 25px; 
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.collapseIcon {
  margin-top: 6rem;
  text-align: left;
  padding-left: 1.5rem;
}
</style>