<template>
  <div class="form">
    <LaTextInput v-model="formData['title']" type="title" :placeholder="'文章标题'" />
    <LaTextInput v-model="formData['sub_title']" type="sub-title" :placeholder="'副标题'" />
    <LaTextInput v-model="formData['category_names']" type="sub-title" :placeholder="'分类'" />
    <LaTextInput v-model="formData['tag_names']" type="sub-title" :placeholder="'标签'" />
    <MdEditor v-model="formData['content']" placeholder="输入正文" class="editor" @on-upload-img="uploadImage" :auto-fold-threshold="1000"/>
    <div class="btn-group">
      <LaButton>清空</LaButton>
      <LaButton @click="saveArticle">保存</LaButton>
      <LaButton type="primary">发布</LaButton>
    </div>
  </div>
</template>
<script setup>
import { inject, ref } from 'vue'
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import LaButton from './LaButton.vue';
import LaTextInput from './LaTextInput.vue';
import laAxios from './LaAxios';
const formData = ref({});
const flushData = inject('flushData');
const saveArticle = () => {
  if (!formData.value['title']) {
    alert('请输入标题');
    return;
  }
  if (!formData.value['content']) {
    alert('请输入正文');
    return;
  }
  let param = {...formData.value}
  param['category_names'] = expList(param['category_names'])
  param['tag_names'] = expList(param['tag_names'])
  laAxios.post('/api/article/save', param).then(res => {
    flushData();
  })  
}
const expList = (str) => {
  if(!str){
    return [];
  }
  // 替换中英文逗号为一个空格
  const cleanedStr = str.replace(/,|，/g, ' ');
  // 按空格分割字符串并去掉空值
  const list = cleanedStr.split(' ').filter(item => item.trim() !== '');
  console.log(list);
  return list;
}
const uploadImage = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append('file', file);
        laAxios
          .post('/api/file/upload', form, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );
  callback(res.map((item) => item.data.data))
}

</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.editor {
  height: calc(100vh - 270px)
}
</style>
