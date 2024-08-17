<template>
    <div class="question-content background-card">
        <div class="title underline">{{ content.title }}</div>
        <div class="sub-title gray-text-color">{{ content.content }}</div>
        <div class="sub-title gray-text-color">{{ content.license }}</div>
        <div class="sub-title gray-text-color">{{ content.sanctions }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    data() {
        return {
            content: this.$lang === 'en' ? en.cgu.intellectualProperty : fr.cgu.intellectualProperty
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
