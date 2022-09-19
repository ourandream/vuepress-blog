<template>
    <Navbar :active-index="3"/>
    <div class="content">
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
</style>

<style>
.content img {
    width: 100%;
}
</style>

<script lang="ts" setup>
import Navbar from './components/Navbar.vue';

</script>