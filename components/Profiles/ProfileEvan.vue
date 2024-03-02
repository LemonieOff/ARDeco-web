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
                <!-- Semestre 1 (Tech 1 - partie 1) -->
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>

                <!-- Semestre 2 (Tech 1 - partie 2) -->
                <div class="timeline-inactive"></div>

                <!-- Semestre 3 (Tech 2 - partie 1) -->
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>

                <!-- Semestre 4 (Tech 2 - partie 2) -->
                <div class="timeline-inactive"></div>

                <!-- Semestre 5 (Tech 3 - partie 1) -->
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>

                <!-- Semestre 6 (Tech 3 - partie 2) -->
                <div class="timeline-active">
                    <div class="year-invisible-bubble"></div>
                    <img class="internship-logo" src="../../assets/images/compagny-logos/BetaoLogo.png">
                    <div id="internshipRole1-evan" class="internship-role"></div>
                </div>

                <!-- Semestre 7 (Tech 4 - partie 1) -->
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>

                <!-- Semestre 8 (Tech 4 - partie 2) -->
                <div class="timeline-inactive">
                    <div class="end-year-bubble-inactive"></div>
                </div>

                <div class="year-2023">2024</div>
            </div>
        </div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "ProfileEvan",
    props: {
        urlLang: String
    },
    mounted() {
        let lang = this.urlLang
        if (lang == null) {
            lang = localStorage.getItem('lang')
        }

        if (location.href.includes("/fr/") && localStorage.getItem('lang') == "en") {
            location.href = location.href.replace("/fr/", "/en/")
        } else if (location.href.includes("/en/") && localStorage.getItem('lang') == "fr") {
            location.href = location.href.replace("/en/", "/fr/")
        }

        if (lang == 'en') {
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
