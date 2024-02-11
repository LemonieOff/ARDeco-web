<template>
    <div class="question-content background-card" id="what-is-ardeco">
        <div id="whatIsArdecoTitle" class="title underline"></div>
        <div id="whatIsArdecoText" class="sub-title gray-text-color"></div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "WhatIsArdeco",
    mounted() {
        let lang = localStorage.getItem('lang')
        if (lang == null || lang == 'en') {
            document.getElementById('whatIsArdecoTitle').innerText = en.productPages.whatIsArdecoTitle
            document.getElementById('whatIsArdecoText').innerText = en.productPages.whatIsArdecoText
        } else {
            document.getElementById('whatIsArdecoTitle').innerText = fr.productPages.whatIsArdecoTitle
            document.getElementById('whatIsArdecoText').innerText = fr.productPages.whatIsArdecoText
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/FAQPage.scss';
</style>
