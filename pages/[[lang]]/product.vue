<template>
    <QuestionsList/>
    <WhatIsArdeco :content="content"/>
    <HowToUseArdeco :content="content"/>
    <HowAreMyFurnitureChosen :content="content"/>
    <WhereDoModelsComeFrom :content="content"/>
    <WhyShouldIUseArdeco :content="content"/>
    <InAppPurchase :content="content"/>
    <UpdatesHistory/>
</template>

<script setup lang="ts">
import QuestionsList from "@/components/FAQ/QuestionsList.server.vue"
import WhatIsArdeco from "@/components/FAQ/WhatIsArdeco.server.vue"
import HowAreMyFurnitureChosen from "@/components/FAQ/HowAreMyFurnitureChosen.server.vue"
import WhereDoModelsComeFrom from "@/components/FAQ/WhereDoModelsComeFrom.server.vue"
import WhyShouldIUseArdeco from "@/components/FAQ/WhyShouldIUseArdeco.server.vue"
import InAppPurchase from "@/components/FAQ/InAppPurchase.server.vue"
import HowToUseArdeco from "@/components/FAQ/HowToUseArdeco.server.vue"
import UpdatesHistory from "@/components/FAQ/UpdatesHistory.server.vue"

const nuxtApp = useNuxtApp();

const content = ref(nuxtApp.$content.productPages);
</script>
