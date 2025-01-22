<template>
  <div>
    <div v-for="item in list">
      <ArticleDetail :content="item" class="article-detail" />
    </div>
  </div>
</template>
<script setup>
import laAxios from '@/components/LaAxios';
import { onMounted, ref } from 'vue';
import ArticleDetail from './ArticleDetail.vue';
import { useRoute } from 'vue-router';
const list = ref([]);
const route = useRoute();
onMounted(() => {
  flushList(route.query['category'], route.query['tag']);
})

const flushList = (category, tag) => {
  laAxios.post('/api/article/page', {
    page_num: 1,
    page_size: 10,
    category_name: category,
    tag_name: tag
  }).then(res => {
    list.value = res.data.data.list;
  })
}
</script>
<style scoped>
.article-detail {
  margin-bottom: 20px;
}
</style>
