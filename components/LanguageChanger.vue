<template>
    <button id="languageChanger" @click="changeLanguage">{{ content }}</button>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "LanguageChanger",
    data() {
        return {
            content: this.$lang === "en" ? en.languageChangerText : fr.languageChangerText
        }
    },
    methods: {
        changeLanguage() {
            if (this.$langPrefix !== "/") {
                if (this.$lang === "fr") {
                    location.href = location.href.replace(/\/fr\/?/, "/en/");
                } else if (this.$lang === "en") {
                    location.href = location.href.replace(/\/en\/?/, "/fr/");
                }
            } else {
                this.$changeLang("toggle");
                location.reload();
            }
        }
    },
};
</script>

<style scoped>
@import '@/styles/Navbar.scss';

#languageChanger {
    position: fixed;
    border-radius: 10px;
    background-color: rgb(98, 0, 255);
    right: 50px;
    bottom: 50px;
    min-width: 150px;
    min-height: 30px;
}

</style>
