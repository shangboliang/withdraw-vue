<template>
    <div>
      <el-container>
        <el-aside width="200px">
          <CommonAside />
        </el-aside>
        <el-container>
          <el-header><MyComponentHeader/></el-header>
          <el-main><router-view></router-view></el-main>
          <el-footer style="height: 30px;"><MyComponentFooter/></el-footer>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
  import CommonAside from "@/components/CommonAside";
  import MyComponentHeader from "./MyComponentHeader";
  import MyComponentFooter from "./MyComponentFooter.vue";

  export default {
    name: "MyComponentMain",
    data() {
          //这里存放数据",
          return {
              
          };
    },
    components:{
      CommonAside,
      MyComponentHeader,
      MyComponentFooter
    }
  }
  </script>
  

  <style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 20px;
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
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
