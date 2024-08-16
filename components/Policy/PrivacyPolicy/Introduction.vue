<template>
    <div class="question-content background-card">
        <div class="title underline">{{content.title}}</div>
        <div class="sub-title gray-text-color">{{content.objective}}</div>
        <div class="sub-title gray-text-color">{{content.engagement}}</div>
        <div class="sub-title gray-text-color">{{content.readCarefully}}</div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
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
        this.content = this.$lang === 'en' ? en.privacyPolicy.introduction : fr.privacyPolicy.introduction;
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
