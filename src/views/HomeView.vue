<template>
  <div class="home-root">
    <!-- 背景 WebGL -->
    <WebGLBackground />

    <!-- 内容层 -->
    <div class="home-shell">
      <!-- 全站导航 -->
      <MainNav transparent />

      <!-- 中部主区域（现在主要由 WebGL 主导） -->
      <main class="main">
        <!-- 可以按需加一些描述文案，这里空出给 WebGL 背景 -->
      </main>

      <!-- 底部 RAYBO STUDIO 大字 + Footer -->
      <SiteFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import WebGLBackground from "@/components/WebGLBackground.vue";
import MainNav from "@/components/MainNav.vue";
import SiteFooter from "@/components/SiteFooter.vue";
</script>

<style scoped>
.home-root {
  position: relative;
  height: 100vh;
  background-color: transparent;
  color: #000000;
  font-family:
    "Suisse Intl",
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 12px;
  overflow: hidden;
}

/* WebGLBackground 是绝对定位填满屏幕，home-shell 作为内容层 */
.home-shell {
  position: relative;
  z-index: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}

/* 首页 footer 透明背景，让 WebGL 透出 */
.home-root :deep(.footer) {
  background-color: transparent;
}
</style>
