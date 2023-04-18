<template>
  <div class="overflow-x-hidden">
    <ClientOnly>
      <Navbar class="z-30"></Navbar>
    </ClientOnly>
    <NuxtPage class="z-1"/>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "./components/Header";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {Header, Navbar, Footer}
}
</script>