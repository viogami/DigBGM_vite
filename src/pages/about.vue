<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})
const count = ref(0)
</script>

<template>
  <div class="about-container">
    <h1>{{ title }}</h1>

    <p>
      欢迎来到DigBgm--一个Bangumi数据检索工具！这个网站使用 Bangumi 的 API 实现数据检索。
    </p>

    <p>
      前端使用 Vite 和 Element Plus 进行构建，让你在使用该工具的同时享受良好的用户体验。
    </p>

    <p>
      目前正在严峻开发中，兴趣项目<s>（精力有限）</s>
    </p>

    <p>
      你可以访问它的 GitHub 仓库地址：<a href="https://github.com/viogami/vite_DigBgm" target="_blank">vite_DigBgm</a>
    </p>

    <div class="card">
      <button type="button" @click="count++">功德 {{ count }}</button>
      <p>
        如果你觉得无聊，可以加加功德
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '关于我们'
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.about-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  color: #333;
}

p {
  margin-bottom: 10px;
}

a {
  color: #007BFF;
  text-decoration: none;
}

.card {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

button {
  background-color: #28a745;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
