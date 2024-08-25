<template>
    <div class="faq-page-content">
        <div id="projectDetailsTitle" class="text-center font-bold text-xl md:text-4xl my-8">{{ content.projectDetailsTitle }}</div>
        <div class="sub-content">
            <div class="faq-into-question background-card">
                <div id="findYourAnswersSubtitle" class="sub-title gray-text-color">
                    {{ content.findYourAnswersSubtitle }}
                </div>
            </div>
            <div class="questions-list">
                <a id="q-whatIsArdecoTitle" class="text gray-text-color background-card question-card"
                   href="#what-is-ardeco"> {{ content.whatIsArdecoTitle }}
                    <img class="question-icon" src="@/assets/images/questions-icons/what-is-ardeco.png" alt="What is ARDeco">
                </a>
                <a id="q-howToUseArdecoTitle" class="text gray-text-color background-card question-card"
                   href="#how-to-use-ardeco"> {{ content.howToUseArdecoTitle }}
                    <img class="question-icon" src="../../assets/images/questions-icons/how-to-use-ardeco.png" alt="How to use">
                </a>
                <a id="q-furnitureChoiceTitle" class="text gray-text-color background-card question-card"
                   href="#how-are-furnitures-chosen"> {{ content.furnitureChoiceTitle }}
                    <img class="question-icon" src="../../assets/images/questions-icons/furniture.png" alt="Furniture">
                </a>
            </div>
            <div class="questions-list">
                <a id="q-modelsOriginsTitle" class="text gray-text-color background-card question-card"
                   href="#where-are-models-from"> {{ content.modelsOriginsTitle }}
                    <img class="question-icon" src="../../assets/images/questions-icons/models.png" alt="Models">
                </a>
                <a id="q-whyUseArdecoTitle" class="text gray-text-color background-card question-card"
                   href="#why-choose-ardeco"> {{ content.whyUseArdecoTitle }}
                    <img class="question-icon" src="../../assets/images/questions-icons/why-choose-ardeco.png" alt="Why choose ardeco">
                </a>
                <a id="q-inAppPurchaseTitle" class="text gray-text-color background-card question-card"
                   href="#in-app-purchases"> {{ content.inAppPurchaseTitle }}
                    <img class="question-icon" src="../../assets/images/questions-icons/in-app-purchases.png" alt="In-app purchase">
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
    data() {
        return {
            content: this.$lang === 'en' ? en.productPages : fr.productPages
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/FAQPage.scss';
</style>
