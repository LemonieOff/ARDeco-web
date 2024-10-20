<template>
    <div class="favorite-themes">
        <div id="yourFavoriteThemes" class="sub-title">{{ content.yourFavoriteThemes }}</div>
        <div class="empty-text-content"></div>
    </div>
</template>

<script>
export default {
    name: "FavoriteThemes",
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: this.$content.profile,
        }
    },
}
</script>

<style lang="scss" scoped>
@import "~/styles/ProfileSettings.scss";
</style>
