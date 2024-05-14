<template xmlns="http://www.w3.org/1999/html">
    <div class="flex bg-port-brown flex-row border-ARgrey border-t-4 pb-8">
        <div class="w-1/3 flex flex-col justify-around mx-auto ml-14">
            <h1 id="stayTuned" class="font-display font-black text-ARgrey text-3xl mt-4 mb-5">
                {{ content.stayTuned }}</h1>
            <a class="font-display text-ARgrey text-xl font-bold decoration-0 mb-2 hover:text-white"
               href="https://instagram.com/ardeco_officiel">@ardeco_officiel</a>
            <a class="font-display text-ARgrey text-xl font-bold decoration-0 mb-2 hover:text-white"
               href="https://linkedin.com/company/ardeco-nice">ARdeco</a>
            <a class="font-display text-ARgrey text-xl font-bold decoration-0 mb-0 hover:text-white"
               href="mailto:ardeco.officiel@gmail.com">ardeco.officiel@gmail.com</a>
        </div>
        <div class="w-1/3 flex flex-col justify-around ml-14">
            <h1 id="rules" class="font-display font-black text-ARgrey text-3xl mt-1">{{ content.rules }}</h1>
            <a id="privacyPolicy" class="font-display text-ARgrey text-xl font-bold decoration-0 hover:text-white"
               :href="`${langPrefix}privacy-policy`">{{ content.privacyPolicy }}</a>
            <a id="cgu" class="font-display text-ARgrey text-xl font-bold decoration-0 hover:text-white"
               :href="`${langPrefix}cgu`">{{ content.cgu }}</a>
        </div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "Footer",
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
        this.content = lang === 'en' ? en.footer : fr.footer;

        // Prefix for links
        if (location.href.includes("/fr/")) {
            this.langPrefix = "/fr/";
        } else if (location.href.includes("/en/")) {
            this.langPrefix = "/en/";
        }
    },
}
</script>

<style scoped>

</style>
