<template>
    <div class="question-content background-card" id="how-are-furnitures-chosen">
        <div id="furnitureChoiceTitle" class="title underline">{{ content.furnitureChoiceTitle }}</div>
        <div id="furnitureChoiceText" class="sub-title gray-text-color">{{ content.furnitureChoiceText }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "HowAreMyFurnitureChosen",
    data() {
        return {
            content: this.$lang === 'en' ? en.productPages : fr.productPages
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
