<template>
    <div>
        <div>
            <p v-if="article['title']" class="article-title">
                {{ article['title'] }}
            </p>
            <p v-if="article['sub_title']" class="article-sub-title">
                {{ article['sub_title'] }}
            </p>
            <p v-if="article['created_at']" class="article-time">
                {{ article['created_at'] }}
            </p>
            <div v-if="article['category_names']?.length > 0" class="article-categories-group">
                <span class="article-categories" v-for="c in article['category_names']" @click="() => router.push({path: '/',query: {category: c}})">
                    {{ c }}
                </span>
            </div>
            <div v-if="article['tag_names']?.length > 0" class="article-tags-group">
                <span class="article-tags" v-for="t in article['tag_names']" @click="() => router.push({path: '/',query: {tag: t}})">
                    {{ t }}
                </span>
            </div>
            <div class="preview">
                <MdPreview v-model="article['content']"  auto-fold-threshold="1000"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import laAxios from '@/components/LaAxios';
import { MdEditor, MdPreview } from 'md-editor-v3';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const article = ref({});
const props = defineProps({
    content: {
        typeof: Object
    }
});
onMounted(() => {
    if (props.content) {
        article.value = props.content;
        return;
    }
    laAxios.get('/api/article/get_by_id', {
        params: {
            id: route.query['id']
        }
    }).then(res => {
        article.value = res.data.data;
    })
});
</script>
<style scoped>
.article-title {
    font-size: 24px;
    color: #0055BB;
    margin-bottom: 10px;
}

.article-sub-title {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: lighter;
}

.article-time {
    font-size: .875em;
    font-weight: bolder;
    margin-bottom: 10px;
}

.article-categories, .article-tags {
    display: inline-block;
    font-size: 12px;
    margin-right: 10px;
    cursor: pointer;
}
.article-categories:hover, .article-tags:hover {
    text-decoration: underline;
}

.article-categories {
    color: #0055BB;
}

.article-tags {
    color: #8440F1;
}

.article-categories-group {
    margin-bottom: 10px;
}
</style>