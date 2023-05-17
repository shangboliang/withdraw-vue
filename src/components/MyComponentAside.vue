<template>
       <el-menu background-color="#545c64" text-color="#ffffff"
                 active-text-color="#ffd04b" default-active="2"
                 @open="handleOpen"
                 @close="handleClose"
                 @select="handSelect">
            <!-- <el-submenu index="1">
                <template slot="title"><i class="el-icon-location"></i><span>一级菜单1</span></template>
                <el-submenu index="1-1">
                    <template slot="title"><i class="el-icon-location"></i><span>选项1</span></template>
                    <el-menu-item index="1-1-1">选项1-1</el-menu-item>
                    <el-menu-item index="1-1-2">选项1-2</el-menu-item>
                </el-submenu>
            </el-submenu> -->
            <el-menu-item index="/index/TibiMainBian" >一级菜单2</el-menu-item>
            <el-menu-item index="/index/TibiMainOkx">一级菜单3</el-menu-item>
        </el-menu>

</template>

<script>
    export default {
        name: "MyComponentAside",
        methods: {
            handleOpen(key, keyPath) {
                console.log("打开：",key, keyPath);
            },
            handleClose(key, keyPath) {
                 console.log("关闭：",key, keyPath);
            },
            handSelect(key, keyPath) {
                 console.log("选择：",key, keyPath);
                //  console.log(this.$router)
                // this.$router.replace({path: 'TibiMainBian'});
            }
    
        }

    }
</script>

<style scoped>

</style>
