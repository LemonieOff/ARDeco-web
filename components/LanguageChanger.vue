<template>
    <button id="languageChanger" @click="changeLanguage"></button>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "LanguageChanger",
    mounted() {
        let lang = localStorage.getItem('lang')
        if (lang == 'en') {
            document.getElementById('languageChanger').innerText = en.languageChangerText
        } else {
            document.getElementById('languageChanger').innerText = fr.languageChangerText
        }
    },
    methods: {
        changeLanguage() {
            let lang = localStorage.getItem('lang')
            if (lang == "fr") {
                localStorage.setItem('lang', "en")
                location.href = location.href.replace("/en/", "/fr/")
            } else {
                localStorage.setItem('lang', "fr")
                location.href = location.href.replace("/fr/", "/en/")
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