<template>
    <Navbar :urlLang=lang></Navbar>
    <OverallSettings :urlLang=lang></OverallSettings>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import OverallSettings from "~/components/Settings/OverallSettings.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const lang = route.params.lang;
</script>

<style lang="scss" scoped></style>
