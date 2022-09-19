<template>
    <div id="head">
        <div id="logo">
            <a href="/">
                <img src="/img/head.jpg" />
            </a>
        </div>
        <div class="links">
            <a v-for=" (i,index) in navbar" :href="i.link" :class="{active:activeIndex==index}">
                <Icon :icon="i.icon" />
                <span>{{i.text}}</span>
            </a>

        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../css/color.scss";
@import "../../css/values.scss";

#head {
    border-bottom: 1px solid #eaeaea;
    padding: 1% 0;
    display: flex;
    height: $navbar-height;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, .9);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 5;

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
}
</style>

<script lang="ts" setup>
import type { NavbarItem } from '../../types'
import { Icon } from '@iconify/vue';

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
</script>