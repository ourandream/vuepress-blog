<template>
    <div id="head">
        <div id="logo">
            <a href="/">
                <img src="/img/head.jpg" />
            </a>
        </div>
        <div class="links" v-if="!isMobile">
            <a v-for=" (i,index) in navbar" :href="i.link" :class="{active:activeIndex==index}">
                <Icon :icon="i.icon" />
                <span>{{i.text}}</span>
            </a>

        </div>
        <div class="menu__button" v-if="isMobile">
            <button @click="showMenu=!showMenu">

                <Icon icon="dashicons:menu-alt3"></Icon>
            </button>
        </div>
        <div v-if="showMenu" class="menu">
            <a v-for=" (i,index) in navbar" :href="i.link" :class="{active:activeIndex==index}">
                <span>{{i.text}}</span>
            </a>
        </div>
        <div class="mask" v-if="showMenu" @click="()=>{showMenu=false}"></div>

    </div>
</template>

<style lang="scss" scoped>
@import "../../css/color.scss";
@import "../../css/values.scss";

#head {
    border-bottom: 1px solid #eaeaea;
    display: flex;
    height: $navbar-height;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, .9);
    position: fixed;
    width: 100vw;
    box-sizing: border-box;
    top: 0;
    z-index: 100;

    #logo {
        display: flex;
        align-items: center;
        font-size: 30px;

        img {
            height: 5vh;
            margin: 0 1vw;
            border-radius: 100%;
        }

        a {
            color: black;
            text-decoration: none;
            display: flex;
            align-items: center;

            &:hover {
                color: $color-default
            }

        }

    }

    .links {
        width: 33%;
        display: flex;
        align-items: center;

        a {
            padding: 0 5%;
            color: black;
            text-decoration: none;
            display: flex;
            align-items: center;


            &:hover {
                color: $color-default;
            }

            &.active {
                color: $color-default;
            }

            span {
                padding-left: 2px;
            }
        }
    }

    .menu__button {
        display: flex;
        align-items: center;
        padding: 0 1vw;

        button {
            background-color: rgba($color: #000000, $alpha: 0);
            border: none;
            font-size: 20px;
        }
    }

    .menu{
        position: fixed;
        display:flex;
        flex-direction: column;
        height: 100vh;
        right: 0;
        background-color: white;
        z-index: 100;
        a{
            color: black;
            text-decoration: none;
            font-size: 1.2em;
            padding: 3vh 10vw;
            &:active{
                background-color: #ddd;
            }
        }
    }
}

.mask{
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 5;
    position: fixed;
}
</style>

<script lang="ts" setup>
import type { NavbarItem } from '../../types'
import { Icon } from '@iconify/vue';
import { computed, onMounted, ref } from 'vue';

let { activeIndex } = defineProps<{
    activeIndex?: number
}>()


const navbar: NavbarItem[] = [
    {
        text: '主页',
        link: '/',
        icon: 'clarity:home-solid'
    },
    {
        text: '文章',
        link: '/archive',
        icon: 'entypo:book'
    },
    {
        text: '分类',
        link: '/categories',
        icon: 'ic:baseline-category'
    },
    {
        text: '关于',
        link: '/about',
        icon: 'emojione-monotone:information'
    }
]


let isMobile = ref(false);
onMounted(()=>{
    isMobile.value=window.innerWidth<=1000
})

let showMenu = ref(false)

</script>