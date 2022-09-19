<template>
    <div class="postBox" >
        <a :href="post.path"><h2>{{post.title}}</h2></a>
        <p v-html="post.summary"></p>
        <time :datetime="date">{{date}}
        </time>
    </div>
</template>

<style lang="scss">
.postBox{
    width: 50vw;
    box-shadow: 1px 1px 5px 0 rgb(0 0 0 / 2%), 1px 1px 15px 0 rgb(0 0 0 / 3%);
    box-sizing: border-box;
    display: block;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    padding-left: 1vw;
    padding-right: 1vw;
    padding-bottom: 2vh;
    transition: all ease .4s ;
    &:hover{
        transform: translateY(-0.5em);
    }
    a{
    color: black;
    text-decoration: none;
    }
    time{
        font-size: small;
        color: #7f7f7f;
    }
}

</style>

<script lang="ts" setup>
import { Post } from '../../types';

let { post } = defineProps<{ post: Post }
>()

let date=new Date(post.date).toLocaleDateString('en-CA')
</script>