<template>
    <Navbar :urlLang=lang></Navbar>
    <CreateNewFurniture :urlLang=lang></CreateNewFurniture>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import CreateNewFurniture from "~/components/Settings/CreateNewFurniture.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const lang = route.params.lang;
</script>

<style lang="scss" scoped></style>
