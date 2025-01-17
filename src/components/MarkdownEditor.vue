<template>
  <div class="form">
    <LaTextInput type="title" :placeholder="'文章标题'" />
    <LaTextInput type="sub-title" :placeholder="'副标题'"/>
    <LaTextInput type="sub-title" :placeholder="'分类'"/>
    <LaTextInput type="sub-title" :placeholder="'标签'"/>
    <MdEditor v-model="text" placeholder="输入正文" class="editor" />
    <div class="btn-group">
      <LaButton>清空</LaButton>
      <LaButton>保存</LaButton>
      <LaButton type="primary">发布</LaButton>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import LaButton from './LaButton.vue';
import LaTextInput from './LaTextInput.vue';
const text = ref('');
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
