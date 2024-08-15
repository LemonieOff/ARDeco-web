<template>
    <Navbar/>
    <QuestionsList/>
    <WhatIsArdeco/>
    <div class="space-between-questions"></div>
    <HowToUseArdeco/>
    <div class="space-between-questions"></div>
    <HowAreMyFurnitureChosen/>
    <div class="space-between-questions"></div>
    <WhereDoModelsComeFrom/>
    <div class="space-between-questions"></div>
    <WhyShouldIUseArdeco/>
    <div class="space-between-questions"></div>
    <InAppPurchaces/>
    <div class="space-between-questions"></div>
    <Footer/>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import QuestionsList from "~/components/FAQ/QuestionsList.vue";
import WhatIsArdeco from "~/components/FAQ/WhatIsArdeco.vue"
import HowAreMyFurnitureChosen from "~/components/FAQ/HowAreMyFurnitureChosen.vue"
import WhereDoModelsComeFrom from "~/components/FAQ/WhereDoModelsComeFrom.vue"
import WhyShouldIUseArdeco from "~/components/FAQ/WhyShouldIUseArdeco.vue"
import InAppPurchaces from "~/components/FAQ/InAppPurchaces.vue"
import HowToUseArdeco from "~/components/FAQ/HowToUseArdeco.vue"
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
