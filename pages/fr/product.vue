<template>
    <Navbar urlLang="fr"/>
    <QuestionsList urlLang="fr"/>
    <WhatIsArdeco urlLang="fr"/>
    <div class="space-between-questions"></div>
    <HowToUseArdeco urlLang="fr"/>
    <div class="space-between-questions"></div>
    <HowAreMyFurnitureChosen urlLang="fr"/>
    <div class="space-between-questions"></div>
    <WhereDoModelsComeFrom urlLang="fr"/>
    <div class="space-between-questions"></div>
    <WhyShouldIUseArdeco urlLang="fr"/>
    <div class="space-between-questions"></div>
    <InAppPurchaces urlLang="fr"/>
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
