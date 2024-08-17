<template>
    <div class="question-content background-card">
        <div class="title underline">{{ content.title }}</div>
        <div class="sub-title gray-text-color">{{ content.access }}</div>
        <div class="sub-title gray-text-color">{{ content.account }}</div>
        <div class="sub-title gray-text-color">{{ content.content }}</div>
        <div class="sub-title gray-text-color">{{ content.responsibility }}</div>
        <div class="sub-title gray-text-color">{{ content.moderation }}</div>
        <div class="sub-title gray-text-color">{{ content.data }}</div>
        <div class="sub-title gray-text-color">{{ content.availability }}</div>
        <div class="sub-title gray-text-color">{{ content.responsibility2 }}</div>
        <div class="sub-title gray-text-color">{{ content.cookies }}</div>
        <div class="sub-title gray-text-color">{{ content.proprietary }}</div>
        <div class="sub-title gray-text-color">{{ content.license }}</div>
        <div class="sub-title gray-text-color">{{ content.responsibility3 }}</div>
        <div class="sub-title gray-text-color">{{ content.sanctions }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    data() {
        return {
            content: this.$lang === 'en' ? en.cgu.accessAndUse : fr.cgu.accessAndUse
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
