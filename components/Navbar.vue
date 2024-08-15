<template>
    <div class="navbar">
        <a id="home" class="navbar-option" :href="`${langPrefix}`">
            <NuxtImg height="50" width="50" class="navbar-icon" src="images/logo.webp" alt="Home"/>
        </a>
        <a id="team" class="navbar-option navbarLink" :href="`${langPrefix}team`">{{content.team}}</a>
        <a id="product" class="navbar-option navbarLink" :href="`${langPrefix}product`">{{content.product}}</a>
        <button id="dark-mode-button" @click="toggleDarkMode">{{content.darkmode}}</button>
        <button id="light-mode-button" @click="toggleDarkMode">{{content.lightmode}}</button>
        <div class="action">
            <div class="menu">
                <ul>
                    <li id="profileMenuOption">
                        <NuxtImg width="20px" height="20px" src="images/icons/user.webp" alt="Profile" loading="lazy"/><a :href="`${langPrefix}profile`">{{content.profile}}</a>
                    </li>
                    <li id="settingsMenuOption">
                        <NuxtImg width="20px" height="20px" src="images/icons/settings.webp" alt="Settings" loading="lazy"/><a :href="`${langPrefix}settings`">{{content.settings}}</a>
                    </li>
                    <li id="companyMenuOption">
                        <NuxtImg width="20px" height="20px" src="images/icons/company.webp" alt="Company" loading="lazy"/><a :href="`${langPrefix}company`">{{content.company}}</a>
                    </li>
                    <li id="ticketsMenuOption">
                        <NuxtImg width="20px" height="20px" src="images/icons/support.webp" alt="Support" loading="lazy"/><a :href="`${langPrefix}tickets`">{{content.tickets}}</a>
                    </li>
                    <li id="feedbackMenuOption">
                        <NuxtImg width="20px" height="20px" src="images/icons/feedback.webp" alt="Feedback" loading="lazy"/><a :href="`${langPrefix}feedback`">{{content.feedback}}</a>
                    </li>
                    <li id="disconnectMenuOption">
                        <NuxtImg width="20px" height="20px" src="images/icons/logout.webp" alt="Logout" loading="lazy"/><a @click="logout" href="#">{{content.disconnect}}</a>
                    </li>
                    <li id="loginMenuOption">
                        <NuxtImg width="20px" height="20px" src="images/icons/logout.webp" alt="Login" loading="lazy"/><a :href="`${langPrefix}login`">{{content.login}}</a>
                    </li>
                </ul>
            </div>
            <div id="user" @click="menuToggle">
                <NuxtImg width="50px" height="50px" id="profileImage" class="navbar-icon hidden" v-bind:src="imageSrc" alt="Own profile picture"/>
                <NuxtImg width="50px" height="50px" id="defaultImage" class="navbar-icon" src="images/profile-pictures/Unknown.webp" alt="Default profile picture"/>
            </div>
        </div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import {isLogged, loggedIn, userID} from "public/js/checkLogin";
import { disconnect } from "public/js/checkLogin";

