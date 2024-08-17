<template>
    <div class="question-content background-card">
        <div class="title underline">{{ content.title }}</div>
        <div class="sub-title gray-text-color">{{ content.objective }}</div>
        <div class="sub-title gray-text-color">{{ content.engagement }}</div>
        <div class="sub-title gray-text-color">{{ content.readCarefully }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    data() {
        return {
            content: this.$lang === 'en' ? en.privacyPolicy.introduction : fr.privacyPolicy.introduction
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
