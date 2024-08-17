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
import CguObject from "~/components/Policy/CGU/CguObject.vue";
import Definitions from "~/components/Policy/CGU/Definitions.vue";
import AccessAndUse from "~/components/Policy/CGU/AccessAndUse.vue";
import IntellectualProperty from "~/components/Policy/CGU/IntellectualProperty.vue";
import PersonalData from "~/components/Policy/CGU/PersonalData.vue";
import Responsibility from "~/components/Policy/CGU/Responsibility.vue";
import CguEdit from "~/components/Policy/CGU/CguEdit.vue";
import DurationAndCancellation from "~/components/Policy/CGU/DurationAndCancellation.vue";
import Litige from "~/components/Policy/CGU/Litige.vue";
import GeneralDisposition from "~/components/Policy/CGU/GeneralDisposition.vue";
import Contact from "~/components/Policy/CGU/Contact.vue";
import fr from "~/src/lang/fr.json"
import en from "~/src/lang/en.json"

const nuxtApp = useNuxtApp();

const lang = ref(nuxtApp.$lang);

let content = ref(lang.value === "en" ? en.cgu : fr.cgu);

const components = shallowRef([CguObject, Definitions, AccessAndUse, IntellectualProperty, PersonalData, Responsibility, CguEdit, DurationAndCancellation, Litige, GeneralDisposition, Contact]);
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
