<template>
    <Navbar :urlLang=lang></Navbar>
    <FurnitureDetails :urlLand="lang"></FurnitureDetails>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import FurnitureDetails from "@/components/Furnitures/FurnitureDetails.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const lang = route.params.lang;
</script>
