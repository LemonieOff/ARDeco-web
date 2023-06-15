<template>
    <div class="navbar">
        <a class="navbar-option" href="/">Home</a>
        <a class="navbar-option" href="/team">Team</a>
        <a class="navbar-option" href="/product">Our product</a>
        <a class="navbar-option" href="/profile">Profile</a>
    </div>

</template>

<script>
export default {
    name: "Navbar"
}
</script>

<style scoped>

.navbar {
    text-align: center;
    /* overflow: hidden; */
    background-color: #333;
    position: fixed;
    top: 0;
    width: 100%;
}

/* Links inside the navbar */
.navbar a {
    display: inline-block;
    color: #F2EBDF;
    padding: 14px 16px;
    margin-left: 5%;
    margin-right: 5%;
    text-decoration: none;
}

/* Change background on mouse-over */
.navbar a:hover {
    background: #F2EBDF;
    color: black;
}
</style>