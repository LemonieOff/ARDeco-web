<template>
    <div class="question-content background-card" id="where-are-models-from">
        <div id="modelsOriginsTitle" class="title underline">{{ content.modelsOriginsTitle }}</div>
        <div id="modelsOriginsText" class="sub-title gray-text-color">{{ content.modelsOriginsText }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "WhereDoModelsComeFrom",
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
