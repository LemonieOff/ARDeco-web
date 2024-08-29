<template>
    <FurnitureDetails :urlLand="lang"></FurnitureDetails>
</template>

<script setup lang="ts">
import FurnitureDetails from "~/components/Furnitures/FurnitureDetails.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const lang = route.params.lang;
</script>

<style lang="scss" scoped></style>
