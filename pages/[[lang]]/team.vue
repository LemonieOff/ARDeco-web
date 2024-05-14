<template>
    <Navbar :urlLang=lang></Navbar>
    <PagePresentation :urlLang=lang></PagePresentation>
    <ProfileHugo :urlLang=lang></ProfileHugo>
    <ProfileEvan :urlLang=lang></ProfileEvan>
    <ProfileLouis :urlLang=lang></ProfileLouis>
    <ProfileValentin :urlLang=lang></ProfileValentin>
    <Footer :urlLang=lang></Footer>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import PagePresentation from "~/components/Profiles/PagePresentation.vue";
import ProfileEvan from "~/components/Profiles/ProfileEvan.vue";
import ProfileHugo from "~/components/Profiles/ProfileHugo.vue";
import ProfileLouis from "~/components/Profiles/ProfileLouis.vue";
import ProfileValentin from "~/components/Profiles/ProfileValentin.vue";
import { useRoute } from "vue-router";

const route = useRoute();

let lang = route.params.lang;
</script>

<style lang="scss" scoped>
</style>
