<template>
    <Navbar :urlLang=lang></Navbar>
    <div class="space-between-questions"></div>
    <CguObject :urlLang=lang></CguObject>
    <div class="space-between-questions"></div>
    <Definitions :urlLang=lang></Definitions>
    <div class="space-between-questions"></div>
    <AccessAndUse :urlLang=lang></AccessAndUse>
    <div class="space-between-questions"></div>
    <IntellectualProperty :urlLang=lang></IntellectualProperty>
    <div class="space-between-questions"></div>
    <PersonalData :urlLang=lang></PersonalData>
    <div class="space-between-questions"></div>
    <Responsibility :urlLang=lang></Responsibility>
    <div class="space-between-questions"></div>
    <CguEdit :urlLang=lang></CguEdit>
    <div class="space-between-questions"></div>
    <DurationAndCancellation :urlLang=lang></DurationAndCancellation>
    <div class="space-between-questions"></div>
    <Litige :urlLang=lang></Litige>
    <div class="space-between-questions"></div>
    <GeneralDisposition :urlLang=lang></GeneralDisposition>
    <div class="space-between-questions"></div>
    <Contact :urlLang=lang></Contact>
    <div class="space-between-questions"></div>
    <Footer :urlLang=lang></Footer>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
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
import Footer from "~/components/Footer.vue";
import {useRoute} from "vue-router";

const route = useRoute();

const lang = route.params.lang;
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
