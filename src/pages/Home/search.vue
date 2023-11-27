<template>
  <el-card class="box-card"  >
    <!--折叠面板-->
    <el-collapse v-model="activeNames" accordion @change="handleCollapseChange">
      <div>
      <el-collapse-item title=" 条目" name="1">
     <!--条目表单-->
     <el-form
      ref="SubjectFormRef"
      :label-position="labelPosition"
      label-width="120px"
      :model="UserForm"
      style="max-width: 440px"
    >
     <el-form-item label=" " prop="subject">
        <el-input v-model="SubjectForm.keywords"
         placeholder="请输入查询条目">
         <template #prefix>
          <el-icon :size="20"> <Search /> </el-icon> <!--图标-->
         </template>
        </el-input>
      </el-form-item>
      </el-form>
      </el-collapse-item>
      </div>

      <div>
      <el-collapse-item title=" 用户" name="2">
    <!--用户表单-->
      <el-form
      ref="UserFormRef"
      :label-position="labelPosition"
      :rules="rules"
      label-width="120px"
      :model="UserForm"
      style="max-width: 440px"
    >
      <el-form-item label=" " prop="username">
        <el-input v-model="UserForm.username"
         placeholder="请输入用户名">
         <template #prefix>
          <el-icon :size="20"> <UserFilled />  </el-icon> <!--图标-->
         </template>
        </el-input>
      </el-form-item>
<!-- 密码输入（api没有，无用）
      <el-form-item label="你的密码" prop="password">
        <el-input v-model="UserForm.password"
        type="password"
        placeholder="Please input password"
        show-password/>
      </el-form-item>
-->
    </el-form>
    </el-collapse-item>
    </div>
    </el-collapse>
    
  <p></p>
<!--不同面板激活，按钮实行不同函数-->
<el-button type="primary" round @click="activeNames.indexOf('1')!==-1 ? SubMit_subject() : SubMit_user()">查询</el-button>
</el-card>

</template>

<script lang="ts" setup >
import { login, userFavorite} from '../../api/user' // login方法 userFavorite方法
import { SearchSubject } from '../../api/subject' // Search方法
import { reactive, ref } from 'vue'
// 引入Vue Router
import { useRouter } from 'vue-router'
// ele组件
import type { FormProps } from 'element-plus'
import { ElNotification } from 'element-plus'
import { UserFilled } from "@element-plus/icons-vue";
//引入store
import { useUserStore } from '../../store/userProfile.js'

// 获取路由实例
const router = useRouter()
// 折叠面板
const activeNames = ref(['1'])
const handleCollapseChange = (activeNames) => {
  // console.log('激活的面板：', activeNames)
}
// 表单标签位置
const labelPosition = ref<FormProps['labelPosition']>('top')

// 条目表单
const SubjectForm = reactive({
  keywords: '',
  type: '2',
  responseGroup: 'small',
  start: '',
  max_result: ''
})

// 用户表单
const UserForm = reactive({
  username: ''
})

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
// 条目查询按钮
const SubjectFormRef = ref()
const SubMit_subject = () => {
// 条目查询不为空
  if (SubjectForm.keywords !== '') {
    SearchSubject(SubjectForm.keywords)
      .then(res_sub => { // 注，请求的返回值res
        ElNotification({
          message: '成功查询到' + res_sub.data.results + '个条目！',
          type: 'success',
          duration: 2000 // 持续两秒
        })
      })
      .catch(err => {
        ElNotification({
          title: 'ERROR',
          message: err.response.data.error,
          type: 'error',
          duration: 2000 // 持续两秒
        })
      })
  }
}
// 用户查询按钮
const UserFormRef = ref()
//实例用户仓库
const userProfile = useUserStore()
const SubMit_user = () => {
  // 用户表单验证
  UserFormRef.value.validate(async (valid) => {
    if (valid) {
      // 根据响应中的信息判断是否是 Bangumi 用户
      login(UserForm.username)
        .then(res => { 
          // 如果是 Bangumi 用户，跳转到 Bangumi 用户页面
          router.push({
            name: 'UserPage',
            params: { username: UserForm.username },
          })
          //设置用户信息
          userProfile.setUserInfo(res.data.username,res.data.nickname,res.data.avatar.large,res.data.sign)
          //显示登陆通知
          ElNotification({
            message: '欢迎，' + res.data.nickname + '!', // 获取昵称
            type: 'success',
            duration: 2000 // 持续两秒
          }
          )
        })
        .catch(err => {
          ElNotification({
            title: 'ERROR',
            message: err.response.data.description,
            type: 'error',
            duration: 2000 // 持续两秒
          })
        })
    }
  })
}

</script>

<style scoped>
.box-card {
  max-height: 500px;
  max-width: 670px;
  min-width: 200px;
  text-align: center;
}
</style>