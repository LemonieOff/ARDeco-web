<template>
    <Html :class="{ dark: darkMode }" :lang="lang"/>
    <Head>
        <Title>ARDeco</Title>
    </Head>
    <div class="overflow-x-hidden">
        <Navbar/>
        <NuxtPage/>
        <Footer/>
        <LanguageChanger/>
    </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();

const darkMode: boolean = nuxtApp.$darkMode;
const lang = nuxtApp.$lang;
</script>
