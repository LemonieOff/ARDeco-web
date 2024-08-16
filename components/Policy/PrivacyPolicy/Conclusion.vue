<template>
    <div class="question-content background-card">
        <div class="title underline">{{content.title}}</div>
        <div class="sub-title gray-text-color">{{content.usage}}</div>
        <div class="sub-title gray-text-color">{{content.share}}</div>
        <div class="sub-title gray-text-color">{{content.userRights}}</div>
        <div class="sub-title gray-text-color">{{content.keep}}</div>
        <div class="sub-title gray-text-color">{{content.acceptance}}</div>
        <div class="sub-title gray-text-color">{{content.questions}}</div>
        <div class="sub-title gray-text-color">{{content.update}}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    data() {
        return {
            content: {}
        }
    },
    mounted() {
        // Set the content variable to the correct language
        this.content = this.$lang === 'en' ? en.privacyPolicy.conclusion : fr.privacyPolicy.conclusion;
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
