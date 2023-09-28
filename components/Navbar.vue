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
        console.log("button activated");
        const isDarkModeActive = document.body.style.getPropertyValue("background-color");
        console.log('-' + isDarkModeActive + '-');

        const body = document.body;
        if (isDarkModeActive == "") {
            body.style = "background-color: darkslategray; color: white";
        } else {
            console.log("'isDarkModeActive' == " + "'" + isDarkModeActive + "'" + " != " + "'darkslategray'");
            body.style = "";
        }
        console.log(body);
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