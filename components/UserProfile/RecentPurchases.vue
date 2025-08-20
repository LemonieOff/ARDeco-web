<template>
    <div class="recent-purchases">
        <div id="yourRecentPurchaces" class="sub-title">{{ content.yourRecentPurchaces }}</div>
        <div class="empty-text-content"></div>
    </div>
</template>

<script>
export default {
    name: "RecentPurchases",
    data() {
        return {
            content: this.$content.profile,
        }
    },
}
</script>

<style lang="scss" scoped>
@use "@/styles/ProfileSettings.scss";
</style>
