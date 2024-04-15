<template>
    <Navbar :urlLang=lang></Navbar>
    <CompanySettings :urlLang=lang></CompanySettings>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import CompanySettings from "~/components/Settings/CompanySettings.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const lang = route.params.lang;
</script>

<style lang="scss" scoped></style>