export default {
    name: "Navbar",
    data() {
        return {
            imageSrc: "https://api.ardeco.app/profile_pictures/0.png",
            profileData: {},
            content: {},
            urlLang: "",
            langPrefix: "",
        }
    },
    mounted() {
        this.urlLang = this.$urlLang;
        this.langPrefix = this.$langPrefix;

        // Set the content variable to the correct language
        this.content = this.$lang === 'en' ? en.navBar : fr.navBar;

        isLogged();

        this.getProfileData();
        this.getUSerPicture();
        const userID = localStorage.getItem('userID');
        const dark_mode = localStorage.getItem('dark_mode');
        const role = localStorage.getItem('role');

        if (userID === null) {
            document.getElementById("profileMenuOption").style.display = "none";
            document.getElementById("settingsMenuOption").style.display = "none";
            document.getElementById("feedbackMenuOption").style.display = "none";
            document.getElementById("companyMenuOption").style.display = "none";
            document.getElementById("ticketsMenuOption").style.display = "none";
            document.getElementById("disconnectMenuOption").style.display = "none";
        } else {
            document.getElementById("loginMenuOption").style.display = "none";
            document.getElementById("defaultImage").style.display = "none";
            document.getElementById("profileImage").style.display = "block";
            if (role === "client") {
                document.getElementById("companyMenuOption").style.display = "none";
            }
        }

        if (dark_mode === 'true') {
            document.getElementById("dark-mode-button").style.display = "none";
        } else {
            document.getElementById("light-mode-button").style.display = "none";
        }

        this.checkDarkMode();
    },
    methods: {
        async menuToggle() {
            const toggleMenu = document.querySelector(".menu");
            toggleMenu.classList.toggle("active");
        },
        async checkDarkMode() {
            const dark_mode = localStorage.getItem('dark_mode');

            const backgoundFade = document.getElementsByClassName("top-right-yellow-fade-background")
            const background1 = document.getElementsByClassName("bottom-right-yellow-fade-background")
            const background2 = document.getElementsByClassName("top-right-yellow-fade-background")
            const background3 = document.getElementsByClassName("bottom-left-yellow-fade-background")
            const backgroundCards = document.getElementsByClassName("background-card");

            const body = document.body
            if (dark_mode === 'true') {
                body.style = "background-color: #474E68; color: #BB86FC";

                if (document.URL.includes("team")) {
                    backgoundFade[0].style = "background: #474E68"
                    background1[0].style = "background: #474E68"
                    background1[1].style = "background: #474E68"
                    background2[1].style = "background: #474E68"
                    background3[0].style = "background: #474E68"
                } else if (document.URL.includes("product")) {
                    for (let i = 0; i < backgroundCards.length; i++) {
                        backgroundCards[i].style = "background: #001A7A; color: #BB86FC"
                    }
                }
            } else {
                body.style = ""

                if (document.URL.includes("team")) {
                    backgoundFade[0].style = ""
                    background1[0].style = ""
                    background1[1].style = ""
                    background2[1].style = ""
                    background3[0].style = ""
                } else if (document.URL.includes("product")) {
                    for (let i = 0; i < backgroundCards.length; i++) {
                        backgroundCards[i].style = ""
                    }
                }
            }
        },
        async toggleDarkMode() {
            const dark_mode = localStorage.getItem('dark_mode');
            console.log("button activated, on url:", document.URL.includes("product"))
            const backgoundFade = document.getElementsByClassName("top-right-yellow-fade-background")
            const background1 = document.getElementsByClassName("bottom-right-yellow-fade-background")
            const background2 = document.getElementsByClassName("top-right-yellow-fade-background")
            const background3 = document.getElementsByClassName("bottom-left-yellow-fade-background")
            const background4 = document.getElementsByClassName("top-left-yellow-fade-background")
            const cards = document.getElementsByClassName("card");
            const backgroundCards = document.getElementsByClassName("background-card");

            const body = document.body
            if (dark_mode === 'false') {
                localStorage.setItem('dark_mode', 'true');
                document.getElementById("dark-mode-button").style.display = "none";
                document.getElementById("light-mode-button").style.display = "inline-block";
                body.style = "background-color: #474E68; color: #BB86FC";

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
                        backgroundCards[i].style = "background: #001A7A; color: #BB86FC"
                    }
                }

                await fetch('https://api.ardeco.app/settings', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "dark_mode": true,
                    }),
                    credentials: 'include',
                });
            } else {
                body.style = ""
                localStorage.setItem('dark_mode', 'false');
                document.getElementById("dark-mode-button").style.display = "inline-block";
                document.getElementById("light-mode-button").style.display = "none";

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

                await fetch('https://api.ardeco.app/settings', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "dark_mode": false,
                    }),
                    credentials: 'include',
                });
            }
        },
        async logout() {
            await fetch('https://api.ardeco.app/logout', {
                method: 'GET',
                credentials: 'include',
            });
            await disconnect();
            localStorage.removeItem('lang');
            location.href = this.langPrefix;
        },
        async getUSerPicture() {
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
            this.imageSrc = `https://api.ardeco.app/profile_pictures/${result.data}.png`
        },
        async getProfileData() {
            if (!loggedIn) {
                return;
            }

            // get profile data
            const response_profile = await fetch(`https://api.ardeco.app/user/${userID}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data_profile = await response_profile.json();
            this.profileData.value = data_profile.data;
            console.log(this.profileData.value)
        }
    },
};
</script>

<style scoped>
@import '~/styles/Navbar.scss';

.dark-body {
    background-color: darkslategray;
    color: white;
}

#disconnectMenuOption {
    cursor: pointer;
}

#profileImage {
    border-radius: 50%;
}

#defaultImage {
    border-radius: 50%;
}
</style>
