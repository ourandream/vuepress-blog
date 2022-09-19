<template>
    <Navbar :active-index="1"></Navbar>
    <div class="archive">
        <PostBox v-for="i in posts.slice(postBegin,postEnd)" :post="i" />

        <div class="pagination">
            <button :style="{visibility: postBegin!=0?'visible':'hidden'}" @click="prePage">上一页</button>
            <button :style="{visibility:postEnd!=posts.length?'visible':'hidden'}" @click="nextPage">下一页</button>
        </div>
    </div>
</template>

<style lang="scss">
.archive {
    margin-top: $navbar-height;
    display: flex;
    padding-top: 5vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 5vh;
}

.pagination {
    width: 50vw;
    display: flex;
    justify-content: space-between;
    padding-bottom: 5vh;

    button {
        text-decoration: none;
        color: black;
        box-shadow: 1px 1px 5px 0 rgb(0 0 0 / 2%), 1px 1px 15px 0 rgb(0 0 0 / 3%);
        border: 1px solid #eaeaea;
        display: inline-block;
        background-color: white;
        padding: 0.5% 1%;
        border-radius: 5px;
        cursor: pointer;
        font-size: medium;

        &:hover {
            background-color: $color-default;
            color: white;
        }

    }
}

.hidden {
    visibility: hidden;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue';
import { usePosts } from '../plugins/posts/posts-client';
import Navbar from './components/Navbar.vue';
import PostBox from './components/PostBox.vue';

let posts = usePosts()
let postBegin = ref(0)
let postEnd = ref(posts.length >= 10 ? 10 : posts.length)

function prePage() {
    postBegin.value = postBegin.value - 10 > 0 ? postBegin.value - 10 : 0
    postEnd.value = postBegin.value + 10
    window.scrollTo(0,0)
}

function nextPage() {
    postBegin.value += 10
    postEnd.value = postEnd.value + 10 < posts.length ? postEnd.value + 10 : posts.length
    window.scrollTo(0,0)
}

</script>