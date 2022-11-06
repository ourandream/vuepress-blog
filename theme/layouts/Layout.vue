<template>
  <div>
<Navbar class="navbar"></Navbar>
  <main>
    <div id="content">
      <div id="content_head">
        <h1>
          {{ pageData.title }}
        </h1>
        <div id="content_info">
          <div class="content_info_item">

            <Icon icon="clarity:pencil-solid" />
            <span>
              {{ pageData.frontmatter.author||themeData.author }}
            </span>
          </div>

          <div class="content_info_item">

            <Icon icon="bxs:time" />
            <time>
              {{ (new Date(date as string)).toLocaleDateString('en-CA') }}
            </time>
          </div>
        </div>
      </div>
      <div id="content_body">
        <Content />
        <div id="comment"></div>
      </div>

    </div>

    <Sidebar v-if="!isMobile" :headers="pageData.headers" class="sidebar" />
  </main>

  </div>
  </template>



<style lang="scss">
.header-anchor {
  color: rgba($color: #000000, $alpha: 0) !important;
  float: left;
  margin-left: -0.7em;

  &:hover {
    color: $color-default !important;
  }
}

#content {

  img {
    width: 100%;
  }
  #comment{
    img{
      width: auto;
    }
  }

  .vimg{
    width: auto;
  }
  

  a {
    color: $color-default;
    text-decoration: none;
    overflow-wrap: break-word;

    &:hover {
      text-decoration: underline;
    }
  }

  p,table,ol,ul{
    code {
      background-color: #f9f2f4;
      color:#c52950;
      font-size: large;
    }
  }
}

table {
  border-collapse: collapse;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 5px;

  thead {
    background-color: $color-default;
    color: white;
  }

  tbody {
    tr {
      border-bottom: 1px solid #dddddd;

      &:nth-of-type(even) {
        background-color: #f3f3f3;
      }

      &:last-of-type {
        border-bottom: 2px solid $color-default;
      }

    }

    td {
      padding-right: 2em;
    }
  }

}


.sidebar {

  margin-top: $navbar-height;

  position: fixed;
  top: 0;
  right: 5%;
  width: 30vh;
}

#content {
  margin-top: $navbar-height;
  padding: 0 3%;
  border-left: 1px solid $border-color;
  border-right: 1px solid $border-color;
  width: 70%;
  @media screen and (max-width:1000px){
    border: none; 
    width: 100vw;
    padding: 0 15vw;
    box-sizing: border-box;
  }


  #content_head {
    border-bottom: 1px solid $border-color;
  }

  h1 {
    margin-top: 0;
    padding-top: 0.67em;
  }
}




#content_info {
  display: flex;
}

.content_info_item {
  display: flex;
  align-items: center;
  margin-right: 10px;

  time {
    padding-left: 3px;
  }
}

.navbar {
  position: fixed;
  top: 0;
  width: 100vw;
}

#comment{
  margin-top: 5vh;
  font-size: 15px;
  .vwrap{
    border-color: black;
  }
}


</style>

<script lang="ts" setup>
import { usePageData } from '@vuepress/client';
import { Icon } from '@iconify/vue';
import { useThemeData } from '../plugins/themeData/themeData-client'
import Navbar from './components/Navbar.vue';
import type { myThemeData, NavbarItem } from '../types'
import '../css/prism.css'
import Sidebar from './components/Sidebar.vue';
import { GitPluginPageData } from '@vuepress/plugin-git';
import { computed, onMounted, ref } from 'vue';

let pageData = usePageData<GitPluginPageData>()
pageData.value.headers
const themeData = useThemeData()
let date = pageData.value.frontmatter.date || pageData.value.git.createdTime
onMounted(async ()=>{
  let Valine=(await import('valine')).default
  new Valine({
  el:'#comment',
  appId:themeData.comment.appID,
  appKey:themeData.comment.appKey
})})


let isMobile = ref(false);
onMounted(()=>{
    isMobile.value=window.innerWidth<=1000
})

</script>