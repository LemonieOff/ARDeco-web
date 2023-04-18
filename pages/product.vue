<template>
    <div class="h-screen" style="background-color: #F2EBDF;">
        <div class="title"> What us our product ? </div>
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
    font-size: 300%;
    top: 10%;
    text-align: center;
    position: relative;
    left: 37%;
    width: 26%;
}

</style>
