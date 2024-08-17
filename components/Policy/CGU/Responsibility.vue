<template>
    <div class="question-content background-card">
        <div class="title underline">{{ content.title }}</div>
        <div class="sub-title gray-text-color">{{ content.security }}</div>
        <div class="sub-title gray-text-color">{{ content.limitation }}</div>
        <div class="sub-title gray-text-color">{{ content.content }}</div>
        <div class="sub-title gray-text-color">{{ content.sanctions }}</div>
        <div class="sub-title gray-text-color">{{ content.responsibility }}</div>
        <div class="sub-title gray-text-color">{{ content.userResponsibility }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    data() {
        return {
            content: this.$lang === 'en' ? en.cgu.responsibility : fr.cgu.responsibility
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
