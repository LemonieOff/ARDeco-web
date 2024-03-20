<template>
    <Navbar :urlLang=lang></Navbar>
    <Index :urlLang=lang></Index>
</template>

<script setup lang="js">
import Index from "~/components/Index.vue";

const route = useRoute();

let lang = route.params.lang;
</script>
