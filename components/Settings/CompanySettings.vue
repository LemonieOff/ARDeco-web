<template>
    <div class="text-center font-bold text-xl md:text-4xl my-8">{{content.title}}</div>
    <div class="parameters">
        <hr>
        <div class="left-side-parameters">
            <button id="getCompagnyCatalog" class="buttonSettings" style="margin-top: 17.5%;" @click="getCatalog">{{content.getCompagnyCatalog}}</button>
            <button id="getCompagnyArchive" class="buttonSettings" style="margin-top: 2.5%;" @click="getArchive">{{content.getCompagnyArchive}}</button>
            <button id="emptyCompagnyArchive" class="buttonSettings" style="margin-top: 2.5%;" @click="deleteArchive">{{content.emptyCompagnyArchive}}</button>
            <button id="resetCompagnyApiKey" class="buttonSettings" style="margin-top: 2.5%;" @click="getApiToken">{{content.resetCompagnyApiKey}}</button>
            <div style="margin-top: 12%;">
                <input class="buttonSettings" style="width: 45%;" id="itemInputID" :placeholder="`${content.placeholders.itemInputID}`">
                <button id="visibilityButton" style="background-color: green; width: 15%;" @click="changeVisibility">Visible</button>
            </div>
            <button id="changeGalleryVisibility" class="buttonSettings" style="margin-top: 2.5%;" @click="setItemVisibility">{{content.changeGalleryVisibility}}</button>
            <button id="archiveItem" class="buttonSettings" style="margin-top: 2.5%;" @click="archiveItem">{{content.archiveItem}}</button>
            <button id="archiveItem" class="buttonSettings" style="margin-top: 2.5%;" @click="deleteSingleItem">{{content.deleteItem}}</button>
            <button id="restoreItemFromArchive" class="buttonSettings" style="margin-top: 2.5%;" @click="restoreItem">{{content.restoreItemFromArchive}}</button>
        </div>
        <div class="center-side-parameters">
            <div class="addFurnitureDiv">
                <button id="addFurnitureToCatalog" class="buttonSettings" style="margin-top: 17.5%;" @click="addFurniture">{{content.addFurnitureToCatalog}}</button>
                <input class="buttonSettings" id="furnitureName" :placeholder="`${content.placeholders.furnitureName}`">
                <input class="buttonSettings" id="furniturePrice" :placeholder="`${content.placeholders.furniturePrice}`">
                <input class="buttonSettings" id="furnitureStyles" :placeholder="`${content.placeholders.furnitureStyles}`">
                <input class="buttonSettings" id="furnitureRooms" :placeholder="`${content.placeholders.furnitureRooms}`">
                <input class="buttonSettings" id="furnitureHeight" :placeholder="`${content.placeholders.furnitureHeight}`">
                <input class="buttonSettings" id="furnitureWidth" :placeholder="`${content.placeholders.furnitureWidth}`">
                <input class="buttonSettings" id="furnitureDepth" :placeholder="`${content.placeholders.furnitureDepth}`">
                <input class="buttonSettings" id="furnitureColors" :placeholder="`${content.placeholders.furnitureColors}`">
            </div>
        </div>
        <div class="right-side-parameters">
            <div id="reponseText" class="buttonSettingsResponse"></div>
        </div>
    </div>
</template>

<script>
import {isLogged, loggedIn} from "@/public/ts/checkLogin";

