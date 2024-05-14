<!-- ChangePassword.vue -->
<template>
    <Navbar :urlLang=lang></Navbar>
    <Reset/>
    <Footer :urlLang=lang></Footer>
</template>


<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import Reset from "~/components/Auth/Reset.vue"
import {useRoute} from "vue-router";

const route = useRoute();

let lang = route.params.lang;
</script>
