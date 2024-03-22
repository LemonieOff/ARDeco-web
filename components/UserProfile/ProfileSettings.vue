<template>
    <div>
        <div class="content">
            <FavoriteThemes :urlLang=urlLang />
            <img class="profile-picture" src="../../assets/images/profile-settings/default-profile-picture.png">
            <!-- <ProfileDetails :urlLang=urlLang /> -->
            <RecentPurchases :urlLang=urlLang />
        </div>
    </div>
</template>

<script>
import FavoriteThemes from "~/components/UserProfile/FavoriteThemes.vue"
import ProfileDetails from "~/components/UserProfile/ProfileDetails.vue"
import RecentPurchases from "~/components/UserProfile/RecentPurchases.vue"
export default {
    name: "ProfileSettings",
    props: {
        urlLang: String | null
    },
    components: {
        FavoriteThemes,
        ProfileDetails,
        RecentPurchases
    }
}
</script>

<style lang="scss" scoped>
@import "/styles/ProfileSettings.scss";
</style>
