<template>
    <div class="profile-page-content bg-port-brown dark:bg-AR-Dark-Grey" id="hugo-profile">
        <div class="sub-content">
            <div class="personal-content card">
                <img class="hobby" src="../../assets/images/profile-hobbies/lemon.png" alt="Citron">
                <a href="https://www.linkedin.com/in/hugo-becart/" target="_blank">
                    <img class="profile-picture" src="../../assets/images/profile-pictures/HUGO_.png" alt="Hugo Becart">
                </a>
                <div class="name">Hugo Becart</div>
                <div id="role-hugo" class="role">{{ content.role }}</div>
            </div>
            <div class="timeline-content">
                <div class="year-2020">2020</div>
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>
                <div class="timeline-inactive"></div>
                <div class="timeline-active">
                    <div class="year-bubble-active"></div>
                    <img class="internship-logo" src="@/assets/images/compagny-logos/MyFlyingBoxLogo.webp" alt="My Flying Box">
                    <div id="internshipRole1-hugo" class="internship-role">{{ content.internshipRole1 }}</div>
                </div>
                <div class="timeline-inactive">
                    <NuxtLink :href="epitechSrc" target="_blank">
                        <img class="epitech-logo-timeline" src="@/assets/images/profile-pictures/Epitech.png" alt="Epitech">
                    </NuxtLink>
                </div>
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>
                <div class="timeline-active">
                    <div class="end-year-bubble-active"></div>
                    <img class="internship-logo" src="@/assets/images/compagny-logos/WorkingGameLogo.webp" alt="Working Game">
                    <div id="internshipRole2-hugo" class="internship-role">{{ content.internshipRole2 }}</div>
                </div>
                <div class="year-2023">2024</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileHugo",
    data() {
        return {
            content: this.$content.profilePages.hugo,
            epitechSrc: this.$lang === 'fr' ? "https://www.epitech.eu" : "https://international.epitech.eu"
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/TeamPage.scss';
</style>
