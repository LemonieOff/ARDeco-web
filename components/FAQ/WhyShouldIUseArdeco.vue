<template>
    <div class="question-content background-card" id="why-choose-ardeco">
        <div id="whyUseArdecoTitle" class="title underline">{{ content.whyUseArdecoTitle }}</div>
        <div id="whyUseArdecoText" class="sub-title gray-text-color">{{ content.whyUseArdecoText }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "WhyShouldIUseArdeco",
    data() {
        return {
            content: {}
        }
    },
    mounted() {
        // Set the content variable to the correct language
        this.content = this.$lang === 'en' ? en.productPages : fr.productPages;
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
