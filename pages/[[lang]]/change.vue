<!-- EmailInput.vue -->
<template>
  <Navbar :urlLang=lang></Navbar>
  <Change :urlLang=lang></Change>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import Change from "~/components/Auth/Change.vue"

const route = useRoute();

const lang = route.params.lang;
</script>
