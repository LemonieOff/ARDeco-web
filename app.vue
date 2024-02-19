<template>
  <div class="overflow-x-hidden">
    <ClientOnly/>
    <NuxtPage class="z-1"/>
    <Footer/>
    <LanguageChanger/>
  </div>
</template>
<script>
import Header from "./components/Header";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import LanguageChanger from "~/components/LanguageChanger.vue";

export default {
  components: { Header, Navbar, Footer, LanguageChanger }
}
</script>
