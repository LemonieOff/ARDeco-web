<template>
    <Head>
        <Title>ARDeco - {{ content.title }}</Title>
    </Head>
    <h1 class="text-center font-bold text-xl md:text-4xl my-8">{{ content.title }}</h1>
    <Introduction :content="content.introduction"/>
    <Cookies :content="content.cookies"/>
    <Identification :content="content.identification"/>
    <Bank :content="content.bank"/>
    <Social :content="content.social"/>
    <Private :content="content.private"/>
    <Statistics :content="content.statistics"/>
    <Internal :content="content.internal"/>
    <Device :content="content.device"/>
    <Conclusion :content="content.conclusion"/>
</template>

<script setup lang="ts">
import Introduction from "@/components/Policy/PrivacyPolicy/Introduction.server.vue";
import Cookies from "@/components/Policy/PrivacyPolicy/Cookies.server.vue";
import Identification from "@/components/Policy/PrivacyPolicy/Identification.server.vue";
import Bank from "@/components/Policy/PrivacyPolicy/Bank.server.vue";
import Social from "@/components/Policy/PrivacyPolicy/Social.server.vue";
import Private from "@/components/Policy/PrivacyPolicy/Private.server.vue";
import Statistics from "@/components/Policy/PrivacyPolicy/Statistics.server.vue";
import Internal from "@/components/Policy/PrivacyPolicy/Internal.server.vue";
import Device from "@/components/Policy/PrivacyPolicy/Device.server.vue";
import Conclusion from "@/components/Policy/PrivacyPolicy/Conclusion.server.vue";

const nuxtApp = useNuxtApp();

const content = ref(nuxtApp.$content.privacyPolicy);
</script>
