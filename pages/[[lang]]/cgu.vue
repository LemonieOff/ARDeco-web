<template>
    <h1 class="text-center text-black dark:text-port-brown font-bold text-xl md:text-4xl my-8">{{ content.title }}</h1>
    <CguObject :content="content.object"/>
    <Definitions :content="content.definitions"/>
    <AccessAndUse :content="content.accessAndUse" />
    <IntellectualProperty :content="content.intellectualProperty"/>
    <PersonalData :content="content.personalData"/>
    <Responsibility :content="content.responsibility"/>
    <CguEdit :content="content.cguEdit"/>
    <DurationAndCancellation :content="content.durationAndCancellation"/>
    <Litige :content="content.litige"/>
    <GeneralDisposition :content="content.generalDisposition"/>
    <Contact :content="content.contact"/>
</template>

<script setup lang="ts">
import CguObject from "@/components/Policy/CGU/CguObject.server.vue";
import Definitions from "@/components/Policy/CGU/Definitions.server.vue";
import AccessAndUse from "@/components/Policy/CGU/AccessAndUse.server.vue";
import IntellectualProperty from "@/components/Policy/CGU/IntellectualProperty.server.vue";
import PersonalData from "@/components/Policy/CGU/PersonalData.server.vue";
import Responsibility from "@/components/Policy/CGU/Responsibility.server.vue";
import CguEdit from "@/components/Policy/CGU/CguEdit.server.vue";
import DurationAndCancellation from "@/components/Policy/CGU/DurationAndCancellation.server.vue";
import Litige from "@/components/Policy/CGU/Litige.server.vue";
import GeneralDisposition from "@/components/Policy/CGU/GeneralDisposition.server.vue";
import Contact from "@/components/Policy/CGU/Contact.server.vue";

const nuxtApp = useNuxtApp();

let content = ref(nuxtApp.$content.cgu);
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
