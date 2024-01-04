<template>
  <HeaderPage/>
<!-- 主体内容区 -->
<el-main class="UserPageMain">
  <!-- 主体内容 -->
  <el-avatar :size="60" :src="userAvatar" @error="errorHandler" >
    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" alt="用户头像"/>
  </el-avatar>

  <!-- 用户昵称 -->
  <p>{{ nickname }}</p>

  <!-- 用户签名 -->
  <div>
    <h3>用户签名: {{ userSign }}</h3>
  </div>

  <!-- 用户收藏信息 -->
  <el-col style="display: flex;justify-content: center" >
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户收藏（每页显示8个,当前第{{ page }}页 ）</span>
        <el-button text @click=" page-1 >= 1 ? nextPage(--page) :
            ElNotification({
            message: '已经是第一页了~',
            type: 'error',
            duration: 2000 // 持续两秒
          })">上一页</el-button>
        <el-button text @click=" 8*(page) < userProfile.favorList_max ? nextPage(++page) :
            ElNotification({
            message: '后面没有了~',
            type: 'error',
            duration: 2000 // 持续两秒
          })">下一页</el-button>
      </div>
    </template>
    <div v-for="f_item in userProfile.getFavorList(page-1,8)" :key="f_item" class="text item">{{ f_item }}</div>
  </el-card>
  </el-col>
</el-main>
</template>

<script setup>
import { useUserStore } from '../store/userProfile.js'
import HeaderPage from '../pages/Home/Header.vue'
import { userFavorite } from '../api/user.js'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'

const userProfile = useUserStore() // 使用用户信息的store

const username = userProfile.username
const nickname = userProfile.nickname
const userAvatar = userProfile.avatarUrl
const userSign = userProfile.sign === '' ? '该用户没有设置签名' : userProfile.sign

const subject_type = 2 // 1书籍 2动画 3音乐 4游戏 6三次元
const type = '' // 1: 想看 2: 看过 3: 在看 4: 搁置 5: 抛弃

const errorHandler = () => true // 头像加载失败

// 获取用户收藏,首次获取三页，避免的翻页加载等待(翻页获取的为下下页)
userFavorite(username, subject_type, type, 24)
    .then(res => {
      userProfile.favorList = [] // 先清空，防止旧数据冗余
      userProfile.favorList_max = res.data.total
      // 循环res中收藏列表插入到store的favorlist中
      for (let item = 0; item < res.data.data.length; item++) {
        const name_cn = res.data.data[item].subject.name_cn
        name_cn === '' ? userProfile.addFavorList(res.data.data[item].subject.name) : userProfile.addFavorList(name_cn)
      }
      eleNotice('success','该用户共有' + res.data.total + '个收藏条目!')
})
  .catch(err => {
    eleNotice('error','用户收藏请求失败~\n' + err.response.data.description)
  })

// 定义页数，用于返回下一页用户收藏
const page = ref(1)

const nextPage = (page) => {
  // 如果2个页面后没有数据，就加载一次
  if (8 * (page + 1) > userProfile.favorList.length && userProfile.favorList.length < userProfile.favorList_max) {
    userFavorite(username, subject_type, type, 24, userProfile.favorList.length) // 从list长度之后一页加载3页
      .then(res => {
        for (let item = 0; item < res.data.data.length; item++) {
          const name_cn = res.data.data[item].subject.name_cn
          name_cn === '' ? userProfile.addFavorList(res.data.data[item].subject.name) : userProfile.addFavorList(name_cn)
        }
      })
      .catch(err => {
        eleNotice('error','收藏请求出现错误~\n' + err.response.data.description)
      })
  }
}
// 通知显示函数
function eleNotice(type,msg){
  switch (type) {
    case 'success':
      ElNotification({
            message: msg,
            type: 'success',
            duration: 2000
          }
      )
      break
    case 'warning':
      ElMessage({
        message: msg,
        type: 'warning',
        duration: 2000,
      })
      break
    case 'error':
      ElNotification({
        title: 'ERROR',
        message: msg,
        type: 'error',
        duration: 2000
      })
      break
    default:
      ElNotification({
        title: 'ERROR',
        message: 'please input correct notice type ,it`s a string',
        type: 'error',
        duration: 2000
      })
  }
}
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
