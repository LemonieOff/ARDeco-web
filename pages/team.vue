<template>
    <body>
        <div class="profile">
            <p class="center-text">Hugo Becart</p>
            <a class="center" href="https://www.linkedin.com/in/hugo-becart/">
                <img src="../assets/images/profile-pictures/HUGO.jpg">
            </a>
            <p class="center-text">Project Leader</p>
        </div>
        <br>
        <div class="profile">
            <p class="center-text">Evan Blachier</p>
            <a class="center" href="https://www.linkedin.com/in/evan-blachier-65036120b/">
                <img src="../assets/images/profile-pictures/EVAN.jpg">
            </a>
            <p class="center-text">AR developer</p>
        </div>
        <div class="profile">
            <p class="center-text">Louis Villedieu</p>
            <a class="center" href="https://www.linkedin.com/in/louis-villedieu-8866091b9/">
                <img src="../assets/images/profile-pictures/LOUIS.png">
            </a>
            <p class="center-text">AR developer</p>
        </div>
        <div class="profile">
            <p class="center-text">Ugo Lena</p>
            <a class="center" href="https://www.linkedin.com/in/ugolena/">
                <img src="../assets/images/profile-pictures/UGO.jpg">
            </a>
            <p class="center-text">Mobile developer</p>
        </div>
        <div class="profile">
            <p class="center-text">Mathias Blanchard</p>
            <a class="center" href="https://www.linkedin.com/in/mathias-blanchard-a54818182/">
                <img src="../assets/images/profile-pictures/MATHIAS.png">
            </a>
            <p class="center-text">Mobile developer</p>
        </div>
        <div class="profile">
            <p class="center-text">Valentin Astic</p>
            <a class="center" href="https://www.linkedin.com/in/valentin-astic-85a514205/">
                <img src="../assets/images/profile-pictures/VALENTIN.jpeg">
            </a>
            <p class="center-text">Design and partners</p>
        </div>
    </body>
    <ClientOnly>
        <Navbar></Navbar>
    </ClientOnly>
</template>
  
<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
</script>

<style lang="scss" scoped>

body {
    width: auto;
    font-family: 'Arial', sans-serif;  
}

.profile {
    margin: 5%;
}

.center {
    display: flex;
    align-items: center;
    justify-content: center;
    // border: 3px solid red;
}

.center-text {
    font-size: 250%;
    text-align: center;
    // border: 3px solid green;
}

img {
    height: 50vh;
}

</style>
