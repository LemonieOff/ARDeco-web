<template>
    <Head>
        <Title>ARDeco - {{ content.projectDetailsTitle }}</Title>
    </Head>
    <div class="mb-32">
        <h1 id="projectDetailsTitle" class="text-center font-bold text-xl md:text-4xl my-8">
            {{ content.projectDetailsTitle }}
        </h1>
        <div class="mx-auto">
            <div class="faq-into-question mt-16 text-center md:text-2xl mx-auto">
                <div id="findYourAnswersSubtitle" class="text-AR-Grey dark:text-AR-Beige">
                    {{ content.findYourAnswersSubtitle }}
                </div>
            </div>
            <div class="w-full mt-16 grid md:grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-y-4 xl:gap-y-8 justify-items-center">
                <QuestionCard id="q-whatIsArdecoTitle" img-alt="What is ARDeco"
                              img-src="images/question-icons/what-is.webp" link="#what-is-ardeco">
                    {{ content.whatIsArdecoTitle }}
                </QuestionCard>

                <QuestionCard id="q-howToUseArdecoTitle" img-alt="How to use"
                              img-src="images/question-icons/how-to-use.webp" link="#how-to-use-ardeco">
                    {{ content.howToUseArdecoTitle }}
                </QuestionCard>

                <QuestionCard id="q-furnitureChoiceTitle" img-alt="Furniture"
                              img-src="images/question-icons/furniture.webp" link="#how-are-furniture-chosen">
                    {{ content.furnitureChoiceTitle }}
                </QuestionCard>
                <QuestionCard id="q-modelsOriginsTitle" img-alt="Models" img-src="images/question-icons/models.webp"
                              link="#where-are-models-from">
                    {{ content.modelsOriginsTitle }}
                </QuestionCard>

                <QuestionCard id="q-whyUseArdecoTitle" img-alt="Why choose ardeco"
                              img-src="images/question-icons/why-choose.webp" link="#why-choose-ardeco">
                    {{ content.whyUseArdecoTitle }}
                </QuestionCard>

                <QuestionCard id="q-inAppPurchaseTitle" img-alt="In-app purchase"
                              img-src="images/question-icons/in-app-purchase.webp" link="#in-app-purchases">
                    {{ content.inAppPurchaseTitle }}
                </QuestionCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import QuestionCard from "@/components/FAQ/QuestionCard.server.vue";

const nuxtApp = useNuxtApp();

const content = ref(nuxtApp.$content.productPages);
</script>
