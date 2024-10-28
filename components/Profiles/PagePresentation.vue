<template>
    <div class="page-presentation-content bg-gradient-to-t from-port-brown to-AR-Beige dark:from-AR-Grey dark:to-AR-Dark-Grey">
        <div id="title" class="text-center font-bold py-8 text-xl md:text-4xl">{{ content.title }}</div>
        <div class="sub-content">
            <div class="team-content">
                <div id="picturesTitle" class="title">{{ content.picturesTitle }}</div>
                <div id="picturesSubtitle" class="sub-title">{{ content.picturesSubtitle }}</div>
                <div class="profile-pictures-content">
                    <div class="profile-pictures">
                        <a class="shaking-effect" href="#hugo-profile">
                            <img src="@/assets/images/profile-pictures/Hugo.png" alt="Hugo Becart">
                        </a>
                        <a href="#valentin-profile">
                            <img src="@/assets/images/profile-pictures/Valentin.png" alt="Valentin Astic">
                        </a>
                    </div>
                    <div class="profile-pictures">
                        <a href="#evan-profile">
                            <img src="@/assets/images/profile-pictures/Evan.png" alt="Evan Blachier">
                        </a>
                    </div>
                    <div class="profile-pictures">
                        <a class="shaking-effect" href="#louis-profile">
                            <img src="@/assets/images/profile-pictures/Louis.png" alt="Louis Villedieu">
                        </a>
                        <a class="shaking-effect" href="#hugo2-profile">
                            <img src="@/assets/images/profile-pictures/Hugo2.png" alt="Hugo Delille" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="school-content">
                <div id="presentationTitle" class="title">{{ content.presentationTitle }}</div>
                <div id="presentationSubtitle" class="sub-title">{{ content.presentationSubtitle }}</div>
                <div class="epitech-details">
                    <NuxtLink :href="epitechSrc" target="_blank">
                        <img src="@/assets/images/profile-pictures/Epitech.png" alt="Epitech">
                    </NuxtLink>
                    <div id="presentationTextPart1" class="text">{{ content.presentationTextPart1 }}</div>
                    <div id="presentationTextPart2" class="text">{{ content.presentationTextPart2 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PagePresentation",
    data() {
        return {
            content: this.$content.profilePages.presentationPage,
            epitechSrc: this.$lang === "fr" ? "https://www.epitech.eu" : "https://international.epitech.eu"
        };
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/PagePresentation.scss";
</style>
