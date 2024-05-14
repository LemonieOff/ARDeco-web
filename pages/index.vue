<template>
    <Navbar :urlLang=lang></Navbar>
    <Index :urlLang=lang></Index>
    <Footer :urlLang=lang></Footer>
</template>

<script setup lang="js">
import Index from "~/components/Index.vue";

const route = useRoute();

let lang = route.params.lang;
</script>

<style lang="scss" scoped>

</style>
