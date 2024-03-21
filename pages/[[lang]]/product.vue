<template>
    <Navbar :urlLang=lang></Navbar>
    <QuestionsList :urlLang=lang></QuestionsList>
    <WhatIsArdeco :urlLang=lang></WhatIsArdeco>
    <div class="space-between-questions"></div>
    <HowToUseArdeco :urlLang=lang></HowToUseArdeco>
    <div class="space-between-questions"></div>
    <HowAreMyFurnitureChosen :urlLang=lang></HowAreMyFurnitureChosen>
    <div class="space-between-questions"></div>
    <WhereDoModelsComeFrom :urlLang=lang></WhereDoModelsComeFrom>
    <div class="space-between-questions"></div>
    <WhyShouldIUseArdeco :urlLang=lang></WhyShouldIUseArdeco>
    <div class="space-between-questions"></div>
    <InAppPurchaces :urlLang=lang></InAppPurchaces>
    <div class="space-between-questions"></div>
    <Footer :urlLang=lang></Footer>
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

const route = useRoute();

let lang = route.params.lang;
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
