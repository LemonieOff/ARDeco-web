<template>
    <div class="profile-page-content bg-gradient-to-b from-port-brown to-AR-Beige dark:from-AR-Dark-Grey dark:to-AR-Dark-Grey" id="evan-profile">
        <div class="sub-content">
            <div class="personal-content card">
                <img class="hobby" src="../../assets/images/profile-hobbies/controller.png" alt="Video game controller">
                <a href="https://www.linkedin.com/in/evan-blachier-65036120b/">
                    <img class="profile-picture" src="../../assets/images/profile-pictures/EVAN_.png" alt="Evan Blachier">
                </a>
                <div class="black-separation-bar"></div>
                <div class="orange-separation-bar"></div>
                <div class="name">Evan Blachier</div>
                <div id="role-evan" class="role">{{ content.role }}</div>
            </div>
            <div class="timeline-content">
                <div class="year-2020">2020</div>
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>
                <div class="timeline-inactive"></div>
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>
                <div class="timeline-inactive">
                    <NuxtLink :href="epitechSrc" target="_blank">
                        <img class="epitech-logo-timeline" src="../../assets/images/profile-pictures/Epitech.png" alt="Epitech">
                    </NuxtLink>
                </div>
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>
                <div class="timeline-active">
                    <div class="end-year-bubble-active"></div>
                    <img class="internship-logo" src="../../assets/images/compagny-logos/BetaoLogo.webp" alt="Betao">
                    <div id="internshipRole1-evan" class="internship-role">{{ content.internshipRole1 }}</div>
                </div>
                <div class="year-2023">2024</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileEvan",
    data() {
        return {
            content: this.$content.profilePages.evan,
            epitechSrc: this.$lang === 'fr' ? "https://www.epitech.eu" : "https://international.epitech.eu"
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/styles/TeamPage.scss';
</style>
