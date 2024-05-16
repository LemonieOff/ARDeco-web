<template>
    <div>
        <div class="content">
            <FavoriteThemes :urlLang=urlLang></FavoriteThemes>
            <img v-bind:src="imageSrc" class="profile-picture" alt="Profile picture">
            <RecentPurchases :urlLang=urlLang></RecentPurchases>
        </div>
    </div>
</template>

<script>
import FavoriteThemes from "~/components/UserProfile/FavoriteThemes.vue"
import RecentPurchases from "~/components/UserProfile/RecentPurchases.vue"
import "assets/images/profile-settings/default-profile-picture.png";

export default {
    name: "ProfileSettings",
    setup() {
        const imageSrc = ref("https://api.ardeco.app/profile_pictures/0.png");

        return {
            imageSrc
        }
    },
    props: {
        urlLang: String | null
    },
    inject: ['profile'],
    components: {
        FavoriteThemes,
        RecentPurchases
    },
    watch: {
        profile() {
            console.log("test");
            if (this.profile) {
                this.imageSrc = `https://api.ardeco.app/profile_pictures/${this.profile.profile_picture_id}.png`;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "/styles/ProfileSettings.scss";
</style>