export default {
    name: "CompanySettings",
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: this.$content.settings.companies,
            langPrefix: "/",
            backendHost: this.$config.public.backendHost,
        }
    },
    mounted() {
        this.checkIfLogged();
    },
    methods: {
        async checkIfLogged() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
        },
        async deleteArchive() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const response = await fetch(`${this.backendHost}/archive/` + `${userID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200) {
                document.getElementById('reponseText').innerHTML = 'Archive cleared';
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
        },

        async deleteSingleItem() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const itemInputID = document.getElementById('itemInputID').value;
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const response = await fetch(`${this.backendHost}/archive/` + `${userID}` + '/' + `${itemInputID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200) {
                document.getElementById('reponseText').innerHTML = result.description;
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
            document.getElementById('itemInputID').value = "";
        },

        async archiveItem() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const itemInputID = document.getElementById('itemInputID').value;
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            console.log(`${this.backendHost}/catalog/` + `${userID}` + '/remove/' + `${itemInputID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`);
            const response = await fetch('${backendHost}/catalog/' + `${userID}` + '/remove/' + `${itemInputID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200) {
                document.getElementById('reponseText').innerHTML = result.description;
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
            document.getElementById('itemInputID').value = "";
        },
        async restoreItem() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const itemInputID = document.getElementById('itemInputID').value;
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const response = await fetch(`${this.backendHost}/archive/restore/` + `${userID}` + '/' + `${itemInputID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200) {
                document.getElementById('reponseText').innerHTML = result.description;
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
            document.getElementById('itemInputID').value = "";
        },
        async getArchive() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const response = await fetch(`${this.backendHost}/archive/` + `${userID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            document.getElementById('reponseText').innerHTML = '';
            if (result.code == 200 && result.data.length == 0) {
                document.getElementById('reponseText').innerHTML = 'Archive empty';
            } else if (result.code == 200) {
                for (let i = 0; i < result.data.length; i++) {
                    document.getElementById('reponseText').innerHTML +=
                        '<p>' + (i + 1) + '. ' + `${result.data[i].company_name}` +
                        ' - ' + `${result.data[i].name}` +
                        ' - ' + `${result.data[i].rooms}` +
                        ' - ' + `${result.data[i].styles}` +
                        ' - ' + `${result.data[i].price}` + '€' +
                        ' - ' + `${result.data[i].object_id}` +  '</p>';
                }
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
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
            const furnitureStyles = document.querySelector('#furnitureStyles').value;
            const furnitureRooms = document.querySelector('#furnitureRooms').value;
            const furnitureHeight = document.querySelector('#furnitureHeight').value;
            const furnitureWidth = document.querySelector('#furnitureWidth').value;
            const furnitureDepth = document.querySelector('#furnitureDepth').value;
            const furnitureColors = document.querySelector('#furnitureColors').value;
            if ( furnitureName == "" || furniturePrice == "" || furnitureStyles == "" || furnitureRooms == "" ||
            furnitureHeight == "" || furnitureWidth == "" || furnitureDepth == "" || furnitureColors == "") {
                document.getElementById('reponseText').innerHTML = "At least one of the furniture element is empty, please fill every possible element and try again.";
                return;
            }
            console.log(`${this.backendHost}/catalog/` + `${userID}` + '/add?company_api_key=' + `${COMPANY_API_TOKEN}`);
            const response = await fetch('${backendHost}/catalog/' + `${userID}` + '/add?company_api_key=' + `${COMPANY_API_TOKEN}`, {
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
                document.getElementById('reponseText').innerHTML = result.description;
                document.querySelector('#furnitureName').value = "";
                document.querySelector('#furniturePrice').value = "";
                document.querySelector('#furnitureStyles').value = "";
                document.querySelector('#furnitureRooms').value = "";
                document.querySelector('#furnitureHeight').value = "";
                document.querySelector('#furnitureWidth').value = "";
                document.querySelector('#furnitureDepth').value = "";
                document.querySelector('#furnitureColors').value = "";
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
        },
        async getCatalog() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const response = await fetch(`${this.backendHost}/catalog`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            document.getElementById('reponseText').innerHTML = '';
            if (result.code == 200 && result.data.length == 0) {
                document.getElementById('reponseText').innerHTML = 'Catalog empty';
            } else {
                for (let i = 0; i < result.data.length; i++) {
                    document.getElementById('reponseText').innerHTML +=
                        '<p>' + (i + 1) + '. ' + `${result.data[i].name}` +
                        ' - ' + `${result.data[i].styles}` +
                        ' - ' + `${result.data[i].price}` +
                        '€ - ' + `${result.data[i].id}` +
                        ' - ' + `${result.data[i].object_id}` + '</p>';
                }
            }
        },

        async setItemVisibility() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            if (document.getElementById('itemInputID').value == "") {
                document.getElementById('reponseText').innerHTML = "Please precise the id of the item you want to change.";
                return;
            }
            let bool = false;
            if (document.getElementById('visibilityButton').innerHTML == 'Visible') {
                bool = true;
            }
            const itemInputID = document.getElementById('itemInputID').value;
            console.log(`${this.backendHost}/gallery/` + itemInputID);
            const response = await fetch(`${this.backendHost}/gallery/` + itemInputID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "visibility": bool
                }),
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200) {
                document.getElementById('reponseText').innerHTML = result.description;
                document.getElementById('itemInputID').value = "";
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
            document.getElementById('itemInputID').value = "";
        },
        async changeVisibility() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            let content = document.getElementById('visibilityButton').innerHTML;
            if (content == 'Visible') {
                document.getElementById('visibilityButton').innerHTML = 'Invisible';
                document.getElementById('visibilityButton').style = "background-color: red; width: 15%;";
            } else if (content == 'Invisible') {
                document.getElementById('visibilityButton').innerHTML = 'Visible';
                document.getElementById('visibilityButton').style = "background-color: green; width: 15%;";
            }
        },
        async getApiToken() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const response = await fetch(`${this.backendHost}/company/requestToken`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            localStorage.setItem('COMPANY_API_TOKEN', result.data);
            document.getElementById('reponseText').innerHTML = result.description;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/ProfileSettings.scss";
.navbar-top-space {
    height: 10vh;
}

.title {
    font-weight: bold;
    margin-bottom: 4%;
}

.parameters {
    display: inline-flex;
    min-height: 80vh;
}

.left-side-parameters {
    width: 33.3%;
    text-align: center;
}

.center-side-parameters {
    width: 33.3%;
    text-align: center;
}

.currentUserSettings {
    background-color: #F4F4F4;
    margin-left: 20%;
    width: 60%;
    min-height: 15%;
    align-self: center;
    border-radius: 20px;
}

.currentUserSettingsTitle {
    padding: 2%;
    font-weight: bold;
}

.optionOnOff {
    padding: 1%;
}

.updateUserSettings {
    margin-top: 10%;
    background-color: #F4F4F4;
    margin-left: 20%;
    width: 60%;
    min-height: 15%;
    align-self: center;
    border-radius: 20px;
}

#setUserSettings {
    font-weight: bold;
    margin: 2%;
}

.settingsSetter {
    padding: 1%;
}

.optionSetter {
    border-radius: 5px;
    font-weight: bold;
    background-color: rgb(0, 122, 0);
}

.secondOptionSetter {
    border-radius: 5px;
    font-weight: bold;
    background-color: red;
}

.addFurnitureDiv {
    margin-top: 10%;
}

.right-side-parameters {
    width: 33.3%;
}

button {
    background-color: #F4F4F4;
    outline-style: solid;
    outline-width: thin;
    border-radius: 5px;
}

.buttonSettings {
    width: 60%;
    margin-top: 1%;
    background-color: #F4F4F4;
    text-align: center;
}

.buttonSettingsResponse {
    background-color: #F4F4F4;
    margin-top: 5%;
    margin-left: 20%;
    width: 60%;
    min-height: 75%;
    align-self: center;
    border-radius: 20px;
}

#responseText {
    overflow-y: auto;
}

</style>
