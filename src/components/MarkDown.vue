<template>
  <div class="container0">
    <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" v-html="parse()">
    </el-col>
    <el-col :xs="0" :sm="0" :md="6" :lg="6" :xl="6" v-if="props.toc" >
<!-- 右侧文章导航 -->
    <div  class="container1">
      <nav class="container2">
<!-- 通过Vue.js的v-for指令，遍历tocList.c数组中的每个元素，item表示数组中的每个项目，i表示当前项目的索引。-->
        <ul v-for="(item, i) in tocList.c">
<!-- text-emerald-grey类表示在悬停时文本颜色变为灰色。-->
<!-- 动态绑定类名，如果tocIndex等于当前项的索引i，则添加text-emerald-black类，表示高亮当前选定的目录项。-->
          <li>
            <a class="text-emerald-grey" :class="{ 'text-emerald-pink': tocIndex === i }" @click="tocIndex = i"
               :href=getHref(item.n)> {{ item.n }} </a>
            <!-- 二级标题 -->
            <ul v-for="(t, j) in item.c">
              <li><a class="text-emerald-grey" :class="{ 'text-emerald-pink': tocIndex === (i + 1) * 1000 + j }"
                     @click="tocIndex = (i + 1) * 1000 + j" :href=getHref(t.n)> {{ t.n }}
              </a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
    </el-col>
  </div>
</template>

<script setup>
import MarkDownIt from 'markdown-it';
import prism from 'prismjs';
import MarkDownItAnchor from 'markdown-it-anchor';
import MarkDownDoneRight from 'markdown-it-toc-done-right';
import uslug from 'uslug';
import { ref } from 'vue';

const props = defineProps({
  data: { type: String },
  toc: { type: Boolean, default: false },
})

const tocList = ref([]);
const tocIndex = ref(-1);

const uslugify = (s) => {
  return uslug(s);
}

const md = MarkDownIt({
  breaks: true,
  html: true,
  linkify: true,
  typographer: true,
  highlight: (code, lang) => {
    if (lang === 'golang') {
      lang = 'go'
    }

    if (prism.languages[lang]) {
      return prism.highlight(code, prism.languages[lang], lang);
    } else {
      return code;
    }
  }
}).use(MarkDownItAnchor, {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '#',
  slugify: uslugify,
}).use(MarkDownDoneRight, {
  slugify: uslugify,
  listType: 'ul',
  callback: function (html, ast) {
    if (tocList.value.length === 0) {
      tocList.value = ast
    }
  }
})

const parse = () => {
  if (!props.data) {
    return ''
  }
  return md.render(props.data)
}

const getHref = (target) => {
  return '#' + uslug(target)
}

</script>

<style scoped>
.container0{
  display: flex;
  flex-direction: row;
  margin-left: 12px;
}
.container1{
  position: fixed;
  top: 100px;
  bottom: 0;
  right: 20px;
}
.container2{
  font-weight: 500;
  line-height: 1.5; 
  border-style: solid;
  border-width: 0 0 0 4px;
  padding-left: 1rem;
  margin-right: 2rem; 
}

.text-emerald-grey{
  color: grey; 
  :hover {
    color: #10B981;
  }
}

.text-emerald-pink{
  color: pink;
  :hover {
    color: #10B981;
  }
}
</style>
