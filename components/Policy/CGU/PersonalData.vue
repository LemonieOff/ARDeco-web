<template>
    <div class="question-content background-card">
        <div class="title underline">{{ content.title }}</div>
        <div class="sub-title gray-text-color">{{ content.data }}</div>
        <div class="sub-title gray-text-color">{{ content.usage }}</div>
        <div class="sub-title gray-text-color">{{ content.duration }}</div>
        <div class="sub-title gray-text-color">{{ content.policy }}</div>
        <div class="sub-title gray-text-color">{{ content.opposition }}</div>
        <div class="sub-title gray-text-color">{{ content.deletion }}</div>
        <div class="sub-title gray-text-color">{{ content.responsibility }}</div>
        <div class="sub-title gray-text-color">{{ content.security }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "",
    data() {
        return {
            content: {}
        }
    },
    mounted() {
        // Set the content variable to the correct language
        this.content = this.$lang === 'en' ? en.cgu.personalData : fr.cgu.personalData;
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
