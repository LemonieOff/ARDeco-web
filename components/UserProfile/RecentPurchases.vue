<template>
    <div class="recent-purchases">
        <div id="yourRecentPurchaces" class="sub-title">{{ content.yourRecentPurchaces }}</div>
        <div class="empty-text-content"></div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "RecentPurchases",
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
