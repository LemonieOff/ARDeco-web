<template>
    <div class="text-sm">
        <div id="navbarMenu"
             class="invisible opacity-0 fixed top-32 -right-2.5 bg-white py-2.5 px-5 rounded-2xl w-52 duration-500">
            <ul>
                <NavbarMenuLink v-if="userID" id="profileMenuOption" page-name="lang-profile" :page-lang="langPrefix"
                                image-src="images/icons/user.webp" :alt="content.profile">
                    {{ content.profile }}
                </NavbarMenuLink>

                <NavbarMenuLink v-if="userID" id="settingsMenuOption" page-name="lang-settings" :page-lang="langPrefix"
                                image-src="images/icons/settings.webp" :alt="content.settings">
                    {{ content.settings }}
                </NavbarMenuLink>

                <NavbarMenuLink v-if="userID && role === 'company'" id="companyMenuOption" page-name="lang-company"
                                :page-lang="langPrefix" image-src="images/icons/company.webp" :alt="content.company">
                    {{ content.company }}
                </NavbarMenuLink>

                <NavbarMenuLink v-if="userID" id="ticketsMenuOption" page-name="lang-tickets" :page-lang="langPrefix"
                                image-src="images/icons/support.webp" :alt="content.tickets">
                    {{ content.tickets }}
                </NavbarMenuLink>

                <NavbarMenuLink v-if="userID" id="feedbackMenuOption" page-name="lang-feedback" :page-lang="langPrefix"
                                image-src="images/icons/feedback.webp" :alt="content.feedback">
                    {{ content.feedback }}
                </NavbarMenuLink>

                <NavbarMenuFunction v-if="userID" id="logoutMenuOption" :fun="logout"
                                    image-src="images/icons/logout.webp" :alt="content.disconnect">
                    {{ content.disconnect }}
                </NavbarMenuFunction>

                <NavbarMenuLink v-if="!userID" id="loginMenuOption" page-name="lang-login" :page-lang="langPrefix"
                                image-src="images/icons/logout.webp" :alt="content.login">
                    {{ content.login }}
                </NavbarMenuLink>
            </ul>
        </div>
        <div id="user" @click="menuToggle">
            <NuxtImg v-if="imageSrc !== ''" width="50px" height="50px" id="profileImage"
                     class="navbar-icon rounded-[50%]"
                     v-bind:src="imageSrc" loading="lazy" alt="Own profile picture"/>
            <NuxtImg v-else width="50px" height="50px" id="defaultImage" class="navbar-icon rounded-[50%]"
                     src="images/profile-pictures/Unknown.webp" loading="lazy" alt="Default profile picture"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import {disconnect, isLogged, loggedIn, userID} from "public/ts/checkLogin";

const nuxtApp = useNuxtApp();

const langPrefix = nuxtApp.$rawLangPrefix;
const content = nuxtApp.$content.navBar;
const imageSrc = ref("");
const userId = ref<number | undefined | null>(null);
const role = ref<string | null>("");

onMounted(async () => {
    userId.value = await isLogged();

    role.value = localStorage.getItem('role');

    await getUSerPicture();
});

async function logout() {
    await fetch('https://api.ardeco.app/logout', {
        method: 'GET',
        credentials: 'include',
    });
    await disconnect();
    location.href = langPrefix;
}

async function getUSerPicture() {
    if (!loggedIn) {
        return;
    }

    const response = await fetch(`https://api.ardeco.app/profile_picture/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    });
    const result = await response.json();
    imageSrc.value = `https://api.ardeco.app/profile_pictures/${result.data}.png`;
}

async function menuToggle() {
    const toggleMenu = document.getElementById("navbarMenu");
    if (toggleMenu) toggleMenu.classList.toggle("invisible");
}
</script>

<style scoped lang="scss">
#navbarMenu {
    box-shadow: -5px 5px 10px 0px rgba(0, 0, 0, .1);
}

#navbarMenu:not(.invisible) {
    top: 80px;
    opacity: 1;
}
</style>
