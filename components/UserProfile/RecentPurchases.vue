<template>
    <div class="recent-purchases">
        <div id="yourRecentPurchaces" class="sub-title">Your recent purchases</div>
        <div class="empty-text-content"></div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "RecentPurchases",
    mounted() {
        let lang = localStorage.getItem('lang')
        if (lang == null || lang == 'en' || localStorage.getItem('userID') == null) {
            document.getElementById('yourRecentPurchaces').innerText = en.profile.yourRecentPurchaces
        } else {
            document.getElementById('yourRecentPurchaces').innerText = fr.profile.yourRecentPurchaces
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/styles/ProfileSettings.scss";
</style>
