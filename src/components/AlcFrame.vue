<template>
  <el-main>
    <alc-frame-alpha></alc-frame-alpha>
    <el-divider></el-divider>
    <alc-frame-beta></alc-frame-beta>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AlcFrameAlpha from "./AlcFrameAlpha.vue";
import AlcFrameBeta from "./AlcFrameBeta.vue";

export default defineComponent({
  name: "AlcFrame",
  components: {
    AlcFrameAlpha,
    AlcFrameBeta,
  },
});
</script>

<style scoped>
.el-main {
  background: whitesmoke;
}
</style>
