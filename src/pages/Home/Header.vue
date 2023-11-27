<script setup>
import github_icon from "../../assets/github-mark.svg";

defineProps(['menuIndex'])  //定义props实现页面跳转 导航标签也跳转
</script>

<template>
  <el-container>
    <el-header class="fixed-header">
      <el-row>
        <el-col :xs="8" :sm="6" :md="6" :lg="6" :xl="6">
          <router-link to="/" >
            <h2 style="color: pink;">DigBGM</h2>
          </router-link>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-menu mode="horizontal"  text-color="black" :default-active="menuIndex" >
            <el-menu-item index="1">
              <router-link to="/" >Home</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/docs" >Document</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/timeline">Timeline</router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <router-link to="/about">About</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>

        <el-col :xs="2" :sm="4" :md="4" :lg="4" :xl="4"  style="">
          <ul>
          <el-button>
            <a href="https://github.com/viogami/DigBGM_vite" target="_blank">
              <img :src="github_icon" alt="GitHub Icon" width="18" height="18" />
            </a>
          </el-button>
          </ul>
        </el-col>
      </el-row>
    </el-header>
    <!--分割线-->
    <el-divider />
  </el-container>
</template>

<style scoped>

</style>