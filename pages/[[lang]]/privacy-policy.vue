<template>
    <Navbar :urlLang=lang></Navbar>
    <div class="space-between-questions"></div>
    <Introduction :urlLang=lang></Introduction>
    <div class="space-between-questions"></div>
    <Cookies :urlLang=lang></Cookies>
    <div class="space-between-questions"></div>
    <Identification :urlLang=lang></Identification>
    <div class="space-between-questions"></div>
    <Bank :urlLang=lang></Bank>
    <div class="space-between-questions"></div>
    <Social :urlLang=lang></Social>
    <div class="space-between-questions"></div>
    <Private :urlLang=lang></Private>
    <div class="space-between-questions"></div>
    <Statistics :urlLang=lang></Statistics>
    <div class="space-between-questions"></div>
    <Internal :urlLang=lang></Internal>
    <div class="space-between-questions"></div>
    <Device :urlLang=lang></Device>
    <div class="space-between-questions"></div>
    <Conclusion :urlLang=lang></Conclusion>
    <div class="space-between-questions"></div>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
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

const route = useRoute();

const lang = route.params.lang;
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
