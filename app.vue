<template>
    <Html :class="{ dark: darkMode }"></Html>
    <Head>
        <Title>ARDeco</Title>
    </Head>
    <div class="overflow-x-hidden">
        <ClientOnly/>
        <NuxtPage/>
        <LanguageChanger/>
    </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();

const darkMode: boolean = nuxtApp.$darkMode;
</script>
