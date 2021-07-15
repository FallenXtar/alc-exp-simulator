<template>
  <el-footer>
    <el-row
      ><el-alert
        title="建议使用IE6以上系列浏览器、1024*768以上分辨率访问本网站"
        type="success"
        :closable="false"
        center
      >
      </el-alert>
    </el-row>
    <el-row>
      ALC Simulator 由
      <el-link
        type="primary"
        target="_blank"
        href="https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=-pe_hoqfjITQnZA"
      >
        XTARZ
      </el-link>
      使用
      <el-link type="primary" target="_blank" href="https://v3.cn.vuejs.org/"
        >Vue3</el-link
      >+<el-link
        type="primary"
        target="_blank"
        href="https://element-plus.gitee.io/"
        >Element Plus</el-link
      >
      构建
      <el-divider direction="vertical"></el-divider>灵感来自于 YeFeng Miao
    </el-row>

    <el-row>
      项目源代码托管在
      <el-link
        type="primary"
        target="_blank"
        href="https://github.com/FallenXtar/alc-exp-simulator"
        >Github</el-link
      >
      和
      <el-link
        type="primary"
        target="_blank"
        href="https://gitee.com/xtar/alc-exp-simulator"
        >Gitee</el-link
      >.
    </el-row>
  </el-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AlcFooter",
});
</script>

<style scoped>
.el-footer {
  margin-top: 20px;
  color: #606266;
}
</style>
