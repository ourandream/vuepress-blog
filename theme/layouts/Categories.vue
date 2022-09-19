<template>
    <Navbar :active-index="2"/>
    <main>

        <div class="select">
            <button v-for=" (i,index) in categories" @click="()=>{currentCategory=i;activeIndex=index}"
                :class="{active:activeIndex==index}">{{i}}</button>
        </div>
        <PostBox v-for="i in currentPosts" :post="i"/>
    </main>

</template>

<style lang="scss" scoped>
main{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5vh;
}
.select {
    margin-top: $navbar-height;
    padding-top: 5px;

    button {
        background-color: white;
        border: none;
        font-size: large;
        cursor: pointer;
    }

    .active {
        border-bottom: 2px solid $color-default;
    }
}
</style>


<script lang="ts" setup>
import Navbar from './components/Navbar.vue';
import { usePosts } from '../plugins/posts/posts-client';
import { Post } from '../types';
import { computed, ref } from 'vue';
import PostBox from './components/PostBox.vue';
let posts = usePosts()
let categories = new Set<string>()
for (let i of posts) {
    categories.add(i.category)
}

interface postByCategoryType {
    [index: string]: Post[]
}
let postByCategory: postByCategoryType = {}
categories.forEach((value) => {
    postByCategory[value as string] = posts.filter((post) => post.category == value)
})


let currentCategory = ref(categories.values().next().value as string)
let currentPosts = computed(() => {
    return postByCategory[currentCategory.value]
})
let activeIndex = ref(0)
</script>