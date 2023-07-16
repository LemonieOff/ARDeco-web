<template>
  <div class="h-screen" style="background-color: #F2EBDF;">
    <div class="title"> Your profile </div>
  </div>
  <ClientOnly>
      <Navbar></Navbar>
  </ClientOnly>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
</script>

<style lang="scss" scoped>

.title {
  display: inline-block;
  font-size: 1.75vw;
  top: 10%;
  text-align: center;
  position: relative;
  left: 40%;
  width: 20%;
}

</style>
