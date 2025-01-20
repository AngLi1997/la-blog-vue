<script setup lang="ts">
import laAxios from '@/components/LaAxios';
import { onMounted, provide, ref } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
const top10 = ref([])
const tags = ref([])
const categories = ref([])
onMounted(() => {
    flushData();
})
const router = useRouter()
const route = useRoute()
const flushData = () => {
    laAxios.get('/api/article/list_top_10').then(res => {
        top10.value = res.data.data;
    })
    laAxios.get('/api/tag/list_all').then(res => {
        tags.value = res.data.data;
    })
    laAxios.get('/api/category/list_all').then(res => {
        categories.value = res.data.data;
    })
}
provide('flushData', flushData)
</script>
<template>
    <div class="container">
        <div class="left">
            <div class="logo">
                LIANG
            </div>
            <div class="search">

            </div>
            <ul class="menu">
                <li>搜索</li>
                <input type="text" placeholder="搜索" />
                <li @click="() => router.push({path: '/about'})">关于我</li>
                <li>最新</li>
                <ul class="top_10">
                    <li v-for="item in top10" @click="() => {
                        router.push({
                            path: '/article',
                            query: {
                                id: item['ID']
                            }
                        })
                    }">
                        {{ "[" + item['title'] + "]" }}
                    </li>
                </ul>
            </ul>
        </div>
        <div class="middle">
            <RouterView :key="route.fullPath" />
        </div>
        <div class="right">
            <div class="categories">
                <div class="title">
                    分类
                </div>
                <ul>
                    <li v-for="item in categories">
                        {{ item['name'] }}
                    </li>
                </ul>
            </div>
            <div class="categories">
                <div class="title">
                    标签
                </div>
                <ul>
                    <li v-for="item in tags">
                        {{ item['name'] }}
                    </li>
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

.middle::-webkit-scrollbar,
.left::-webkit-scrollbar,
.right::-webkit-scrollbar {
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

.top_10 {
    list-style: none;
}
</style>