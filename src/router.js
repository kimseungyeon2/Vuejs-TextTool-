import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import textTool from '@/components/text_tool.vue'
import upload from '@/components/upload.vue'
import folder from '@/components/folder.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path:'/upload',
      name: 'upload',
      component: upload,
    },
    {
      path:'/textTool',
      name:'textTool',
      component: textTool,
    },
    {
      path:'/folder',
      name:'folder',
      component:folder,
    }

  ]
})
