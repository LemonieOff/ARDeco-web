<template>
    <a :id="id" :href="link" class="text-AR-Grey dark:text-[#DECDC3] rounded-xl border-2 border-[#846700] dark:border-[#D8DF81] bg-[#F5DBAF] dark:bg-[#4E360E] question-card flex flex-row-reverse justify-around md:flex-col items-center text-center w-80 xl:w-96 md:h-28">
        <slot/>
        <NuxtImg width="64" height="64" :src="imgSrc" :alt="imgAlt" class=""/>
    </a>
</template>

<script setup lang="ts">
defineProps({
    id: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    imgAlt: {
        type: String,
        required: true
    }
});
</script>

<style scoped>
@import "styles/FAQPage.scss";
</style>
