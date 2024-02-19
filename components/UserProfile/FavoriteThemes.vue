<template>
    <div class="favorite-themes">
        <div id="yourFavoriteThemes" class="sub-title"> Your favorites themes </div>
        <div class="empty-text-content"></div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "FavoriteThemes",
    props: {
        urlLang: String
    },
    mounted() {
        let lang = this.urlLang
        if (lang == null) {
            lang = localStorage.getItem('lang')
        }

        if (location.href.includes("/fr/") && localStorage.getItem('lang') == "en") {
            location.href = location.href.replace("/fr/", "/en/")
        } else if (location.href.includes("/en/") && localStorage.getItem('lang') == "fr") {
            location.href = location.href.replace("/en/", "/fr/")
        }

        if (lang == 'en') {
            document.getElementById('yourFavoriteThemes').innerText = en.profile.yourFavoriteThemes
        } else {
            document.getElementById('yourFavoriteThemes').innerText = fr.profile.yourFavoriteThemes
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/styles/ProfileSettings.scss";
</style>
