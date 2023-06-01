<template>
    <div>
        <el-menu background-color="#545c64" text-color="#ffffff"
                 active-text-color="#ffd04b"  class="el-menu-vertical-demo" router>
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/demo2">一级菜单2</el-menu-item>
            <el-menu-item index="/demo3">一级菜单3</el-menu-item>
        </el-menu>
    </div>
</template>
 
<script>
    export default {
        name: "CommonAside"
    }
</script>
 
<style scoped>
 .el-menu-vertical-demo{
        height: 100%;
    }

</style>