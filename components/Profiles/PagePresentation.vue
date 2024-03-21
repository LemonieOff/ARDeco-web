<template>
    <div class="page-presentation-content top-right-yellow-fade-background">
        <div class="line-jump"></div>
        <div id="title" class="title">{{ content.title }}</div>
        <div class="sub-content">
            <div class="team-content">
                <div id="picturesTitle" class="title">{{ content.picturesTitle }}</div>
                <div id="picturesSubtitle" class="sub-title">{{ content.picturesSubtitle }}</div>
                <div class="profile-pictures-content">
                    <div class="profile-pictures">
                        <a class="shaking-effect" href="#hugo-profile">
                            <img src="../../assets/images/profile-pictures/Hugo.png">
                        </a>
                        <a href="#valentin-profile">
                            <img src="../../assets/images/profile-pictures/Valentin.png">
                        </a>
                    </div>
                    <div class="profile-pictures">
                        <a href="#evan-profile">
                            <img src="../../assets/images/profile-pictures/Evan.png">
                        </a>
                        <a>
                            <img src="../../assets/images/profile-pictures/Unknown.png">
                        </a>
                    </div>
                    <div class="profile-pictures">
                        <a class="shaking-effect" href="#louis-profile">
                            <img src="../../assets/images/profile-pictures/Louis.png">
                        </a>
                        <a>
                            <img src="../../assets/images/profile-pictures/Unknown.png">
                        </a>
                    </div>
                </div>
            </div>
            <div class="school-content">
                <div id="presentationTitle" class="title">{{ content.presentationTitle }}</div>
                <div id="presentationSubtitle" class="sub-title">{{ content.presentationSubtitle }}</div>
                <div class="epitech-details">
                    <a href="https://www.epitech.eu/en/">
                        <img src="../../assets/images/profile-pictures/Epitech.png">
                    </a>
                    <div id="presentationTextPart1" class="text">{{ content.presentationTextPart1 }}</div>
                    <div id="presentationTextPart2" class="text">{{ content.presentationTextPart2 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "PagePresentation",
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
        this.content = lang === 'en' ? en.profilePages.presentationPage : fr.profilePages.presentationPage;

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
@import "../../styles/PagePresentation.scss";
</style>
