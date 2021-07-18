<template>
  <el-collapse-transition>
    <el-card shadow="hover">
      <el-empty description="未初始化模型" v-show="showResult">
        <template #image>
          <img src="@/assets/bg.jpg" alt="ALC Logo" />
        </template>
      </el-empty>
    </el-card>
  </el-collapse-transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AlcFrameBeta",
  data(): Record<string, unknown> {
    return {
      showResult: true,
    };
  },
});
</script>

<style scoped></style>
