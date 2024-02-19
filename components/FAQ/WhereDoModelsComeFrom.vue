<template>
    <div class="question-content background-card" id="where-are-models-from">
        <div id="modelsOriginsTitle" class="title underline"></div>
        <div id="modelsOriginsText" class="sub-title gray-text-color"></div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "WhereDoModelsComeFrom",
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
            document.getElementById('modelsOriginsTitle').innerText = en.productPages.modelsOriginsTitle
            document.getElementById('modelsOriginsText').innerText = en.productPages.modelsOriginsText
        } else {
            document.getElementById('modelsOriginsTitle').innerText = fr.productPages.modelsOriginsTitle
            document.getElementById('modelsOriginsText').innerText = fr.productPages.modelsOriginsText
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
