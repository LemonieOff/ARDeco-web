<template>
    <div class="faq-page-content">
        <div class="main-title"> Discover the details of our project</div>
        <div class="sub-content">
            <div class="faq-into-question background-card">
                <div class="sub-title gray-text-color">Find the answers to your questions  in our FAQ !</div>
            </div>
            <div class="questions-list">
                <a class="text gray-text-color background-card question-card" href="#what-is-ardeco"> What is ARDeco ?
                    <img class="question-icon" src="../../assets/images/questions-icons/what-is-ardeco.png">
                </a>
                <a class="text gray-text-color background-card question-card" href="#how-to-use-ardeco"> How to use ARDeco ?
                    <img class="question-icon" src="../../assets/images/questions-icons/how-to-use-ardeco.png">
                </a>
                <a class="text gray-text-color background-card question-card" href="#how-are-furnitures-chosen"> How are my furniture chosen ?
                    <img class="question-icon" src="../../assets/images/questions-icons/furniture.png">
                </a>
            </div>
            <div class="questions-list">
                <a class="text gray-text-color background-card question-card" href="#where-are-models-from"> Where do the models come from ?
                    <img class="question-icon" src="../../assets/images/questions-icons/models.png">
                </a>
                <a class="text gray-text-color background-card question-card" href="#why-choose-ardeco"> Why should I use ARDeco ?
                    <img class="question-icon" src="../../assets/images/questions-icons/why-choose-ardeco.png">
                </a>
                <a class="text gray-text-color background-card question-card" href="#in-app-purchases"> Can I buy furniture from the app ?
                    <img class="question-icon" src="../../assets/images/questions-icons/in-app-purchases.png">
                </a>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "QuestionsList"
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
