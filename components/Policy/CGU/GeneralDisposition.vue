<template>
    <div class="question-content background-card">
        <div class="title underline">{{ content.title }}</div>
        <div class="sub-title gray-text-color">{{ content.nullity }}</div>
        <div class="sub-title gray-text-color">{{ content.nonRenunciation }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    data() {
        return {
            content: this.$lang === 'en' ? en.cgu.generalDisposition : fr.cgu.generalDisposition
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
