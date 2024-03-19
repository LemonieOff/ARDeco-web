<template>
    <div class="question-content background-card" id="what-is-ardeco">
        <div id="whatIsArdecoTitle" class="title underline" style="margin-top: 500px;">{{content}}</div>
        <div id="whatIsArdecoText" class="sub-title gray-text-color"></div>
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
        this.content = lang === 'en' ? en.privacyPolicy : fr.privacyPolicy;

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
