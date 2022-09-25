<template>
    <div id="home">
        <Navbar :class="{navbar:isTop}" :active-index="isTop?undefined:0" />
        <div class="home-mask"></div>

        <div class="info">
            <div id="info-logo">

                <img src="./img/head.jpg" />
            </div>

            <div id="info-main">
                <h1>{{siteData.title}}</h1>
                {{siteData.description}}
            </div>

            <address :style="{width:addressSize}">
                <ContactBox v-if="themeData.contactInfo.github" icon="akar-icons:github-fill"
                    :address="themeData.contactInfo.github" />

                <ContactBox v-if="themeData.contactInfo.github" icon="fluent:mail-48-filled"
                    :address="'mailto:'+themeData.contactInfo.mail" />
            </address>
        </div>
    </div>
    <div class="posts">

        <PostBox v-for="i in posts.slice(0,6)" :post="i" />
        <div class="archive-button">

                <a href="/archive">查看更多</a>
        </div>

    </div>

</template>

<style lang="scss" scoped>
#home {
    background-image: url(img/homeBg.jpg);
    min-height: 100vh;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;

    .home-mask {
        background-color: rgba($color: black, $alpha: 0.1);
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
    }


    .info {

        z-index: 2;
        position: absolute;
        top: 30vh;
        text-align: center;

        left: calc(50% - 15vw);

        color: white;
        @media screen and (max-width:1000px){
            left: calc(50% - 35vw); 
        }

        #info-logo {

            img {
                height: 16vh;
                border-radius: 100%;
            }
        }

        #info-main {
            text-align: center;
            width: 30vw;
            background-color: rgba(0, 0, 0, .5);
            border-radius: 10px;
            padding: 3%;
            margin-top: 3%;
            @media screen and (max-width:1000px){
                width: 70vw; 
            }

            h1 {
                margin: 0;
                margin-bottom: 2%;
            }
        }

    }
}

address {
    display: inline-flex;
    justify-content: space-around;
    margin-top: 3%;
}

.posts {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 5vh;
    justify-content: space-around;
    padding: 5vh 0;
}

.archive-button {
    text-align: right;
    width: 50vw;
    @media screen and (max-width:1000px) {
        width: 90vw; 
        font-size: large;
    }

    a {

        text-decoration: none;
        color: black;
        box-shadow: 1px 1px 5px 0 rgb(0 0 0 / 2%), 1px 1px 15px 0 rgb(0 0 0 / 3%);
        border: 1px solid #eaeaea;
        display: inline-block;
        background-color: white;
        padding: 0.5% 1%;
        border-radius: 5px;

        &:hover {
            background-color: $color-default;
            color: white;
        }

    }
}

.navbar {
    background-color: rgba($color: #000000, $alpha: 0) !important;
    border: none !important;
    z-index: 2;
}
</style>

<style>
body {
    margin: 0;
}

html{
    z-index: 1;
}
</style>

<script lang="ts" setup>
import { useSiteData } from '@vuepress/client';
import Navbar from './components/Navbar.vue';
import ContactBox from './components/ContactBox.vue';
import { useThemeData } from '../plugins/themeData/themeData-client';
import { myThemeData } from '../types';
import { usePosts } from '../plugins/posts/posts-client'
import { onMounted, ref } from 'vue';
import PostBox from './components/PostBox.vue';

let posts = usePosts()
let siteData = useSiteData()
let themeData = useThemeData()
let addressSize: number | string = Object.keys(themeData.contactInfo).length
addressSize = (addressSize * 3 / 2) * 5 + 'vh'
let isTop = ref(true)

onMounted(() => {
    window.addEventListener('scroll', () => {
        if (window.scrollY == 0) {
            isTop.value = true
        }
        else {
            isTop.value = false
        }
    })
})

</script>