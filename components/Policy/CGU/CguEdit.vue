<template>
    <div class="question-content background-card">
        <div class="title underline">{{ content.title }}</div>
        <div class="sub-title gray-text-color">{{ content.modification }}</div>
        <div class="sub-title gray-text-color">{{ content.acceptance }}</div>
        <div class="sub-title gray-text-color">{{ content.application }}</div>
        <div class="sub-title gray-text-color">{{ content.opposition }}</div>
        <div class="sub-title gray-text-color">{{ content.previous }}</div>
        <div class="sub-title gray-text-color">{{ content.opposition2 }}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "",
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: {},
            langPrefix: "/"
        }
    },
    mounted() {
        let lang = this.urlLang;

        // If lang selector is not passed in url, get the user's one or set it to french
        if (lang !== 'en' && lang !== 'fr') {
            const localStorageLang = localStorage.getItem('lang');
            if (localStorageLang) {
                lang = localStorageLang;
            } else {
                lang = 'fr';
            }
        }

        // Set the content variable to the correct language
        this.content = lang === 'en' ? en.cgu.cguEdit : fr.cgu.cguEdit;

        // Prefix for links
        if (location.href.includes("/fr/")) {
            this.langPrefix = "/fr/";
        } else if (location.href.includes("/en/")) {
            this.langPrefix = "/en/";
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
