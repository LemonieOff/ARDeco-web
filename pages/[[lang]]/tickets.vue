<template>
    <Navbar :urlLang=lang></Navbar>
    <TicketPage :urlLang=lang></TicketPage>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import TicketPage from "~/components/Tickets/TicketPage.vue";
import { useRoute } from "vue-router";

const route = useRoute();

let lang = route.params.lang;
</script>

<style lang="scss" scoped>
</style>
