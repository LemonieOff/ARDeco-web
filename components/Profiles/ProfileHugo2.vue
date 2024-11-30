<template>
    <div id="hugo2-profile" class="profile-page-content bg-AR-Beige dark:bg-AR-Dark-Grey">
        <div class="sub-content">
            <div class="personal-content card">
                <img alt="Croissant" class="hobby" src="@/assets/images/profile-hobbies/croissant.png">
                <a href="https://www.linkedin.com/in/hugo-delille-013544216/" target="_blank">
                    <img alt="Hugo Delille" class="profile-picture" src="@/assets/images/profile-pictures/HUGO2_.png">
                </a>
                <div class="black-separation-bar"></div>
                <div class="orange-separation-bar"></div>
                <div class="name">Hugo Delille</div>
                <div id="role-louis" class="role">{{ content.role }}</div>
            </div>
            <div class="timeline-content">
                <div class="year-2020">2020</div>
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>
                <div class="timeline-inactive"></div>
                <div class="timeline-active">
                    <div class="year-bubble-active"></div>
                    <img alt="BCA Expertise" class="internship-logo"
                         src="@/assets/images/compagny-logos/ActionSanteTravail.webp">
                    <div id="internshipRole1-louis" class="internship-role">{{ content.internshipRole1 }}</div>
                </div>
                <div class="timeline-inactive">
                    <NuxtLink :href="epitechSrc" target="_blank">
                        <img alt="Epitech" class="epitech-logo-timeline"
                             src="@/assets/images/profile-pictures/Epitech.png">
                    </NuxtLink>
                </div>
                <div class="timeline-active">
                    <div class="year-bubble-active"></div>
                    <img alt="Versity" class="internship-logo" src="@/assets/images/compagny-logos/Derklan.webp">
                    <div id="internshipRole2-louis" class="internship-role">{{ content.internshipRole2 }}</div>
                </div>
                <div class="timeline-active">
                    <div class="end-year-bubble-active"></div>
                </div>
                <div class="year-2023">2024</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileHugo2",
    data() {
        return {
            content: this.$content.profilePages.hugo2,
            epitechSrc: this.$lang === "fr" ? "https://www.epitech.eu" : "https://international.epitech.eu"
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/styles/TeamPage.scss';
</style>
