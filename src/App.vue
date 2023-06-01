
<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
 export default {
    name: "App",
    data() {
          //这里存放数据",
          return {
              
          };
    },
  }
</script>

<style lang="less">
html,body,h3{
  margin: 0;
  padding: 0;
}
</style>

