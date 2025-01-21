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
                <span class="article-categories" v-for="c in article['category_names']">
                    {{ c }}
                </span>
            </div>
            <div v-if="article['tag_names']?.length > 0" class="article-tags-group">
                <span class="article-tags" v-for="t in article['tag_names']">
                    {{ t }}
                </span>
            </div>
            <MdPreview v-model="article['content']" />
        </div>
    </div>
</template>
<script setup>
import laAxios from '@/components/LaAxios';
import { MdEditor, MdPreview } from 'md-editor-v3';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
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
    font-size: 30px;
    color: #0055BB;
    margin-bottom: 15px;
    font-weight: bolder;
}

.article-sub-title {
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: lighter;
}

.article-time {
    font-size: 14px;
    font-weight: bolder;
    margin-bottom: 15px;
}
.article-categories-group {
    margin-bottom: 20px;
}
.article-categories {
    display: inline-block;
    font-size: 12px;
    color: #0055BB;
    margin-right: 10px;
}
.article-tags {
    display: inline-block;
    font-size: 14px;
    height: 20px;
    color: white;
    margin-right: 10px;
    background-color: #8440F1;
    border-radius: 10px;
    padding: 0px 10px;
}
</style>