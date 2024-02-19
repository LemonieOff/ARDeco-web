<template>
    <div class="question-content background-card" id="how-to-use-ardeco">
        <div id="howToUseArdecoTitle" class="title underline"></div>
        <div id="howToUseArdecoText" class="sub-title gray-text-color"></div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "HowToUseArdeco",
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
            document.getElementById('howToUseArdecoTitle').innerText = en.productPages.howToUseArdecoTitle
            document.getElementById('howToUseArdecoText').innerText = en.productPages.howToUseArdecoText
        } else {
            document.getElementById('howToUseArdecoTitle').innerText = fr.productPages.howToUseArdecoTitle
            document.getElementById('howToUseArdecoText').innerText = fr.productPages.howToUseArdecoText
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
