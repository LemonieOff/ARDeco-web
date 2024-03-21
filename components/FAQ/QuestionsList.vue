<template>
    <div class="faq-page-content">
        <div id="projectDetailsTitle" class="main-title">{{ content.projectDetailsTitle }}</div>
        <div class="sub-content">
            <div class="faq-into-question background-card">
                <div id="findYourAnswersSubtitle" class="sub-title gray-text-color">{{ content.findYourAnswersSubtitle }}</div>
            </div>
            <div class="questions-list">
                <a id="q-whatIsArdecoTitle" class="text gray-text-color background-card question-card" href="#what-is-ardeco"> {{ content.whatIsArdecoTitle }}
                    <img class="question-icon" src="../../assets/images/questions-icons/what-is-ardeco.png">
                </a>
                <a id="q-howToUseArdecoTitle" class="text gray-text-color background-card question-card" href="#how-to-use-ardeco"> {{ content.howToUseArdecoTitle }}
                    <img class="question-icon" src="../../assets/images/questions-icons/how-to-use-ardeco.png">
                </a>
                <a id="q-furnitureChoiceTitle" class="text gray-text-color background-card question-card" href="#how-are-furnitures-chosen"> {{ content.furnitureChoiceTitle }}
                    <img class="question-icon" src="../../assets/images/questions-icons/furniture.png">
                </a>
            </div>
            <div class="questions-list">
                <a id="q-modelsOriginsTitle" class="text gray-text-color background-card question-card" href="#where-are-models-from"> {{ content.modelsOriginsTitle }}
                    <img class="question-icon" src="../../assets/images/questions-icons/models.png">
                </a>
                <a id="q-whyUseArdecoTitle" class="text gray-text-color background-card question-card" href="#why-choose-ardeco"> {{ content.whyUseArdecoTitle }}
                    <img class="question-icon" src="../../assets/images/questions-icons/why-choose-ardeco.png">
                </a>
                <a id="q-inAppPurchaseTitle" class="text gray-text-color background-card question-card" href="#in-app-purchases"> {{ content.inAppPurchaseTitle }}
                    <img class="question-icon" src="../../assets/images/questions-icons/in-app-purchases.png">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "QuestionsList",
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
        this.content = lang === 'en' ? en.productPages : fr.productPages;

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
