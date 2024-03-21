<template>
    <div class="navbar">
        <a id="home" class="navbar-option" :href="`${langPrefix}`">{{content.home}}</a>
        <a id="team" class="navbar-option" :href="`${langPrefix}team`">{{content.team}}</a>
        <a id="product" class="navbar-option" :href="`${langPrefix}product`">{{content.product}}</a>
        <a id="profile" class="navbar-option" :href="`${langPrefix}profile`">{{content.profile}}</a>
        <a id="profile" class="navbar-option" :href="`${langPrefix}settings`">{{content.settings}}</a>
        <button id="dark-mode-button" style="color: #F2EBDF;" @click="toggleDarkMode">{{content.darkmode}}</button>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "Navbar",
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: {},
            langPrefix: "/"
        }
    },
    mounted() {
        let lang = this.urlLang;

        // If lang selector is not passed in url, get the user's one or set it to french
        if (lang !== 'en' && lang !== 'fr') {
            if (localStorage.getItem('lang')) {
                lang = localStorage.getItem('lang');
            } else {
                lang = 'fr';
            }
        }

        // Set the content variable to the correct language
        this.content = lang === 'en' ? en.navBar : fr.navBar;

        // Prefix for links
        if (location.href.includes("/fr/")) {
            this.langPrefix = "/fr/";
        } else if (location.href.includes("/en/")) {
            this.langPrefix = "/en/";
        }

        this.checkDarkMode();
    },
    methods: {
        async checkDarkMode() {
            const dark_mode = localStorage.getItem('dark_mode');

            const backgoundFade = document.getElementsByClassName("top-right-yellow-fade-background")
            const background1 = document.getElementsByClassName("bottom-right-yellow-fade-background")
            const background2 = document.getElementsByClassName("top-right-yellow-fade-background")
            const background3 = document.getElementsByClassName("bottom-left-yellow-fade-background")
            const backgroundCards = document.getElementsByClassName("background-card");

            const body = document.body
            if (dark_mode == 'true') {
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
            if (dark_mode == 'false') {
                localStorage.setItem('dark_mode', 'true');
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
