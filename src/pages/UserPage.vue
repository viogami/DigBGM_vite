<template>
  <HeaderPage/>
<!-- 主体内容区 -->
<el-main class="UserPageMain">
  <!-- 主体内容 -->
  <!-- 用户头像 -->
  <el-avatar :size="60" :src="userAvatar" @error="errorHandler" >
    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
    />
  </el-avatar>

  <!-- 用户昵称 -->
  <p>{{ nickname }}</p>

  <!-- 用户签名 -->
  <div>
    <h3>用户签名: {{ userSign }}</h3>
  </div>

  <!-- 用户收藏信息 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户收藏（每页显示8个，无中文名则为空）</span>
        <el-button class="button" text @click="page++;console.log(page)">下一页</el-button>
      </div>
    </template>
    <div v-for="f_item in userProfile.getFavorList(page)" :key="f_item" class="text item">{{ f_item }}</div>
  </el-card>
</el-main>
</template>

<script setup>
import { useUserStore } from '../store/userProfile.js'
import HeaderPage from '../pages/Home/Header.vue'
import {userFavorite} from "../api/user.js";
import {ElNotification} from "element-plus";
import {ref} from "vue";

const userProfile = useUserStore() //使用用户信息的store

const username = userProfile.username
const nickname = userProfile.nickname
const userAvatar = userProfile.avatarUrl
const userSign =  userProfile.sign === "" ? '该用户没有设置签名' : userProfile.sign

const errorHandler = () => true //头像加载失败

//获取用户收藏
userFavorite(username,2,3,300,0).then( res => {
      userProfile.favorList=[] //先清空，防止旧数据冗余
      for (let item=0; item < res.data.data.length; item++){
        userProfile.addFavorList(res.data.data[item].subject.name_cn)
      }
    })
    .catch(err => {
      ElNotification({
        title: 'ERROR',
        message: '用户收藏请求失败~',
        type: 'error',
        duration: 2000 // 持续两秒
      })
    })

//定义页数，用于返回下一页用户收藏
const page = ref(0)


</script>

<style scoped>
.UserPageMain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
