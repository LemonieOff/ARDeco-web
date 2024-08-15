<template>
    <button id="languageChanger" @click="changeLanguage"></button>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "LanguageChanger",
    mounted() {
        if (this.$lang === 'en') {
            document.getElementById('languageChanger').innerText = en.languageChangerText
        } else {
            document.getElementById('languageChanger').innerText = fr.languageChangerText
        }
    },
    methods: {
        changeLanguage() {
            if (this.$langPrefix !== "/") {
                if (this.$lang === "fr") {
                    location.href = location.href.replace(/\/fr\/?/, "/en/")
                } else if (this.$lang === "en") {
                    location.href = location.href.replace(/\/en\/?/, "/fr/")
                }
            } else {
                if (this.$lang === "fr") {
                    localStorage.setItem('lang', "en");
                    location.reload();
                } else {
                    localStorage.setItem('lang', "fr");
                    location.reload();
                }
            }
        }
    },
};
</script>

<style scoped>
@import '~/styles/Navbar.scss';

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
