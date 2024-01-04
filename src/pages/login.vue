<template>
  <el-card class="box-card"  >
    <!--折叠面板-->
    <el-collapse v-model="activeNames" accordion @change="handleCollapseChange">
      <div>
        <el-collapse-item title="使用账号密码登陆" name="1">
          <!--条目表单-->
          <el-form
              ref="DefaultLonginRef"
              :label-position="labelPosition"
              label-width="120px"
              :model="DefaultForm"
          >
              <el-input v-model="DefaultForm.username"
                        placeholder="请输入用户名">
                <template #prefix>
                  <el-icon :size="20"> <Search /> </el-icon> <!--图标-->
                </template>
              </el-input>
          </el-form>
          <el-form  prop="password">
            <el-input v-model="DefaultForm.password"
                      type="password"
                      placeholder="Please input password"
                      show-password/>
          </el-form>
        </el-collapse-item>
      </div>

      <div>
        <el-collapse-item title=" 使用Bangumi账号登陆 " name="2">
          <!--用户表单-->
          <el-form
              ref="BangumiLonginRef"
              :label-position="labelPosition"
              :rules="rules"
              label-width="120px"
              :model="BangumiForm"
          >
            <el-form-item label=" " prop="username">
              <el-input v-model="BangumiForm.username"
                        placeholder="请输入用户名">
                <template #prefix>
                  <el-icon :size="20"> <UserFilled />  </el-icon> <!--图标-->
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </div>
    </el-collapse>

    <p></p>
    <!--不同面板激活，按钮实行不同函数-->
    <el-button type="primary" round @click="activeNames.indexOf('1')!==-1 ? LoginDefault() : LoginBangumi() ">登陆</el-button>
  </el-card>
</template>

<script lang="ts" setup >
import { BangumiLogin } from '../api/user' // login方法
import { reactive, ref } from 'vue'
// 引入Vue Router
import { useRouter } from 'vue-router'
// ele组件
import type { FormProps } from 'element-plus'
import {ElMessage, ElNotification} from 'element-plus'
import { UserFilled,Search } from '@element-plus/icons-vue'
// 引入store
import { useUserStore } from '../store/userProfile.js'

// 获取路由实例
const router = useRouter()
// 折叠面板
const activeNames = ref(['1'])
const handleCollapseChange = (activeNames) => {
  // console.log('激活的面板：', activeNames)
}
// 表单标签位置
const labelPosition = ref<FormProps['labelPosition']>('top')
// bangumi登陆的默认表单
const BangumiForm = reactive({
  // 默认输入violetmail
  username: 'violetmail'
})
// 默认登陆的默认表单
const DefaultForm = reactive({
  // 默认输入guest
  username: 'guest',
  password: '123456'
})

// 用户名规则验证器
const UserFormValidator = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input '))
  }
  callback()
}

const rules = {
  username: [
    {
      validator: UserFormValidator,
      message: '用户名还没有填写',
      trigger: 'blur'
    }
  ]
}
const BangumiLonginRef = ref()
// 实例用户仓库
const userProfile = useUserStore()
const LoginBangumi = () => {
  // 用户表单验证
  BangumiLonginRef.value.validate(async (valid) => {
    if (valid) {
      // 根据响应中的信息判断是否是 Bangumi 用户
      BangumiLogin(BangumiForm.username)
          .then(res => {
            // 设置用户信息
            userProfile.setUserInfo(res.data.username, res.data.nickname, res.data.avatar.large, res.data.sign)
            // 显示登陆通知
            eleNotice('success','欢迎，' + res.data.nickname + '!')
            // 如果是 Bangumi 用户，跳转到主页
            router.push('/')
          })
          .catch(err => {
            eleNotice('error',err.response.data.description)
          })
    }
  })
}
// 默认登陆方式
const LoginDefault = () => {
  eleNotice('warning','coming soon')
  // TODO
}

// 通知显示函数
function eleNotice(type,msg){
  switch (type) {
    case 'success':
      ElNotification({
            message: msg,
            type: 'success',
            duration: 2000 
          })
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
</style>
