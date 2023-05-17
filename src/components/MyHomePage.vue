<template>
  <div>
    <el-container>
      <el-header><MyComponentHeader/></el-header>
      <el-container>
        <el-aside width="200px"><MyComponentAside/></el-aside>
        <el-main><MyComponentMain/></el-main>
                <!-- <el-main><router-view></router-view><el-main>  -->

      </el-container>
      <el-footer><MyComponentFooter/></el-footer>
    </el-container>
  </div>
</template>


<script>
import MyComponentHeader from "./MyComponentHeader";
import MyComponentAside from "./MyComponentAside";
import MyComponentMain from "./MyComponentMain";
import MyComponentFooter from "./MyComponentFooter";


export default {
  name: 'MyHomePage',
  props: {
    msg: String
  },
  components: {
    MyComponentHeader,MyComponentAside,MyComponentMain,MyComponentFooter
    
  }
}
</script>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
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
