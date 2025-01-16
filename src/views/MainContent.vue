<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
    <div class="container">
        <div class="left">
            <div class="logo">
                LOGO
            </div>
            <div class="search">

            </div>
            <ul class="menu">
                <li>搜索</li>
                <li>关于我</li>
                <li>最新</li>
                <ul class="article-list">
                    <li>develop1</li>
                    <li>develop2</li>
                    <li>develop3</li>
                </ul>
            </ul>
            <!-- <RouterLink to="/">主页</RouterLink> -->
            <!-- <RouterLink to="/article">文章</RouterLink> -->
            <!-- <RouterLink to="/about">关于</RouterLink> -->
        </div>
        <div class="middle">
            <RouterView />
        </div>
        <div class="right">
            <div class="categories">
                <div class="title">
                    分类
                </div>
                <ul>
                    <li>后端开发</li>
                    <li>前端开发</li>
                    <li>数据库</li>
                    <li>操作系统</li>
                    <li>操作系统</li>
                </ul>
            </div>
            <div class="categories">
                <div class="title">
                    标签
                </div>
                <ul>
                    <li>Java</li>
                    <li>go</li>
                    <li>MySQL</li>
                    <li>Springboot</li>
                    <li>Windows</li>
                    <li>MacOS</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    display: flex;
    justify-content: center;
    /* 三列整体居中 */
    align-items: stretch;
    /* 子项高度一致 */
    width: 80%;
    margin: 0 auto;
    height: 100vh;
}

.logo {
    height: 2rem;
    font-size: 2rem;
    font-weight: bolder;
}

.left,
.right {
    width: 200px;
    padding: 1rem;
    overflow-y: auto;
    box-shadow: inset -1px 0 0 #ddd;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.middle {
    flex: 1;
    /* 中间列自适应宽度 */
    background-color: #fff;
    padding: 1rem;
    overflow-y: auto;
    /* 启用滚动 */
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.middle::-webkit-scrollbar, .left::-webkit-scrollbar, .right::-webkit-scrollbar {
    display: none;
}

.left {}

.menu {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    font-size: 0.75rem;
    font-weight: bolder;
}

.menu li {
    cursor: pointer;
    padding: 0.5rem 0;
}

.right {
    box-shadow: inset 1px 0 0 #ddd;
    /* 右边分隔视觉 */
}

.categories {
    font-size: 0.75rem;
    padding-bottom: 2rem;
}

.categories .title {
    font-weight: bolder;
    padding-bottom: 0.5rem;
}
.categories ul {
    list-style: none;
    padding: 0;
    color: #0055bb;
}
.categories ul li {
    padding: 0.25rem 0;
}
.article-list {
    list-style: none;
}
</style>