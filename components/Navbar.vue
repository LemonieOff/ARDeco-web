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
        <button id="dark-mode-button" class="navbarLink text-AR-Beige" @click="">{{ content.darkmode }}</button>
        <button id="light-mode-button" class="text-AR-Beige" @click="">{{ content.lightmode }}</button>
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
            rawLangPrefix: this.$rawLangPrefix
        }
    },
    async mounted() {
        const dark_mode = localStorage.getItem('dark_mode');

        if (dark_mode === 'true') {
            document.getElementById("dark-mode-button").style.display = "none";
        } else {
            document.getElementById("light-mode-button").style.display = "none";
        }

        // await this.checkDarkMode();
    },
    methods: {
        /*
            TODO : URGENT - CORRIGER LE DARK MODE !!! --- EN COURS (https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)
                   Plugin + cookie + App.vue html tag pour y ajouter manuellement l'attribut du dark mode
        */
        /*async checkDarkMode() {
            const dark_mode = localStorage.getItem('dark_mode');

            const backgoundFade = document.getElementsByClassName("top-right-yellow-fade-background")
            const background1 = document.getElementsByClassName("bottom-right-yellow-fade-background")
            const background2 = document.getElementsByClassName("top-right-yellow-fade-background")
            const background3 = document.getElementsByClassName("bottom-left-yellow-fade-background")
            const backgroundCards = document.getElementsByClassName("background-card");

            const body = document.body
            if (dark_mode === 'true') {
                // body.style = "background-color: #474E68; color: #BB86FC";

                if (document.URL.includes("team")) {
                    // backgoundFade[0].style = "background: #474E68"
                    // background1[0].style = "background: #474E68"
                    // background1[1].style = "background: #474E68"
                    // background2[1].style = "background: #474E68"
                    // background3[0].style = "background: #474E68"
                } else if (document.URL.includes("product")) {
                    for (let i = 0; i < backgroundCards.length; i++) {
                        // backgroundCards[i].style = "background: #001A7A; color: #BB86FC"
                    }
                }
            } else {
                body.style = ""

                if (document.URL.includes("team")) {
                    // backgoundFade[0].style = ""
                    // background1[0].style = ""
                    // background1[1].style = ""
                    // background2[1].style = ""
                    // background3[0].style = ""
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
        },*/
    },
};
</script>
