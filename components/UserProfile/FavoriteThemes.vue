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
    mounted() {
        let lang = localStorage.getItem('lang')
        if (lang == null || lang == 'en') {
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
