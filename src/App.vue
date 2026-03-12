<script setup></script>

<template>
  <router-view />
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

body {
  background-color: #ffffff;
  color: #000000;
  font-family: "Suisse Intl", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  font-size: 12px;
  line-height: normal;
}

#app {
  min-height: 100vh;
}

/* Fallback for when Suisse Intl webfont is added locally:
   - 将你的 Suisse Intl woff2/woff 文件放到 src/assets/fonts 下，
   - 然后在这里取消注释并修改 src 路径 */
/*
@font-face {
  font-family: "Suisse Intl";
  src: url("/src/assets/fonts/SuisseIntl-Regular.woff2") format("woff2"),
       url("/src/assets/fonts/SuisseIntl-Regular.woff") format("woff");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}
*/
</style>
