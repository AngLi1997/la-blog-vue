<template>
  <div v-for="item in list">
    <ArticleDetail :content="item" class="article-detail"/>
  </div>
</template>
<script setup>
import laAxios from '@/components/LaAxios';
import { onMounted, ref } from 'vue';
import ArticleDetail from './ArticleDetail.vue';
const list = ref([]);
onMounted(() => {
  laAxios.post('/api/article/page', {
    page_num: 1,
    page_size: 10,
    category_name: "",
    tag_name: ""
  }).then(res => {
    list.value = res.data.data.list;
  })
})
</script>
<style scoped>
.article-detail {
  margin-bottom: 80px;
}
</style>
