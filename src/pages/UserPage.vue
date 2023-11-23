  <template>
    <div>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 用户头像 -->
        <img :src="userAvatar" alt="User Avatar" class="avatar" />

        <!-- 用户名 -->
        <p>{{ username }}</p>
        <!-- 用户收藏信息 -->
        <div>
          <h3>收藏信息</h3>
          <ul>
            <li v-for="item in favoriteList" :key="item.id">{{ item.name }}</li>
          </ul>
        </div>
      </el-aside>

      <!-- 主体内容区 -->
      <el-main>
        <!-- 主体内容 -->
        <h1>用户登录后的页面</h1>
        <p>这里是用户的详细信息和其他内容。</p>
      </el-main>
    </div>
  </template>

<script>

export default {
  data () {
    return {
      username: this.$route.params.username,
      userAvatar: this.$route.query.userAvatar,
      favoriteList: [
        { id: 1, name: '收藏项1' },
        { id: 2, name: '收藏项2' },
        { id: 3, name: '收藏项3' }
      ]
    }
  }
}

</script>

  <style>
  /* 样式可根据需要进行修改 */
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  </style>
