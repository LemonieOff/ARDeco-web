<template>
    <div class="text-center h-14 bg-[#333] fixed w-full z-[500] flex justify-around items-center">
        <NavbarLink id="home" page-name="lang" :page-lang="rawLangPrefix" class="hover:bg-transparent">
            <NuxtImg height="50" width="50" class="max-h-12" src="images/logo.webp" alt="Home"/>
        </NavbarLink>
        <NavbarLink id="team" page-name="lang-team" :page-lang="rawLangPrefix">
            {{ content.team }}
        </NavbarLink>
        <NavbarLink id="product" page-name="lang-product" :page-lang=rawLangPrefix>
            {{ content.product }}
        </NavbarLink>
        <NavbarFunction id="theme-button" :fun="toggleDarkMode">
            {{ darkMode ? content.lightmode : content.darkmode }}
        </NavbarFunction>
        <NavbarMenu/>
    </div>
    <!-- Add a block with the navbar height, so it doesn't overlap on other content -->
    <div id="navbar-size" class="h-14"></div>
</template>

<script>
export default {
    name: "Navbar",
    data() {
        return {
            content: this.$content.navBar,
            rawLangPrefix: this.$rawLangPrefix,
            darkMode: this.$darkMode,
        }
    },
    methods: {
        toggleDarkMode() {
            this.$changeDarkMode("toggle");
            location.reload();
        },
    },
};
</script>
