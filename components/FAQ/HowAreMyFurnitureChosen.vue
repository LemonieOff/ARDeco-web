<template>
    <div class="question-content background-card" id="how-are-furnitures-chosen">
        <div id="furnitureChoiceTitle" class="title underline"></div>
        <div id="furnitureChoiceText" class="sub-title gray-text-color"></div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "HowAreMyFurnitureChosen",
    mounted() {
        let lang = localStorage.getItem('lang')
        if (lang == null || lang == 'en') {
            document.getElementById('furnitureChoiceTitle').innerText = en.productPages.furnitureChoiceTitle
            document.getElementById('furnitureChoiceText').innerText = en.productPages.furnitureChoiceText
        } else {
            document.getElementById('furnitureChoiceTitle').innerText = fr.productPages.furnitureChoiceTitle
            document.getElementById('furnitureChoiceText').innerText = fr.productPages.furnitureChoiceText
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
