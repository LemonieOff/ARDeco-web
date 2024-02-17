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
    mounted() {
        let lang = localStorage.getItem('lang')
        if (lang == null || lang == 'en' || localStorage.getItem('userID') == null) {
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
