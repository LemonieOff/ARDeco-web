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
    props: {
        urlLang: String
    },
    mounted() {
        let lang = this.urlLang
        if (lang == null) {
            lang = localStorage.getItem('lang')
        }

        if (location.href.includes("/fr/") && localStorage.getItem('lang') == "en") {
            location.href = location.href.replace("/fr/", "/en/")
        } else if (location.href.includes("/en/") && localStorage.getItem('lang') == "fr") {
            location.href = location.href.replace("/en/", "/fr/")
        }

        if (lang == 'en') {
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
