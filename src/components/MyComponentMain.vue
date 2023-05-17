<template>
    <div>        主页

         <!-- 子路由的写法(没有命名路由) -->
        <router-link to="/index/TibiMainBian">币安</router-link>
        <br/>
        <router-link to="/index/TibiMainOkx">okx</router-link>
        <router-view></router-view>
    </div>

</template>

<script>
    export default {
        name: "MyComponentMain"
    }
</script>

<style scoped>

</style>
