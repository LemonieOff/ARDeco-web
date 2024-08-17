<template>
    <div class="question-content background-card" id="how-to-use-ardeco">
        <div id="howToUseArdecoTitle" class="title underline">{{ content.howToUseArdecoTitle }}</div>
        <div id="howToUseArdecoText" class="sub-title gray-text-color">{{ content.howToUseArdecoText }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "HowToUseArdeco",
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
