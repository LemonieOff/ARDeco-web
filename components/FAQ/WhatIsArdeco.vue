<template>
    <div class="question-content background-card" id="what-is-ardeco">
        <div id="whatIsArdecoTitle" class="title underline">{{ content.whatIsArdecoTitle }}</div>
        <div id="whatIsArdecoText" class="sub-title gray-text-color">{{ content.whatIsArdecoText }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "WhatIsArdeco",
    data() {
        return {
            content: this.$lang === 'en' ? en.productPages : fr.productPages
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
