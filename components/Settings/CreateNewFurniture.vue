<template>
    <div class="navbar-top-space"></div>
    <div class="title">{{content.title}}</div>
    <div class="mainContent">
        <div class="furniturePictureArea">
            <img id="furnitureImg" src="~/../../assets/images/furnitures/defaultFurnitureCreationImage.png">
        </div>
        <div class="furnitureDetails">
            <div class="furnitureSpecificDetails">
                <div class="specificDetailTitle" id="furnitureStyles">{{placeholders.furnitureStyles}}</div>
                <div class="options">
                    <div v-for="(style, key) in styles" :key="key" class="option">
                        <label :for="`style_${key}`" @click="toggleSelection(style)" :class="{ 'selected': style.selected }">
                            {{ style.name }}
                        </label>
                    </div>
                </div>
                <div class="specificDetailTitle" id="furnitureRooms">{{placeholders.furnitureRooms}}</div>
                <div class="options">
                    <div v-for="(room, key) in rooms" :key="key" class="option">
                        <label :for="`room_${key}`" @click="toggleSelection(room)" :class="{ 'selected': room.selected }">
                            {{ room.name }}
                        </label>
                    </div>
                </div>
                <div class="specificDetailTitle" id="furnitureColors">{{placeholders.furnitureColors}}</div>
                <div class="options">
                    <div v-for="(_color, key) in colors" :key="key" class="colorOption">
                        <label :for="`color_${key}`"
                        @click="toggleSelection(_color)"
                        :class="{ 'selected': _color.selected }"
                        :style="{ 'background-color': _color.hex,
                            'border-color': _color.selected ? black : _color.hex,
                            'color': _color.selected ? _color.hex : black }">
                            {{ _color.name }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="furnitureBasicDetails">
                <input class="basicButton" id="furnitureName" :placeholder="`${placeholders.furnitureName}`">
                <input class="basicButton" id="furniturePrice" :placeholder="`${placeholders.furniturePrice}`">
                <input class="basicButton" id="furnitureHeight" :placeholder="`${placeholders.furnitureHeight}`">
                <input class="basicButton" id="furnitureWidth" :placeholder="`${placeholders.furnitureWidth}`">
                <input class="basicButton" id="furnitureDepth" :placeholder="`${placeholders.furnitureDepth}`">
                <button id="addFurnitureToCatalog" class="basicButton bottomButton" @click="addFurniture">{{content.addFurnitureToCatalog}}</button>
            </div>
        </div>
    </div>
    <Notifications ref="notifications"/>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import {isLogged, loggedIn} from "public/js/checkLogin";
import { color } from "three/examples/jsm/nodes/Nodes.js";
import Notifications from "~/components/Notifications.vue";

export default {
    name: "CreateNewFurniture",
    components: {
        Notifications
    },
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: {},
            placeholders: {},
            langPrefix: "/",
            styles: {
                minimaliste: { name: "Minimaliste", selected: false },
                modern: { name: "Modern", selected: false },
                contemporain: { name: "Contemporain", selected: false },
                artDeco: { name: "Art déco", selected: false },
                asiatique: { name: "Asiatique", selected: false },
                rustique: { name: "Rustique", selected: false },
            },
            rooms: {
                chambre: { name: "Chambre", selected: false },
                salon: { name: "Salon", selected: false },
                cuisine: { name: "Cuisine", selected: false },
                salleDeBain: { name: "Salle de bain", selected: false },
                garage: { name: "Garage", selected: false },
                terrasse: { name: "Terrasse", selected: false },
            },
            colors: {
                noir: { name: "Noir", hex: "#2A303D", selected: false },
                blanc: { name: "Blanc", hex: "#FFFFFF", selected: false },
                gris: { name: "Gris", hex: "#9B9B9B", selected: false },
                bleuFonce: { name: "Bleu foncé", hex: "#0047AB", selected: false },
                bleuClair: { name: "Bleu clair", hex: "#77B5F2", selected: false },
                beige: { name: "Beige", hex: "#F5F5DC", selected: false },
                ivoire: { name: "Ivoire", hex: "#FFFFD4", selected: false },
                jaune: { name: "Jaune", hex: "#FDFD96", selected: false },
                vertOlive: { name: "Vert olive", hex: "#628737", selected: false },
                vertClair: { name: "Vert clair", hex: "#A3E571", selected: false },
                marronFonce: { name: "Marron foncé", hex: "#523C20", selected: false },
                marronClair: { name: "Marron clair", hex: "#B7894D", selected: false },
            }
        }
    },
    mounted() {
        this.checkIfLogged();
        const body = document.body
        body.style.backgroundColor = "#F4F4F4"
        let lang = this.urlLang

        if (lang !== 'en' && lang !== 'fr') {
            if (localStorage.getItem('lang')) {
                lang = localStorage.getItem('lang');
            } else {
                lang = 'fr';
            }
        }

        this.content = lang === 'en' ? en.settings.companies : fr.settings.companies;
        this.placeholders = lang === 'en' ? en.settings.companies.placeholders : fr.settings.companies.placeholders;
    },
    methods: {
        toggleSelection(item) {
            item.selected = !item.selected;
        },

        async checkIfLogged() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
        },

        async changeLanguageButton() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            console.log("document.getElementById('languageSetterButton').innerHTML = ", document.getElementById('languageSetterButton').innerHTML)
            if (document.getElementById('languageSetterButton').innerHTML == "FR") {
                document.getElementById('languageSetterButton').innerHTML = "EN";
                document.getElementById('languageSetterButton').style.backgroundColor = "red";
            } else {
                document.getElementById('languageSetterButton').innerHTML = "FR";
                document.getElementById('languageSetterButton').style.backgroundColor = "rgb(0, 122, 0)";
            }
        },
        async addFurniture() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const furnitureName = document.querySelector('#furnitureName').value;
            const furniturePrice = document.querySelector('#furniturePrice').value;
            const furnitureHeight = document.querySelector('#furnitureHeight').value;
            const furnitureWidth = document.querySelector('#furnitureWidth').value;
            const furnitureDepth = document.querySelector('#furnitureDepth').value;
            let furnitureColors = "";
            let furnitureStyles = "";
            let furnitureRooms = "";

            // Fix for the colors loop
            for (const color of Object.values(this.colors)) {
                if (color.selected === true) {
                    furnitureColors += color.name + ", ";
                }
            }

            // Fix for the styles loop
            for (const style of Object.values(this.styles)) {
                if (style.selected === true) {
                    furnitureStyles += style.name + ", ";
                }
            }

            // Fix for the rooms loop
            for (const room of Object.values(this.rooms)) {
                if (room.selected === true) {
                    furnitureRooms += room.name + ", ";
                }
            }

            furnitureColors = furnitureColors.slice(0, -2);
            furnitureStyles = furnitureStyles.slice(0, -2);
            furnitureRooms = furnitureRooms.slice(0, -2);

            if (furnitureName === "" || furniturePrice === "" || furnitureStyles === "" || furnitureRooms === "" ||
                furnitureHeight === "" || furnitureWidth === "" || furnitureDepth === "" || furnitureColors === "") {
                this.$refs.notifications.showError("Erreur : Vous n'avez pas rempli toutes les cases.");
                return;
            }

            console.log('https://api.ardeco.app/catalog/' + `${userID}` + '/add?company_api_key=' + `${COMPANY_API_TOKEN}`);
            const response = await fetch('https://api.ardeco.app/catalog/' + `${userID}` + '/add?company_api_key=' + `${COMPANY_API_TOKEN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([{
                    "name": furnitureName,
                    "price": furniturePrice,
                    "styles": furnitureStyles,
                    "rooms": furnitureRooms,
                    "height": furnitureHeight,
                    "width": furnitureWidth,
                    "depth": furnitureDepth,
                    "colors": furnitureColors
                }]),
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 201) {
                document.querySelector('#furnitureName').value = "";
                document.querySelector('#furniturePrice').value = "";
                document.querySelector('#furnitureHeight').value = "";
                document.querySelector('#furnitureWidth').value = "";
                document.querySelector('#furnitureDepth').value = "";
                this.$refs.notifications.showSuccess(result.description);
            } else {
                this.$refs.notifications.showError(result.description);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/styles/ProfileSettings.scss";
@import '~/styles/variables/ColorVariables.scss';

.navbar-top-space {
    height: 10vh;
}

.title {
    font-weight: bold;
    margin-bottom: 4%;
}

.mainContent {
    margin-left: 7.5vw;
    width: 85vw;
    height: 65vh;
    display: flex;
}

.furniturePictureArea {
    height: 100%;
    width: 50%;
}

#furnitureImg {
    border: 2px solid $primary-black;
    height: 100%;
    width: auto;
    border-radius: 10px;
}

.furnitureDetails {
    display: flex;
    margin-left: 2.5%;
    border: 2px solid $primary-black;
    border-radius: 10px;
    padding: 2.5%;
    width: 100%;
}

.furnitureBasicDetails {
    width: 50%;
}

.furnitureSpecificDetails {
    width: 50%;
}

.basicButton {
    text-align: center;
    margin-left: 7.5%;
    border: 1px solid $primary-black;
    border-radius: 5px;
    height: 10%;
    width: 80%;
    margin-bottom: 8%;
    margin-left: 10%;
}

.bottomButton {
    margin-bottom: 0%;
}

.specificDetailTitle {
    border-radius: 5px;
    text-align: center;
    height: 10%;
    width: 50%;
    margin-left: 25%;
    font-weight: bold;
    font-size: 18px;
}

.options {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    margin-top: -10%;
    margin-left: 5%;
    margin-bottom: 5%;
}

.option label {
    cursor: pointer;
    display: inline-block;
    border: 1px solid $primary-black;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    margin-bottom: 10px;
    align-items: center;
    transition: 0.3s;
}

.option label:hover {
    background-color: $primary-black;
    color: white;
}

.option label.selected {
    background-color: $primary-black;
    color: white;
}

.colorOption label {
    cursor: pointer;
    display: inline-block;
    border: 4px solid;
    border-radius: 5px;
    margin: 5px;
    margin-bottom: 10px;
    align-items: center;
    transition: 0.3s;
}

#addFurnitureToCatalog {
    font-weight: bold;
}


@media screen and (max-width: 768px) {
    .mainContent {
        border: none;
        overflow: auto;
        display: inline;
    }

    .furniturePictureArea {
        width: 80%;
        margin-left: 10%;
        margin-top: 10%;
    }

    .furnitureDetails {
        display: inline;
        margin-left: 10%;
        border: none;
        border-radius: 0px;
        padding: 0%;
        width: 80%;
    }

    .furnitureBasicDetails {
        border: none;
        width: 100%;
    }

    .furnitureSpecificDetails {
        margin-top: 10%;
        border: none;
        width: 100%;
    }

    .specificDetailTitle {
        border-radius: 0px;
        height: 10%;
        width: 100%;
        margin-left: 0%;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 10%;
    }
}

</style>
