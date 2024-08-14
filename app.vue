<template>
    <Head>
        <Title>ARDeco</Title>
    </Head>
    <div class="overflow-x-hidden">
        <ClientOnly/>
        <NuxtPage class="z-1"/>
        <LanguageChanger/>
    </div>
</template>

<script>
import LanguageChanger from "~/components/LanguageChanger.vue";

export default {
    components: {LanguageChanger}
}
</script>
