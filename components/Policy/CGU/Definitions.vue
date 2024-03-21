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
        this.content = lang === 'en' ? en.cgu.definitions : fr.cgu.definitions;

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
