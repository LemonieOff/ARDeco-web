<template>
    <div>
        <div class="content">
            <FavoriteThemes :urlLang=this.urlLang />
            <ProfileDetails :urlLang=this.urlLang />
            <RecentPurchases :urlLang=this.urlLang />
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
        urlLang: String
    },
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
