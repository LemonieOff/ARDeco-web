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
    mounted() {
        let lang = localStorage.getItem('lang')
        if (lang == null || lang == 'en') {
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
