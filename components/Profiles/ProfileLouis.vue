<template>
    <div class="profile-page-content bottom-left-yellow-fade-background" id="louis-profile">
        <div class="sub-content">
            <div class="personal-content card">
                <img class="hobby" src="../../assets/images/profile-hobbies/croissant.png">
                <a href="https://www.linkedin.com/in/louis-villedieu-8866091b9/">
                    <img class="profile-picture" src="../../assets/images/profile-pictures/LOUIS_.png">
                </a>
                <div class="black-separation-bar"></div>
                <div class="orange-separation-bar"></div>
                <div class="name">Louis Villedieu</div>
                <div id="role-louis" class="role"></div>
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
                    <img class="internship-logo" src="../../assets/images/compagny-logos/BCAExpertiseLogo.png">
                    <div id="internshipRole1-louis" class="internship-role"></div>
                </div>

                <!-- Semestre 4 (Tech 2 - partie 2) -->
                <div class="timeline-inactive"></div>

                <!-- Semestre 5 (Tech 3 - partie 1) -->
                <div class="timeline-active">
                    <div class="year-bubble-active"></div>
                    <img class="internship-logo" src="../../assets/images/compagny-logos/VersityLogo.png">
                    <div id="internshipRole2-louis" class="internship-role"></div>
                </div>

                <!-- Semestre 6 (Tech 3 - partie 2) -->
                <div class="timeline-active">
                    <div class="year-invisible-bubble"></div>
                    <img class="internship-logo" src="../../assets/images/compagny-logos/WorkingGameLogo.png">
                    <div id="internshipRole3-louis" class="internship-role"></div>
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
    name: "ProfileLouis",
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
            document.getElementById('role-louis').innerText = en.profilePages.louis.role
            document.getElementById('internshipRole1-louis').innerText = en.profilePages.louis.internshipRole1
            document.getElementById('internshipRole2-louis').innerText = en.profilePages.louis.internshipRole2
            document.getElementById('internshipRole3-louis').innerText = en.profilePages.louis.internshipRole3
        } else {
            document.getElementById('role-louis').innerText = fr.profilePages.louis.role
            document.getElementById('internshipRole1-louis').innerText = fr.profilePages.louis.internshipRole1
            document.getElementById('internshipRole2-louis').innerText = fr.profilePages.louis.internshipRole2
            document.getElementById('internshipRole3-louis').innerText = fr.profilePages.louis.internshipRole3
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/TeamPage.scss';
</style>
