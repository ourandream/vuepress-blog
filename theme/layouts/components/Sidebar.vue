<template>
    <div>
        <div v-for="(i,index) in headers" class="header-item" @click="currentItem=i.slug">
            <a :href="i.link" :class="{active:i.slug==currentItem}">{{i.title}}</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../css/color.scss";

.header-item{
    padding: 3% 0;
    a{
        color: black;
        text-decoration: none;
        &:hover{
            color: $color-default;
        }
    }

    .active{
        color:$color-default
    }
}

</style>

<script lang="ts" setup>
import { ref } from 'vue';
import { PageHeader } from 'vuepress';

let { headers } = defineProps<{
    headers: PageHeader[]
}>()

let currentItem=ref('')
</script>