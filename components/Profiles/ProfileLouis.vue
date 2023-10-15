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
                <div class="role">AR Developer</div>
            </div>
            <div class="timeline-content">
                <div class="year-2020">2020</div>
                <div class="timeline-inactive">
                    <div class="year-bubble-inactive"></div>
                </div>
                <div class="timeline-inactive"></div>
                <div class="timeline-active">
                    <div class="year-bubble-active"></div>
                    <img class="internship-logo" src="../../assets/images/compagny-logos/BCAExpertiseLogo.png">
                    <div class="internship-role">Junior Software Developer</div>
                </div>
                <div class="timeline-inactive">
                    <a href="https://www.epitech.eu/en/">
                        <img class="epitech-logo-timeline" src="../../assets/images/profile-pictures/Epitech.png">
                    </a>
                </div>
                <div class="timeline-active">
                    <div class="year-bubble-active"></div>
                    <img class="internship-logo" src="../../assets/images/compagny-logos/VersityLogo.png">
                    <div class="internship-role">Web Developer</div>
                </div>
                <div class="timeline-active">
                    <div class="end-year-bubble-active"></div>
                    <img class="internship-logo" src="../../assets/images/compagny-logos/WorkingGameLogo.png">
                    <div class="internship-role">Video Game Developer</div>
                </div>
                <div class="year-2023">2023</div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "ProfileLouis"
}
</script>

<style lang="scss" scoped>
@import '~/styles/TeamPage.scss';
</style>
