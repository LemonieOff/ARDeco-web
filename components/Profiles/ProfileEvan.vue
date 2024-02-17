<template>
    <div class="profile-page-content top-right-yellow-fade-background" id="evan-profile">
        <div class="sub-content">
            <div class="personal-content card">
                <img class="hobby" src="../../assets/images/profile-hobbies/controller.png">
                <a href="https://www.linkedin.com/in/evan-blachier-65036120b/">
                    <img class="profile-picture" src="../../assets/images/profile-pictures/EVAN_.png">
                </a>
                <div class="black-separation-bar"></div>
                <div class="orange-separation-bar"></div>
                <div class="name">Evan Blachier</div>
                <div id="role-evan" class="role"></div>
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
                    <a href="https://www.epitech.eu/en/">
                        <img class="epitech-logo-timeline" src="../../assets/images/profile-pictures/Epitech.png">
                    </a>
                </div>
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>
                <div class="timeline-active">
                    <div class="end-year-bubble-active"></div>
                    <img class="internship-logo" src="../../assets/images/compagny-logos/BetaoLogo.png">
                    <div id="internshipRole1-evan" class="internship-role"></div>
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
    name: "ProfileEvan",
    mounted() {
        let lang = localStorage.getItem('lang')
        if (lang == null || lang == 'en' || localStorage.getItem('userID') == null) {
            document.getElementById('role-evan').innerText = en.profilePages.evan.role
            document.getElementById('internshipRole1-evan').innerText = en.profilePages.evan.internshipRole1
        } else {
            document.getElementById('role-evan').innerText = fr.profilePages.evan.role
            document.getElementById('internshipRole1-evan').innerText = fr.profilePages.evan.internshipRole1
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/TeamPage.scss';
</style>
