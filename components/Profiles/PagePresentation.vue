<template>
    <div class="page-presentation-content top-right-yellow-fade-background">
        <div class="line-jump"></div>
        <div id="title" class="title"></div>
        <div class="sub-content">
            <div class="team-content">
                <div id="picturesTitle" class="title"></div>
                <div id="picturesSubtitle" class="sub-title"></div>
                <div class="profile-pictures-content">
                    <div class="profile-pictures">
                        <a class="shaking-effect" href="#hugo-profile">
                            <img src="../../assets/images/profile-pictures/Hugo.png">
                        </a>
                    </div>
                    <div class="profile-pictures">
                        <a class="shaking-effect" href="#louis-profile">
                            <img src="../../assets/images/profile-pictures/Louis.png">
                        </a>
                        <a class="shaking-effect" href="#mathias-profile">
                            <img class="bottom-picture" src="../../assets/images/profile-pictures/Mathias.png">
                        </a>
                    </div>
                    <div class="profile-pictures">
                        <a href="#evan-profile">
                            <img src="../../assets/images/profile-pictures/Evan.png">
                        </a>
                        <a href="#valentin-profile">
                            <img class="bottom-picture" src="../../assets/images/profile-pictures/Valentin.png">
                        </a>
                    </div>
                </div>
            </div>
            <div class="school-content">
                <div id="presentationTitle" class="title"></div>
                <div id="presentationSubtitle" class="sub-title"></div>
                <div class="epitech-details">
                    <a href="https://www.epitech.eu/en/">
                        <img src="../../assets/images/profile-pictures/Epitech.png">
                    </a>
                    <div id="presentationTextPart1" class="text"></div>
                    <div id="presentationTextPart2" class="text"></div>
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
    mounted() {
        let lang = localStorage.getItem('lang')
        if (lang == null || lang == 'en') {
            document.getElementById('title').innerText = en.profilePages.presentationPage.title
            document.getElementById('picturesTitle').innerText = en.profilePages.presentationPage.picturesTitle
            document.getElementById('picturesSubtitle').innerText = en.profilePages.presentationPage.picturesSubtitle
            document.getElementById('presentationTitle').innerText = en.profilePages.presentationPage.presentationTitle
            document.getElementById('presentationSubtitle').innerText = en.profilePages.presentationPage.presentationSubtitle
            document.getElementById('presentationTextPart1').innerText = en.profilePages.presentationPage.presentationTextPart1
            document.getElementById('presentationTextPart2').innerText = en.profilePages.presentationPage.presentationTextPart2
        } else {
            document.getElementById('title').innerText = fr.profilePages.presentationPage.title
            document.getElementById('picturesTitle').innerText = fr.profilePages.presentationPage.picturesTitle
            document.getElementById('picturesSubtitle').innerText = fr.profilePages.presentationPage.picturesSubtitle
            document.getElementById('presentationTitle').innerText = fr.profilePages.presentationPage.presentationTitle
            document.getElementById('presentationSubtitle').innerText = fr.profilePages.presentationPage.presentationSubtitle
            document.getElementById('presentationTextPart1').innerText = fr.profilePages.presentationPage.presentationTextPart1
            document.getElementById('presentationTextPart2').innerText = fr.profilePages.presentationPage.presentationTextPart2
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../../styles/PagePresentation.scss";
</style>
