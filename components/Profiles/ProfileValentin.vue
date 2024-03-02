<template>
    <div class="profile-page-content bottom-right-yellow-fade-background" id="valentin-profile">
        <div class="sub-content">
            <div class="personal-content card">
                <img class="hobby" src="../../assets/images/profile-hobbies/football.png">
                <a href="https://www.linkedin.com/in/valentin-astic-85a514205/">
                    <img class="profile-picture" src="../../assets/images/profile-pictures/VALENTIN_.png">
                </a>
                <div class="black-separation-bar"></div>
                <div class="orange-separation-bar"></div>
                <div class="name">Valentin Astic</div>
                <div id="role-valentin" class="role"></div>
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
                <div class="timeline-active">
                    <div class="year-bubble-active"></div>
                    <img class="internship-logo" src="../../assets/images/compagny-logos/BetaoLogo.png">
                    <div id="internshipRole1-valentin" class="internship-role"></div>
                </div>

                <!-- Semestre 4 (Tech 2 - partie 2) -->
                <div class="timeline-inactive"></div>

                <!-- Semestre 5 (Tech 3 - partie 1) -->
                <div class="timeline-active">
                    <div class="year-bubble-active"></div>
                    <img class="internship-logo" src="../../assets/images/compagny-logos/MathaLogo.png">
                    <div id="internshipRole2-valentin" class="internship-role"></div>
                </div>

                <!-- Semestre 6 (Tech 3 - partie 2) -->
                <div class="timeline-active">
                    <div class="year-invisible-bubble"></div>
                    <img class="internship-logo" src="../../assets/images/compagny-logos/BetaoLogo.png">
                    <div id="internshipRole3-valentin" class="internship-role"></div>
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
    name: "ProfileValentin",
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
            document.getElementById('role-valentin').innerText = en.profilePages.valentin.role
            document.getElementById('internshipRole1-valentin').innerText = en.profilePages.valentin.internshipRole1
            document.getElementById('internshipRole2-valentin').innerText = en.profilePages.valentin.internshipRole2
            document.getElementById('internshipRole3-valentin').innerText = en.profilePages.valentin.internshipRole3
        } else {
            document.getElementById('role-valentin').innerText = fr.profilePages.valentin.role
            document.getElementById('internshipRole1-valentin').innerText = fr.profilePages.valentin.internshipRole1
            document.getElementById('internshipRole2-valentin').innerText = fr.profilePages.valentin.internshipRole2
            document.getElementById('internshipRole3-valentin').innerText = fr.profilePages.valentin.internshipRole3
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/TeamPage.scss';
</style>
