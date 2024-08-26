<template>
    <TicketPage :urlLang=lang></TicketPage>
</template>

<script setup lang="ts">
import TicketPage from "@/components/Tickets/TicketPage.vue";
import { useRoute } from "vue-router";

const route = useRoute();

let lang = route.params.lang;
</script>
