<template>
    <div class="faq-page-content">
        <div id="projectDetailsTitle" class="main-title">Discover the details of our project</div>
        <div class="sub-content">
            <div class="faq-into-question background-card">
                <div id="findYourAnswersSubtitle" class="sub-title gray-text-color">Find the answers to your questions  in our FAQ !</div>
            </div>
            <div class="questions-list">
                <a id="q-whatIsArdecoTitle" class="text gray-text-color background-card question-card" href="#what-is-ardeco"> What is ARDeco ?
                    <img class="question-icon" src="../../assets/images/questions-icons/what-is-ardeco.png">
                </a>
                <a id="q-howToUseArdecoTitle" class="text gray-text-color background-card question-card" href="#how-to-use-ardeco"> How to use ARDeco ?
                    <img class="question-icon" src="../../assets/images/questions-icons/how-to-use-ardeco.png">
                </a>
                <a id="q-furnitureChoiceTitle" class="text gray-text-color background-card question-card" href="#how-are-furnitures-chosen"> How are my furniture chosen ?
                    <img class="question-icon" src="../../assets/images/questions-icons/furniture.png">
                </a>
            </div>
            <div class="questions-list">
                <a id="q-modelsOriginsTitle" class="text gray-text-color background-card question-card" href="#where-are-models-from"> Where do the models come from ?
                    <img class="question-icon" src="../../assets/images/questions-icons/models.png">
                </a>
                <a id="q-whyUseArdecoTitle" class="text gray-text-color background-card question-card" href="#why-choose-ardeco"> Why should I use ARDeco ?
                    <img class="question-icon" src="../../assets/images/questions-icons/why-choose-ardeco.png">
                </a>
                <a id="q-inAppPurchaseTitle" class="text gray-text-color background-card question-card" href="#in-app-purchases"> Can I buy furniture from the app ?
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
    mounted() {
        let lang = localStorage.getItem('lang')
        if (lang == null || lang == 'en') {
            document.getElementById('projectDetailsTitle').innerText = en.productPages.projectDetailsTitle
            document.getElementById('findYourAnswersSubtitle').innerText = en.productPages.findYourAnswersSubtitle
            document.getElementById('q-furnitureChoiceTitle').innerText = en.productPages.furnitureChoiceTitle
            document.getElementById('q-whatIsArdecoTitle').innerText = en.productPages.whatIsArdecoTitle
            document.getElementById('q-howToUseArdecoTitle').innerText = en.productPages.howToUseArdecoTitle
            document.getElementById('q-modelsOriginsTitle').innerText = en.productPages.modelsOriginsTitle
            document.getElementById('q-whyUseArdecoTitle').innerText = en.productPages.whyUseArdecoTitle
            document.getElementById('q-inAppPurchaseTitle').innerText = en.productPages.inAppPurchaseTitle
        } else {
            document.getElementById('projectDetailsTitle').innerText = fr.productPages.projectDetailsTitle
            document.getElementById('findYourAnswersSubtitle').innerText = fr.productPages.findYourAnswersSubtitle
            document.getElementById('q-furnitureChoiceTitle').innerText = fr.productPages.furnitureChoiceTitle
            document.getElementById('q-whatIsArdecoTitle').innerText = fr.productPages.whatIsArdecoTitle
            document.getElementById('q-howToUseArdecoTitle').innerText = fr.productPages.howToUseArdecoTitle
            document.getElementById('q-modelsOriginsTitle').innerText = fr.productPages.modelsOriginsTitle
            document.getElementById('q-whyUseArdecoTitle').innerText = fr.productPages.whyUseArdecoTitle
            document.getElementById('q-inAppPurchaseTitle').innerText = fr.productPages.inAppPurchaseTitle
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
