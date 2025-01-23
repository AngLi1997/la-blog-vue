<template>
    <div class="container">
        <div class="left">
            <div class="logo" @click="() => router.push({ path: '/' })">
                LIANG
            </div>
            <div class="search">

            </div>
            <ul class="menu">
                <li>搜索</li>
                <input type="text" placeholder="搜索" />
                <li @click="() => router.push({ path: '/about' })">关于我</li>
                <li @click="() => router.push({ path: '/' })">最新</li>
                <ul class="top_10">
                    <li class="top_10_item" v-for="item in top10" @click="() => {
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
            <RouterView v-slot="{ Component, route }">
                <Transition mode="out-in">
                    <component :is="Component" :key="route.fullPath" />
                </Transition>
            </RouterView>
        </div>
        <div class="right">
            <div class="categories">
                <div class="title">
                    分类
                </div>
                <ul>
                    <li v-for="item in categories" @click="flushList(item['name'], undefined)">
                        {{ item['name'] + " (" + item['count'] + ")" }}
                    </li>
                </ul>
            </div>
            <div class="categories">
                <div class="title">
                    标签
                </div>
                <ul>
                    <li v-for="item in tags" @click="flushList(undefined, item['name'])">
                        {{ item['name'] + " (" + item['count'] + ")" }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import laAxios from '@/components/LaAxios';
import { onMounted, provide, ref } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router'
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

const flushList = (category, tag) => {
    router.push({
        path: '/',
        query: {
            category: category,
            tag: tag
        }
    })
}
provide('flushData', flushData)
</script>
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: stretch;
    width: 100%;
    margin: 0 auto;
    height: 100vh;
}

.logo {
    height: 2rem;
    font-size: 2rem;
    font-weight: bolder;
    cursor: pointer;
}

.left,
.right {
    width: 200px;
    padding: 1rem;
    overflow-y: auto;
    box-shadow: inset -1px 0 0 #ddd;
    transition: width 0.3s ease;
}

.middle {
    flex: 1;
    background-color: #fff;
    padding: 1rem;
    overflow-y: auto;
}

.menu {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    font-size: 1rem; /* 使用相对单位 */
    font-weight: bolder;
}

.menu li {
    cursor: pointer;
    padding: 0.5rem 0;
}

.right {
    box-shadow: inset 1px 0 0 #ddd;
}

.categories {
    font-size: 1rem; /* 使用相对单位 */
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
    cursor: pointer;
}

.top_10 {
    list-style: none;
}

.top_10_item:hover {
    text-decoration: underline;
}

.v-enter-active,
.v-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.8, 0.5, 1);
}

.v-enter-from,
.v-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

@media (max-width: 1200px) {
    .left,
    .right {
        width: 150px;
    }

    .left.collapsed,
    .right.collapsed {
        width: 30px; /* 调整折叠后的宽度 */
    }

    .middle {
        flex: 2;
    }
}

@media (max-width: 992px) {
    .left,
    .right {
        width: 120px;
    }

    .left.collapsed,
    .right.collapsed {
        width: 20px; /* 调整折叠后的宽度 */
    }

    .middle {
        flex: 3;
    }
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
        height: auto;
    }
    .left,
    .right {
        width: 100%;
        box-shadow: none;
    }
    .left.collapsed,
    .right.collapsed {
        width: 0; /* 完全折叠 */
    }
    .middle {
        flex: 1;
    }
    .toggle-button {
        right: 0; /* 调整按钮位置 */
    }
}
</style>