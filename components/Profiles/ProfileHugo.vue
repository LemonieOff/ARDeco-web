<template>
    <div class="profile-page-content bottom-right-yellow-fade-background" id="hugo-profile">
        <div class="sub-content">
            <div class="personal-content card">
                <img class="hobby" src="../../assets/images/profile-hobbies/lemon.png">
                <a href="https://www.linkedin.com/in/hugo-becart/">
                    <img class="profile-picture" src="../../assets/images/profile-pictures/HUGO_.png">
                </a>
                <div class="black-separation-bar"></div>
                <div class="orange-separation-bar"></div>
                <div class="name">Hugo Becart</div>
                <div id="role-hugo" class="role"></div>
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
                    <img class="internship-logo" src="../../assets/images/compagny-logos/MyFlyingBoxLogo.png">
                    <div id="internshipRole1-hugo" class="internship-role"></div>
                </div>

                <!-- Semestre 4 (Tech 2 - partie 2) -->
                <div class="timeline-inactive">
                    <a href="https://www.epitech.eu/en/">
                        <img class="epitech-logo-timeline" src="../../assets/images/profile-pictures/Epitech.png">
                    </a>
                </div>

                <!-- Semestre 5 (Tech 3 - partie 1) -->
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>

                <!-- Semestre 6 (Tech 3 - partie 2) -->
                <div class="timeline-active">
                    <img class="internship-logo" src="../../assets/images/compagny-logos/WorkingGameLogo.png">
                    <div id="internshipRole2-hugo" class="internship-role"></div>
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
    name: "ProfileHugo",
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
            document.getElementById('role-hugo').innerText = en.profilePages.hugo.role
            document.getElementById('internshipRole1-hugo').innerText = en.profilePages.hugo.internshipRole1
            document.getElementById('internshipRole2-hugo').innerText = en.profilePages.hugo.internshipRole2
        } else {
            document.getElementById('role-hugo').innerText = fr.profilePages.hugo.role
            document.getElementById('internshipRole1-hugo').innerText = fr.profilePages.hugo.internshipRole1
            document.getElementById('internshipRole2-hugo').innerText = fr.profilePages.hugo.internshipRole2
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~/styles/TeamPage.scss';
</style>
