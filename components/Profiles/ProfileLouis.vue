<template>
    <div class="profile-page-content bottom-left-yellow-fade-background" id="louis-profile">
        <div class="sub-content">
            <div class="personal-content card">
                <img class="hobby" src="@/assets/images/profile-hobbies/croissant.png" alt="Croissant">
                <a href="https://www.linkedin.com/in/louis-villedieu-8866091b9/" target="_blank">
                    <img class="profile-picture" src="@/assets/images/profile-pictures/LOUIS_.png" alt="Louis Villedieu">
                </a>
                <div class="black-separation-bar"></div>
                <div class="orange-separation-bar"></div>
                <div class="name">Louis Villedieu</div>
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
                    <img class="internship-logo" src="@/assets/images/compagny-logos/BCAExpertiseLogo.png" alt="BCA Expertise">
                    <div id="internshipRole1-louis" class="internship-role">{{ content.internshipRole1 }}</div>
                </div>
                <div class="timeline-inactive">
                    <NuxtLink :href="epitechSrc" target="_blank">
                        <img class="epitech-logo-timeline" src="@/assets/images/profile-pictures/Epitech.png" alt="Epitech">
                    </NuxtLink>
                </div>
                <div class="timeline-active">
                    <div class="year-bubble-active"></div>
                    <img class="internship-logo" src="@/assets/images/compagny-logos/VersityLogo.png" alt="Versity">
                    <div id="internshipRole2-louis" class="internship-role">{{ content.internshipRole2 }}</div>
                </div>
                <div class="timeline-active">
                    <div class="end-year-bubble-active"></div>
                    <img class="internship-logo" src="@/assets/images/compagny-logos/WorkingGameLogo.png" alt="Working Game">
                    <div id="internshipRole3-louis" class="internship-role">{{ content.internshipRole3 }}</div>
                </div>
                <div class="year-2023">2023</div>
            </div>
        </div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "ProfileLouis",
    data() {
        return {
            content: this.$lang === 'en' ? en.profilePages.louis : fr.profilePages.louis,
            epitechSrc: this.$lang === 'fr' ? "https://www.epitech.eu" : "https://international.epitech.eu"
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/TeamPage.scss';
</style>
