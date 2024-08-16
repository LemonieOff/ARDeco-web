<template>
    <div class="favorite-themes">
        <div id="yourFavoriteThemes" class="sub-title">{{ content.yourFavoriteThemes }}</div>
        <div class="empty-text-content"></div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "FavoriteThemes",
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: {},
        }
    },
    mounted() {
        // Set the content variable to the correct language
        this.content = this.$lang === 'en' ? en.profile : fr.profile;
    }
}
</script>

<style lang="scss" scoped>
@import "~/styles/ProfileSettings.scss";
</style>
