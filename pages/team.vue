<template>
    <body>
        <Navbar></Navbar>
        <PagePresentation></PagePresentation>
        <ProfileHugo></ProfileHugo>
        <ProfileEvan></ProfileEvan>
        <ProfileLouis></ProfileLouis>
        <ProfileUgo></ProfileUgo>
        <ProfileMathias></ProfileMathias>
        <ProfileValentin></ProfileValentin>
    </body>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import PagePresentation from "~/components/Profiles/PagePresentation.vue";
import ProfileEvan from "~/components/Profiles/ProfileEvan.vue";
import ProfileHugo from "~/components/Profiles/ProfileHugo.vue";
import ProfileLouis from "~/components/Profiles/ProfileLouis.vue";
import ProfileMathias from "~/components/Profiles/ProfileMathias.vue";
import ProfileUgo from "~/components/Profiles/ProfileUgo.vue";
import ProfileValentin from "~/components/Profiles/ProfileValentin.vue";
</script>

<style lang="scss" scoped>
@import url('https://fonts.cdnfonts.com/css/happy-monkey');
@import '../styles/ColorVariables.scss';

body {
    font-family: 'Happy Monkey', sans-serif;
    background-color: $background-main-theme;
}

</style>
