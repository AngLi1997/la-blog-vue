import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },{
      path: '/about',
      name: 'about',
      component: AboutView,
    },{
      path: '/editor',
      name: 'editor',
      component: MarkdownEditor,
    },{
      path: '/article',
      name: 'article',
      component: ArticleDetail,
    }
  ],
})

export default router
