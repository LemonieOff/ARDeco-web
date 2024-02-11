<template>
    <div class="question-content background-card" id="in-app-purchases">
        <div id="inAppPurchaseTitle" class="title underline"></div>
        <div id="inAppPurchaseText" class="sub-title gray-text-color"></div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "InAppPurchaces",
    mounted() {
        let lang = localStorage.getItem('lang')
        if (lang == null || lang == 'en') {
            document.getElementById('inAppPurchaseTitle').innerText = en.productPages.inAppPurchaseTitle
            document.getElementById('inAppPurchaseText').innerText = en.productPages.inAppPurchaseText
        } else {
            document.getElementById('inAppPurchaseTitle').innerText = fr.productPages.inAppPurchaseTitle
            document.getElementById('inAppPurchaseText').innerText = fr.productPages.inAppPurchaseText
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
