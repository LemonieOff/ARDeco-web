<template>
    <div class="navbar">
        <a class="navbar-option" href="/">Home</a>
        <a class="navbar-option" href="/team">Team</a>
        <a class="navbar-option" href="/product">Our product</a>
        <a class="navbar-option" href="/profile">Profile</a>
        <button id="dark-mode-button" style="color: #F2EBDF;" @click="toggleDarkMode">Toggle dark mode</button>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
    toggleDarkMode() {
        console.log("button activated, on url:", document.URL.includes("product"))
        const isDarkModeActive = document.body.style.getPropertyValue("background-color")
        const backgoundFade = document.getElementsByClassName("top-right-yellow-fade-background")
        const background1 = document.getElementsByClassName("bottom-right-yellow-fade-background")
        const background2 = document.getElementsByClassName("top-right-yellow-fade-background")
        const background3 = document.getElementsByClassName("bottom-left-yellow-fade-background")
        const background4 = document.getElementsByClassName("top-left-yellow-fade-background")
        const cards = document.getElementsByClassName("card");
        const backgroundCards = document.getElementsByClassName("background-card");

        const body = document.body
        if (isDarkModeActive == "") {
            body.style = "background-color: rgba(0, 4, 65, 0.91); color: white";

            if (document.URL.includes("team")) {
                backgoundFade[0].style = "background: linear-gradient(312deg, rgba(0, 4, 65, 0.91) 64.31%, rgba(3, 0, 182, 0.692) 100%)"
                background1[0].style = "background: linear-gradient(132deg, rgba(0, 4, 65, 0.91) 64.31%, rgba(3, 0, 182, 0.692) 100%)"
                background1[1].style = "background: linear-gradient(132deg, rgba(0, 4, 65, 0.91) 64.31%, rgba(3, 0, 182, 0.692) 100%)"
                background2[1].style = "background: linear-gradient(48deg, rgba(0, 4, 65, 0.91) 64.31%, rgba(3, 0, 182, 0.692) 100%)"
                background3[0].style = "background: linear-gradient(228deg, rgba(0, 4, 65, 0.91) 64.31%, rgba(3, 0, 182, 0.692) 100%)"
                background4[0].style = "background: linear-gradient(312deg, rgba(0, 4, 65, 0.91) 64.31%, rgba(3, 0, 182, 0.692) 100%)"
                for (let i = 0; i < cards.length; i++) {
                    cards[i].style = "border: 5px solid rgba(3, 0, 182, 0.692); background: #001A7A"
                }
            } else if (document.URL.includes("product")) {
                for (let i = 0; i < backgroundCards.length; i++) {
                    backgroundCards[i].style = "background: #001A7A; color: white"
                }
            }
        } else {
            body.style = ""

            if (document.URL.includes("team")) {
                backgoundFade[0].style = "background: linear-gradient(312deg, rgba(242, 235, 223, 0.91) 64.31%, rgba(255, 199, 0, 0.65) 100%)"
                background1[0].style = ""
                background1[1].style = ""
                background2[1].style = ""
                background3[0].style = ""
                background4[0].style = ""
                for (let i = 0; i < cards.length; i++) {
                    cards[i].style = ""
                }
            } else if (document.URL.includes("product")) {
                for (let i = 0; i < backgroundCards.length; i++) {
                    backgroundCards[i].style = ""
                }
            }
        }
    },
  },
};
</script>

<style scoped>
@import '~/styles/Navbar.scss';

.dark-body {
    background-color: darkslategray;
    color: white;
}

</style>