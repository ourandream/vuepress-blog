<template>
    <Navbar :active-index="3"/>
    <div :class="{content:true,mobile:isMobile}">
        <content />
    </div>
</template>

<style lang="scss" scoped>
.content {
    margin-top: calc($navbar-height  );
    width: 56vw;
    margin-left: 20vw;
    padding: 2vh 3vw;
    border-left: 1px solid $border-color ;
    border-right: 1px solid $border-color ;

}

.mobile{
    box-sizing: border-box;
    width: 100vw;
    border: none;
    padding: $navbar-height 6vw;
    margin: 0;
}
</style>

<style>
.content img {
    width: 100%;
}
</style>

<script lang="ts" setup>
import { computed } from 'vue';
import Navbar from './components/Navbar.vue';

let isMobile = computed(() => {
    return (window.innerWidth <= 1000);
})
</script>