<script setup>

</script>

<template>
  <el-footer class="footer">
    <p>© 2023 DigBGM by <a href="https://github.com/viogami">viogami</a></p>
  </el-footer>
</template>

<style scoped>
/* 页脚紧贴页面下沿 */
.footer {
  bottom: 0;
  margin-block-end: 0;
  width: 100%;
  background: pink;
  text-align: center;
  line-height: 60px;
}
.footer a {
  text-decoration: none; /* 取消链接的下划线 */
  color: #333; /* 设置链接颜色 */
}

.footer a:hover {
  color: #555; /* 鼠标悬停时改变链接颜色 */
}
</style>