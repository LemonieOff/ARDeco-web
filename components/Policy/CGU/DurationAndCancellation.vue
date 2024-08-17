<template>
    <div class="question-content background-card">
        <div class="title underline">{{ content.title }}</div>
        <div class="sub-title gray-text-color">{{ content.duration }}</div>
        <div class="sub-title gray-text-color">{{ content.cancellation }}</div>
        <div class="sub-title gray-text-color">{{ content.deletion }}</div>
        <div class="sub-title gray-text-color">{{ content.responsibility }}</div>
        <div class="sub-title gray-text-color">{{ content.application }}</div>
        <div class="sub-title gray-text-color">{{ content.responsibility2 }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    data() {
        return {
            content: this.$lang === 'en' ? en.cgu.durationAndCancellation : fr.cgu.durationAndCancellation
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
