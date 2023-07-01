
<template>
  <div id="app">
    <el-container>
      <el-header>
        <nav>
          <router-link to="/">Home</router-link> |
          <!-- <router-link to="/demo2">About1</router-link> | -->
          <router-link to="/demo3">欧易提现</router-link> |
          <!-- <router-link to="/zk_view">zk_view</router-link> -->
        </nav>
      </el-header>

        <el-main><router-view></router-view></el-main>
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件将渲染在这里 -->

    </el-container>
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
<style scoped lang="scss">

</style>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }
     .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  /* .el-container { padding: 0; margin: 0; height: 100vh; } */
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
