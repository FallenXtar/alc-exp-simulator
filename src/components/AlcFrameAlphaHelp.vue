<template>
  <el-dialog title="使用说明" v-model="showHelp" width="30%" destroy-on-close>
    <ol>
      <li>输入参数</li>
      <li>点击[更新参数]</li>
      <li>点击[初始化模型]</li>
      <li>运行模型</li>
      <li>若要更改参数，回到步骤 1</li>
    </ol>
    <a
      target="_blank"
      href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=-pe_hoqfjITQnZA"
    >
      <el-button icon="el-icon-message" type="warning"> 还不明白 </el-button>
    </a>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AlcFrameAlphaHelp",
  props: ["show"],
  data() {
    return {
      showHelp: this.show,
    };
  },
});
</script>

<style scoped></style>
