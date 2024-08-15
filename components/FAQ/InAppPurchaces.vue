<template>
    <div class="question-content background-card" id="in-app-purchases">
        <div id="inAppPurchaseTitle" class="title underline">{{ content.inAppPurchaseTitle }}</div>
        <div id="inAppPurchaseText" class="sub-title gray-text-color">{{ content.inAppPurchaseText }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "InAppPurchaces",
    data() {
        return {
            content: {}
        }
    },
    mounted() {
        // Set the content variable to the correct language
        this.content = this.$lang === 'en' ? en.productPages : fr.productPages;
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
