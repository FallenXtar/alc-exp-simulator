<template>
  <el-footer>
    <div>
      <el-alert
        title="为保证功能正常，请使用现代化的浏览器，并以1024*768以上分辨率访问本网站"
        type="success"
        :closable="false"
        center
      >
      </el-alert>
    </div>
    <el-divider></el-divider>
    <el-row>
      <div>
        <span>
          ALC Simulator 由
          <el-popover trigger="hover" placement="top" width="180px">
            <template #reference>
              <el-link
                type="primary"
                target="_blank"
                href="https://space.bilibili.com/39091086/"
              >
                @XTARZ
              </el-link>
            </template>
            <el-row>
              <a
                target="_blank"
                href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=-pe_hoqfjITQnZA"
              >
                <el-button icon="el-icon-message"> 联系作者 </el-button>
              </a>
            </el-row>
          </el-popover>

          使用&nbsp;

          <el-link
            type="primary"
            target="_blank"
            href="https://v3.cn.vuejs.org/"
            >Vue3</el-link
          >&nbsp;+&nbsp;<el-link
            type="primary"
            target="_blank"
            href="https://element-plus.gitee.io/"
            >Element Plus</el-link
          >
          &nbsp;构建
        </span>

        <el-divider direction="vertical"></el-divider>
        <span>
          灵感来自于
          <el-link
            type="primary"
            target="_blank"
            href="https://space.bilibili.com/9174385/"
          >
            @看到什么你
          </el-link>
        </span>
      </div>
    </el-row>
    <el-divider>
      当前版本：{{ version }}
      <el-divider direction="vertical"></el-divider>
      <el-link
        type="primary"
        target="_blank"
        href="https://github.com/FallenXtar/alc-exp-simulator"
        >Github</el-link
      >
      <el-divider direction="vertical"> </el-divider>
      <el-link
        type="primary"
        target="_blank"
        href="https://gitee.com/xtar/alc-exp-simulator"
        >Gitee</el-link
      >
    </el-divider>
  </el-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import pkg from "../../package.json";

export default defineComponent({
  name: "AlcFooter",
  data() {
    return {
      version: pkg.version,
    };
  },
});
</script>

<style scoped>
.el-row {
  justify-content: space-around;
}
.el-footer {
  margin-top: 20px;
  color: #606266;
}
.el-link {
  font-size: 16px;
  vertical-align: 0;
}
</style>
