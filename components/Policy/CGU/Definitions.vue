<template>
    <div class="question-content background-card">
        <div class="title underline">{{ content.title }}</div>
        <div class="sub-title gray-text-color"><span class="font-bold">{{ content.userTitle }}</span> : {{ content.userText }}</div>
        <div class="sub-title gray-text-color"><span class="font-bold">{{ content.serviceTitle }}</span> : {{ content.serviceText }}</div>
        <div class="sub-title gray-text-color"><span class="font-bold">{{ content.userContentTitle }}</span> : {{ content.userContentText }}</div>
        <div class="sub-title gray-text-color"><span class="font-bold">{{ content.userAccountTitle }}</span> : {{ content.userAccountText }}</div>
        <div class="sub-title gray-text-color"><span class="font-bold">{{ content.editorTitle }}</span> : {{ content.editorText }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "",
    data() {
        return {
            content: {}
        }
    },
    mounted() {
        // Set the content variable to the correct language
        this.content = this.$lang === 'en' ? en.cgu.definitions : fr.cgu.definitions;
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
