<template>
    <Html :lang="lang"></Html>
    <Navbar/>
    <h1 class="text-center font-bold text-xl md:text-4xl my-8">{{ content.title }}</h1>
    <div v-for="component in components">
        <Component :is="component"/>
        <div class="space-between-questions"></div>
    </div>
    <Footer/>
</template>

<script setup lang="ts">
import Introduction from "~/components/Policy/PrivacyPolicy/Introduction.vue";
import Cookies from "~/components/Policy/PrivacyPolicy/Cookies.vue";
import Identification from "~/components/Policy/PrivacyPolicy/Identification.vue";
import Bank from "~/components/Policy/PrivacyPolicy/Bank.vue";
import Social from "~/components/Policy/PrivacyPolicy/Social.vue";
import Private from "~/components/Policy/PrivacyPolicy/Private.vue";
import Statistics from "~/components/Policy/PrivacyPolicy/Statistics.vue";
import Internal from "~/components/Policy/PrivacyPolicy/Internal.vue";
import Device from "~/components/Policy/PrivacyPolicy/Device.vue";
import Conclusion from "~/components/Policy/PrivacyPolicy/Conclusion.vue";
import fr from "~/src/lang/fr.json"
import en from "~/src/lang/en.json"

const nuxtApp = useNuxtApp();

const lang = ref(nuxtApp.$lang);

const content = ref(lang.value === "en" ? en.privacyPolicy : fr.privacyPolicy);

const components = shallowRef([Introduction, Cookies, Identification, Bank, Social, Private, Statistics, Internal, Device, Conclusion]);
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
