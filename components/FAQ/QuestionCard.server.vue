<template>
    <a :id="id" :href="link"
       class="rounded-xl border-2 border-card-border dark:border-card-border-dark bg-card-background dark:bg-card-background-dark question-card flex flex-row-reverse justify-around md:flex-col items-center text-center w-80 xl:w-96 md:h-28">
        <slot />
        <NuxtImg :alt="imgAlt" :src="imgSrc" class="" height="64" width="64" />
    </a>
</template>

<script lang="ts" setup>
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
@keyframes tilt-shaking {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(2.5deg);
    }
    50% {
        transform: rotate(0deg);
    }
    75% {
        transform: rotate(-2.5deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

.question-card:hover {
    animation: tilt-shaking 0.25s infinite;
}
</style>
