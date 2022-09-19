import { defineClientConfig } from '@vuepress/client'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'
import HomePage from './layouts/HomePage.vue'
import Archive from './layouts/Archive.vue'
import Categories from './layouts/Categories.vue'
import About from './layouts/About.vue'

export default defineClientConfig({
  setup() {
  },
  layouts: {
    Layout,
    NotFound,
    HomePage,
    Archive,
    Categories,
    About 
  },
})