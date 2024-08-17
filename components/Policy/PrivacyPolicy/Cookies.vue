<template>
    <div class="question-content background-card">
        <div class="title underline">{{ content.title }}</div>
        <div class="sub-title gray-text-color">{{ content.collection }}</div>
        <div class="sub-title gray-text-color">{{ content.usage }}</div>
        <div class="sub-title gray-text-color">{{ content.consent }}</div>
        <div class="sub-title gray-text-color">{{ content.share }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    data() {
        return {
            content: this.$lang === 'en' ? en.privacyPolicy.cookies : fr.privacyPolicy.cookies
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
