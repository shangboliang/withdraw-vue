<template>
        <header>
        <div>
            <h1 style="margin-top: 0px;color: #425049;font-size:30px; ">欢迎</h1>
        </div>
            <div class="demo-basic--circle">
                <div class="block">
                    <el-avatar :size="60" :src="avatar" :class="['avatar-info']">
                    </el-avatar>
                </div>
            </div>
        </header>
</template>

<script>
    export default {
        name: "MyComponentHeader",
        data() {
            return {
                avatar: 'https://tva1.sinaimg.cn/large/9150e4e5gy1g4pwregvaij208c08cjrl.jpg'
            }
        }
    }
</script>


<style scoped>
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
    }
    /*设定头像图片样式*/
    .avatar-info {
        margin-top: 5px;
        margin-right: 40px;
        cursor: pointer;
    }
</style>


