<template>
    <div class="profile-page-content top-left-yellow-fade-background" id="valentin-profile">
        <div class="sub-content">
            <div class="personal-content card">
                <img class="hobby" src="@/assets/images/profile-hobbies/football.png" alt="Football">
                <a href="https://www.linkedin.com/in/valentin-astic-85a514205/" target="_blank">
                    <img class="profile-picture" src="@/assets/images/profile-pictures/VALENTIN_.png" alt="Valentin Astic">
                </a>
                <div class="black-separation-bar"></div>
                <div class="orange-separation-bar"></div>
                <div class="name">Valentin Astic</div>
                <div id="role-valentin" class="role">{{ content.role }}</div>
            </div>
            <div class="timeline-content">
                <div class="year-2020">2020</div>
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>
                <div class="timeline-inactive"></div>
                <div class="timeline-active">
                    <div class="year-bubble-active"></div>
                    <img class="internship-logo" src="@/assets/images/compagny-logos/BetaoLogo.png" alt="Betao">
                    <div id="internshipRole1-valentin" class="internship-role">{{ content.internshipRole1 }}</div>
                </div>
                <div class="timeline-inactive">
                    <NuxtLink :href="epitechSrc" target="_blank">
                        <img class="epitech-logo-timeline" src="@/assets/images/profile-pictures/Epitech.png" alt="Epitech">
                    </NuxtLink>
                </div>
                <div class="timeline-active">
                    <div class="year-bubble-active"></div>
                    <img class="internship-logo" src="@/assets/images/compagny-logos/MathaLogo.png" alt="Matha">
                    <div id="internshipRole2-valentin" class="internship-role">{{ content.internshipRole2 }}</div>
                </div>
                <div class="timeline-active">
                    <div class="end-year-bubble-active"></div>
                    <img class="internship-logo" src="@/assets/images/compagny-logos/BetaoLogo.png" alt="Betao">
                    <div id="internshipRole3-valentin" class="internship-role">{{ content.internshipRole3 }}</div>
                </div>
                <div class="year-2023">2023</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileValentin",
    data() {
        return {
            content: this.$content.profilePages.valentin,
            epitechSrc: this.$lang === 'fr' ? "https://www.epitech.eu" : "https://international.epitech.eu"
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/TeamPage.scss';
</style>
