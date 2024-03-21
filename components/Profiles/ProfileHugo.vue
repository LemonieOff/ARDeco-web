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
                    <img class="internship-logo" src="../../assets/images/compagny-logos/MyFlyingBoxLogo.png">
                    <div id="internshipRole1-hugo" class="internship-role">{{ content.internshipRole1 }}</div>
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
                    <img class="internship-logo" src="../../assets/images/compagny-logos/WorkingGameLogo.png">
                    <div id="internshipRole2-hugo" class="internship-role">{{ content.internshipRole2 }}</div>
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
    name: "ProfileHugo",
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: {},
            langPrefix: "/"
        }
    },
    mounted() {
        let lang = this.urlLang;

        // If lang selector is not passed in url, get the user's one or set it to french
        if (lang !== 'en' && lang !== 'fr') {
            const localStorageLang = localStorage.getItem('lang');
            if (localStorageLang) {
                lang = localStorageLang;
            } else {
                lang = 'fr';
            }
        }

        // Set the content variable to the correct language
        this.content = lang === 'en' ? en.profilePages.hugo : fr.profilePages.hugo;

        // Prefix for links
        if (location.href.includes("/fr/")) {
            this.langPrefix = "/fr/";
        } else if (location.href.includes("/en/")) {
            this.langPrefix = "/en/";
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/TeamPage.scss';
</style>
