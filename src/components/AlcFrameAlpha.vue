<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>模型参数设置</span>
        <el-button
          class="button"
          type="text"
          icon="el-icon-question"
          @click="helpVisible = true"
        >
          使用帮助
        </el-button>
      </div>
    </template>
  </el-card>
  <el-dialog
    title="使用说明"
    v-model="helpVisible"
    width="30%"
    destroy-on-close
  >
    <ol>
      <li>输入参数</li>
      <li>点击[更新参数]</li>
      <li>点击[初始化模型]</li>
      <li>运行模型</li>
    </ol>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AlcFrameAlpha",
  data(): Record<string, unknown> {
    return {
      helpVisible: false,
    };
  },
});
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
