<template>
    <div class="question-content background-card" id="why-choose-ardeco">
        <div id="whyUseArdecoTitle" class="title underline"></div>
        <div id="whyUseArdecoText" class="sub-title gray-text-color"></div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "WhyShouldIUseArdeco",
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
            document.getElementById('whyUseArdecoTitle').innerText = en.productPages.whyUseArdecoTitle
            document.getElementById('whyUseArdecoText').innerText = en.productPages.whyUseArdecoText
        } else {
            document.getElementById('whyUseArdecoTitle').innerText = fr.productPages.whyUseArdecoTitle
            document.getElementById('whyUseArdecoText').innerText = fr.productPages.whyUseArdecoText
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
