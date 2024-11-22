<!-- ChangePassword.vue -->
<template>
    <Reset/>
</template>


<script setup lang="ts">
import Reset from "~/components/Auth/Reset.vue";
import { useRoute } from "vue-router";

const route = useRoute();

let lang = route.params.lang;
</script>
