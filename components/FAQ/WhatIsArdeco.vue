<template>
    <div class="question-content background-card" id="what-is-ardeco">
        <div id="whatIsArdecoTitle" class="title underline"></div>
        <div id="whatIsArdecoText" class="sub-title gray-text-color"></div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "WhatIsArdeco",
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
            document.getElementById('whatIsArdecoTitle').innerText = en.productPages.whatIsArdecoTitle
            document.getElementById('whatIsArdecoText').innerText = en.productPages.whatIsArdecoText
        } else {
            document.getElementById('whatIsArdecoTitle').innerText = fr.productPages.whatIsArdecoTitle
            document.getElementById('whatIsArdecoText').innerText = fr.productPages.whatIsArdecoText
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
