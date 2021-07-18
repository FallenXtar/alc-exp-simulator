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
          使用说明
        </el-button>
      </div>
    </template>
    <div>{{ test }}</div>
    <alc-frame-alpha-help v-model="helpVisible"></alc-frame-alpha-help>
  </el-card>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
import AlcFrameAlphaHelp from "./AlcFrameAlphaHelp.vue";

export default defineComponent({
  name: "AlcFrameAlpha",
  components: {
    AlcFrameAlphaHelp,
  },
  data(): Record<string, unknown> {
    return {
      helpVisible: false,
    };
  },
  computed: {
    test() {
      return store.state.sandbox;
    },
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
