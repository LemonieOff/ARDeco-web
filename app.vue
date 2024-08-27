<template>
    <Html :class="{ dark: darkMode }" :lang="lang"/>
    <Head>
        <Title>ARDeco</Title>
    </Head>
    <div class="overflow-x-hidden min-h-screen flex flex-col">
        <Navbar/>
        <div>
            <NuxtPage/>
        </div>
        <Footer :content="content.footer" :lang-prefix="langPrefix"/>
        <LanguageChanger/>
    </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();

const darkMode: boolean = nuxtApp.$darkMode;
const lang = nuxtApp.$lang;
const content = nuxtApp.$content;
const langPrefix = nuxtApp.$langPrefix;
</script>
