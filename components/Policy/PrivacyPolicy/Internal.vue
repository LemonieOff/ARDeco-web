<template>
    <div class="question-content background-card">
        <div class="title underline">{{content.title}}</div>
        <div class="sub-title gray-text-color">{{content.collection}}</div>
        <div class="sub-title gray-text-color">{{content.dataTypeCart}}</div>
        <div class="sub-title gray-text-color">{{content.dataTypeFavorites}}</div>
        <div class="sub-title gray-text-color">{{content.dataTypeTickets}}</div>
        <div class="sub-title gray-text-color">{{content.usage}}</div>
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
            langPrefix: ""
        }
    },
    mounted() {
        let lang = this.urlLang;
        console.log(lang);

        // If lang selector is not passed in url, get the user's one or set it to french
        if (lang !== 'en' && lang !== 'fr') {
            if (localStorage.getItem('lang')) {
                lang = localStorage.getItem('lang');
            } else {
                lang = 'fr';
            }
        }

        // Set the content variable to the correct language
        this.content = lang === 'en' ? en.privacyPolicy.internal : fr.privacyPolicy.internal;

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
