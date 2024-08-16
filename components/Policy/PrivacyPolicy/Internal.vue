<template>
    <div class="question-content background-card">
        <div class="title underline">{{content.title}}</div>
        <div class="sub-title gray-text-color">{{content.collection}}</div>
        <div class="sub-title gray-text-color">{{content.dataTypeCart}}</div>
        <div class="sub-title gray-text-color">{{content.dataTypeFavorites}}</div>
        <div class="sub-title gray-text-color">{{content.dataTypeTickets}}</div>
        <div class="sub-title gray-text-color">{{content.usage}}</div>
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
        this.content = this.$lang === 'en' ? en.privacyPolicy.internal : fr.privacyPolicy.internal;
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
