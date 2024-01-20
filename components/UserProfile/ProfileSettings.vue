<template>
    <div>
        <div class="title"> Your profile </div>
        <div class="content">
            <FavoriteThemes></FavoriteThemes>
            <ProfileDetails></ProfileDetails>
            <RecentPurchases></RecentPurchases>
        </div>
    </div>
</template>

<script>
import FavoriteThemes from "~/components/UserProfile/FavoriteThemes.vue"
import ProfileDetails from "~/components/UserProfile/ProfileDetails.vue"
import RecentPurchases from "~/components/UserProfile/RecentPurchases.vue"
export default {
    name: "ProfileSettings",
    components: {
        FavoriteThemes,
        ProfileDetails,
        RecentPurchases
    }
}
</script>

<style lang="scss" scoped>
@import "~/styles/ProfileSettings.scss";
</style>
