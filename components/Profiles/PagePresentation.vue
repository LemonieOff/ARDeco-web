<template>
    <div class="page-presentation-content top-right-yellow-fade-background">
        <div class="line-jump"></div>
        <div class="title">Meet our dream team</div>
        <div class="sub-content">
            <div class="team-content">
                <div class="title">Want to know us better ?</div>
                <div class="sub-title">Click on these pictures to learn more about us !</div>
                <div class="profile-pictures-content">
                    <div class="profile-pictures">
                        <a href="#hugo-profile">
                            <img src="../../assets/images/profile-pictures/Hugo.png">
                        </a>
                    </div>
                    <div class="profile-pictures">
                        <a href="#louis-profile">
                            <img src="../../assets/images/profile-pictures/Louis.png">
                        </a>
                        <a href="#mathias-profile">
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
                <div class="title">Want to know what got us here ?</div>
                <div class="sub-title">Learn more bout our school program and our previous professional experiences !</div>
                <div class="epitech-details">
                    <a href="https://www.epitech.eu/en/">
                        <img src="../../assets/images/profile-pictures/Epitech.png">
                    </a>
                    <div class="text">
                        Our school program takes place over 5 years to train us into computer experts. 
                        It offers a dense and evolving technical content, 
                        including a variety of programming projects and covering many 
                        languages that will allow each of us to approach all new technologies.
                    </div>
                    <div class="text">
                        During those 5 years, we are asked to to find internships or part 
                        time jobs to learn everything we need to know about life in the professional world. 
                        Since all of us are 3rd years, we can comfortably say that we all spent at least half 
                        a year in a company already, which turns out to be very beneficial to the development 
                        of our ARDeco project.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "PagePresentation"
}
</script>

<style lang="scss" scoped>

img {
    height: auto;
    width: 100%;
}

.line-jump {
    height: 5vh;
}

.page-presentation-content {
    height: 100vh;
    // border: 3px solid blue;
}

.top-right-yellow-fade-background {
    background: linear-gradient(312deg, rgba(242, 235, 223, 0.91) 64.31%, rgba(255, 199, 0, 0.65) 100%);
}

.title {
    text-align: center;
    margin-top: 6%;
    font-size: 1.75vw;
    font-weight : bold;
}

.sub-content {
    display: flex;
    margin-top: 2.5%;
    height: 70%;
    width: 80%;
    margin-left: 10%;
    // border: 3px solid pink;
}

.team-content {
    width: 50%;
    // border: 3px solid orange;
}

.team-content .title {
    text-align: center;
    font-size: 1vw;
    font-weight : bold;
}

.sub-title {
    text-align: center;
    font-size: 0.75vw;
    color: #6C6C6C;
    font-weight : bold;
}

.profile-pictures-content {
    display: flex;
    // border: 3px solid green;
}

.bottom-picture {
    margin-left: -75%;
}

.epitech-details {
    margin: 5%;
    display: grid;
    // border: 3px solid green;
}

.profile-pictures {
    margin: 5%;
    // border: 3px solid yellow;
}

.school-content {
    width: 50%;
    // border: 3px solid orangered;
}

.school-content .title {
    text-align: center;
    font-size: 1vw;
}

.school-content .text {
    font-size: 0.75vw;
    text-align: center;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 5%;
}

.team-content img {
    margin-top: 15%;
}

.school-content img {
    width: 20%;
    margin-left: 40%;
}

</style>
