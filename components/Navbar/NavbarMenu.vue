<template>
    <div class="text-sm">
        <div id="navbarMenu"
             class="invisible opacity-0 fixed top-32 -right-2.5 bg-white py-2.5 px-5 rounded-2xl w-52 duration-500">
            <ul>
                <NavbarMenuLink v-if="userId" id="profileMenuOption" page-name="lang-profile" :page-lang="langPrefix"
                                image-src="images/icons/user.webp" :alt="content.profile">
                    {{ content.profile }}
                </NavbarMenuLink>

                <NavbarMenuLink v-if="userId" id="settingsMenuOption" page-name="lang-settings" :page-lang="langPrefix"
                                image-src="images/icons/settings.webp" :alt="content.settings">
                    {{ content.settings }}
                </NavbarMenuLink>

                <NavbarMenuLink v-if="userId && role === 'company'" id="companyMenuOption" page-name="lang-company"
                                :page-lang="langPrefix" image-src="images/icons/company.webp" :alt="content.company">
                    {{ content.company }}
                </NavbarMenuLink>

                <NavbarMenuLink v-if="userId" id="ticketsMenuOption" page-name="lang-tickets" :page-lang="langPrefix"
                                image-src="images/icons/support.webp" :alt="content.tickets">
                    {{ content.tickets }}
                </NavbarMenuLink>

                <NavbarMenuLink v-if="userId" id="feedbackMenuOption" page-name="lang-feedback" :page-lang="langPrefix"
                                image-src="images/icons/feedback.webp" :alt="content.feedback">
                    {{ content.feedback }}
                </NavbarMenuLink>

                <NavbarMenuFunction v-if="userId" id="logoutMenuOption" :fun="logoutUser"
                                    image-src="images/icons/logout.webp" :alt="content.disconnect">
                    {{ content.disconnect }}
                </NavbarMenuFunction>

                <NavbarMenuLink v-if="!userId" id="loginMenuOption" page-name="lang-login" :page-lang="langPrefix"
                                image-src="images/icons/logout.webp" :alt="content.login" :page-redirect="route.path">
                    {{ content.login }}
                </NavbarMenuLink>
            </ul>
        </div>
        <div id="user" @click="menuToggle">
            <NuxtImg width="50px" height="50px" id="profileImage" class="navbar-icon rounded-[50%]"
                     v-bind:src="imageSrc" alt="Profile picture"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import {logout, isLogged, loggedIn} from "public/ts/checkLogin";

const nuxtApp = useNuxtApp();
const route = useRoute();

const langPrefix = nuxtApp.$rawLangPrefix;
const content = nuxtApp.$content.navBar;
const userId = ref<number | undefined | null>(null);
const role = ref<string | null>("");
const imageSrc = ref(nuxtApp.$profilePicture.url);

onMounted(async () => {
    userId.value = await isLogged();

    role.value = localStorage.getItem('role');

    await getUSerPicture();
});

async function logoutUser() {
    await fetch('https://api.ardeco.app/logout', {
        method: 'GET',
        credentials: 'include',
    });
    imageSrc.value = nuxtApp.$changeProfilePicture().url;
    logout();
    location.href = langPrefix;
}

async function getUSerPicture() {
    if (!loggedIn) {
        // If not logged in, reset the profile picture cookie
        imageSrc.value = nuxtApp.$changeProfilePicture().url;
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
    if (imageSrc.value !== result.data.url) imageSrc.value = result.data.url;
    nuxtApp.$changeProfilePicture(result.data);
}

function menuToggle() {
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
