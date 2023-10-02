<template>
    <div class="h-screen">
        <div class="title"> Your profile </div>
        <div class="content">
            <div class="favorite-themes">
                <div class="sub-title">
                    Your favorites themes
                </div>
                <div class="empty-text-content"></div>
            </div>
            <div class="profile-details">
                <img class="profile-picture" src="../../assets/images/profile-settings/default-profile-picture.png">
                <div class="first-and-last-names">First and last name</div>
            </div>
            <div class="recent-purchases">
                <div class="sub-title">Your recent purchases</div>
                <div class="empty-text-content"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileSettings"
}
</script>

<style lang="scss" scoped>
@import "~/styles/ProfileSettings.scss";
</style>
