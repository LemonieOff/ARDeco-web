<template>
    <div class="question-content background-card">
        <div class="title underline">{{ content.title }}</div>
        <div class="sub-title gray-text-color">{{ content.modification }}</div>
        <div class="sub-title gray-text-color">{{ content.acceptance }}</div>
        <div class="sub-title gray-text-color">{{ content.application }}</div>
        <div class="sub-title gray-text-color">{{ content.opposition }}</div>
        <div class="sub-title gray-text-color">{{ content.previous }}</div>
        <div class="sub-title gray-text-color">{{ content.opposition2 }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    data() {
        return {
            content: this.$lang === 'en' ? en.cgu.cguEdit : fr.cgu.cguEdit
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
