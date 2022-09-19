<template>
    <a :href="address">
        <Icon :icon="icon" />
    </a>
</template>

<style scoped>
a{
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1%;
    color: white;
    border-radius: 100%;
    height: 5vh;
    width: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    transition: transform ease .4s; 
}

a:hover{
    transform: translateY(-0.35em);
}

</style>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
let { icon, address } = defineProps<{
    icon: string
    address: string
}>()

</script>