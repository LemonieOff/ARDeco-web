<template>
    <div class="navbar-top-space"></div>
    <div class="title">Your settings</div>
    <div class="parameters">
        <hr>
        <div class="left-side-parameters">
            <button id="getUserGallery" class="buttonSettings" style="margin-top: 17.5%;" @click="getGallery">Get user gallery</button>
            <button id="getCompagnyCatalog" class="buttonSettings" style="margin-top: 2.5%;" @click="getCatalog">Get compagny catalog</button>
            <button id="getCompagnyArchive" class="buttonSettings" style="margin-top: 2.5%;" @click="getArchive">Get compagny archive</button>
            <button id="emptyCompagnyArchive" class="buttonSettings" style="margin-top: 2.5%;" @click="deleteArchive">Empty compagny archive</button>
            <button id="resetCompagnyApiKey" class="buttonSettings" style="margin-top: 2.5%;" @click="getApiToken">Reset company API key</button>
            <div style="margin-top: 12%;">
                <input class="buttonSettings" style="width: 45%;" id="itemInputID" placeholder="Item ID">
                <button id="visibilityButton" style="background-color: green; width: 15%;" @click="changeVisibility">Visible</button>
            </div>
            <button id="changeGalleryVisibility" class="buttonSettings" style="margin-top: 2.5%;" @click="setItemVisibility">Change gallery item visibility</button>
            <button id="archiveItem" class="buttonSettings" style="margin-top: 2.5%;" @click="archiveItem">Archive item</button>
            <button id="restoreItemFromArchive" class="buttonSettings" style="margin-top: 2.5%;" @click="restoreItem">Restore item from archive</button>
        </div>
        <div class="center-side-parameters">
            <div class="currentUserSettings">
                <div class="currentUserSettingsTitle" id="currentUserSettings">Your current settings</div>
                <div class="optionOnOff">
                    <span>Language : </span>
                    <span id="currentLang">OFF</span>
                </div>
                <div class="optionOnOff">
                    <span>Notifications : </span>
                    <span id="currentNotifications">OFF</span>
                </div>
            </div>
            <div class="updateUserSettings">
                <button id="setUserSettings" class="buttonSettings" @click="setSettings">Change user settings</button>
                <div class="settingsSetter">
                    <span id="languageSetter">Language : </span>
                    <button class="optionSetter" id="languageSetterButton" @click="changeLanguageButton">FR</button>
                </div>
                <div class="settingsSetter">
                    <span id="notificationsSetter">Notifications : </span>
                    <button class="optionSetter" id="notificationsSetterButton" @click="changeNotificationsButton">ON</button>
                </div>
            </div>
            <!-- <button id="getUserSettings" class="buttonSettings" @click="getSettings">Get user settings</button> -->
            <div class="addFurnitureDiv">
                <button id="addFurnitureToCatalog" class="buttonSettings" @click="addFurniture">Add a furniture to the catalog</button>
                <input class="buttonSettings" id="furnitureName" placeholder="Furniture name">
                <input class="buttonSettings" id="furniturePrice" placeholder="Furniture price">
                <input class="buttonSettings" id="furnitureStyles" placeholder="Furniture styles">
                <input class="buttonSettings" id="furnitureRooms" placeholder="Furniture rooms">
                <input class="buttonSettings" id="furnitureHeight" placeholder="Furniture height">
                <input class="buttonSettings" id="furnitureWidth" placeholder="Furniture width">
                <input class="buttonSettings" id="furnitureDepth" placeholder="Furniture depth">
                <input class="buttonSettings" id="furnitureColors" placeholder="Furniture colors">
            </div>
        </div>
        <div class="right-side-parameters">
            <div id="reponseText" class="buttonSettingsResponse"></div>
        </div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
export default {
    name: "OverallSettings",
    props: {
        urlLang: String
    },
    mounted() {
        let lang = this.urlLang
        if (lang == null) {
            lang = localStorage.getItem('lang')
        }

        if (location.href.includes("/fr/") && localStorage.getItem('lang') == "en") {
            location.href = location.href.replace("/fr/", "/en/")
        } else if (location.href.includes("/en/") && localStorage.getItem('lang') == "fr") {
            location.href = location.href.replace("/en/", "/fr/")
        }

        if (lang == 'en') {
            // document.getElementById('getUserSettings').innerText = en.profile.settings.getUserSettings
            document.getElementById('setUserSettings').innerText = en.profile.settings.setUserSettings
            document.getElementById('addFurnitureToCatalog').innerText = en.profile.settings.addFurnitureToCatalog
            document.getElementById('getUserGallery').innerText = en.profile.settings.getUserGallery
            document.getElementById('changeGalleryVisibility').innerText = en.profile.settings.changeGalleryVisibility
            document.getElementById('getCompagnyCatalog').innerText = en.profile.settings.getCompagnyCatalog
            document.getElementById('getCompagnyArchive').innerText = en.profile.settings.getCompagnyArchive
            document.getElementById('emptyCompagnyArchive').innerText = en.profile.settings.emptyCompagnyArchive
            document.getElementById('archiveItem').innerText = en.profile.settings.archiveItem
            document.getElementById('restoreItemFromArchive').innerText = en.profile.settings.restoreItemFromArchive
            document.getElementById('resetCompagnyApiKey').innerText = en.profile.settings.resetCompagnyApiKey
        } else {
            // document.getElementById('getUserSettings').innerText = fr.profile.settings.getUserSettings
            document.getElementById('setUserSettings').innerText = fr.profile.settings.setUserSettings
            document.getElementById('addFurnitureToCatalog').innerText = fr.profile.settings.addFurnitureToCatalog
            document.getElementById('getUserGallery').innerText = fr.profile.settings.getUserGallery
            document.getElementById('changeGalleryVisibility').innerText = fr.profile.settings.changeGalleryVisibility
            document.getElementById('getCompagnyCatalog').innerText = fr.profile.settings.getCompagnyCatalog
            document.getElementById('getCompagnyArchive').innerText = fr.profile.settings.getCompagnyArchive
            document.getElementById('emptyCompagnyArchive').innerText = fr.profile.settings.emptyCompagnyArchive
            document.getElementById('archiveItem').innerText = fr.profile.settings.archiveItem
            document.getElementById('restoreItemFromArchive').innerText = fr.profile.settings.restoreItemFromArchive
            document.getElementById('resetCompagnyApiKey').innerText = fr.profile.settings.resetCompagnyApiKey
        }
        this.getSettings();
    },
    methods: {
        async checkUserConnected () {
            const userID = localStorage.getItem('userID');
            if (userID == null) {
                console.log('No user found, redirecting to login');
                window.location.href = 'http://localhost:3000/login';
                return -1;
            };
            return userID;
        },
        async deleteArchive() {
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const response = await fetch('https://api.ardeco.app/archive/' + `${userID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
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
        async archiveItem() {
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
            const itemInputID = document.getElementById('itemInputID').value;
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            console.log('https://api.ardeco.app/catalog/' + `${userID}` + '/remove/' + `${itemInputID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`);
            const response = await fetch('https://api.ardeco.app/catalog/' + `${userID}` + '/remove/' + `${itemInputID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
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
        },
        async restoreItem() {
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
            const itemInputID = document.getElementById('itemInputID').value;
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const response = await fetch('https://api.ardeco.app/archive/restore/' + `${userID}` + '/' + `${itemInputID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
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
        },
        async getArchive() {
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const response = await fetch('https://api.ardeco.app/archive/' + `${userID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
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
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
            console.log("document.getElementById('languageSetterButton').innerHTML = ", document.getElementById('languageSetterButton').innerHTML)
            if (document.getElementById('languageSetterButton').innerHTML == "FR") {
                document.getElementById('languageSetterButton').innerHTML = "EN";
                document.getElementById('languageSetterButton').style.backgroundColor = "red";
            } else {
                document.getElementById('languageSetterButton').innerHTML = "FR";
                document.getElementById('languageSetterButton').style.backgroundColor = "rgb(0, 122, 0)";
            }
        },
        async changeNotificationsButton() {
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
            console.log("document.getElementById('notificationsSetterButton').innerHTML = ", document.getElementById('notificationsSetterButton').innerHTML)
            if (document.getElementById('notificationsSetterButton').innerHTML == "ON") {
                document.getElementById('notificationsSetterButton').innerHTML = "OFF";
                document.getElementById('notificationsSetterButton').style.backgroundColor = "red";
            } else {
                document.getElementById('notificationsSetterButton').innerHTML = "ON";
                document.getElementById('notificationsSetterButton').style.backgroundColor = "rgb(0, 122, 0)";
            }
        },
        async setSettings() {
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
            let lang = 'fr';
            let notifs = true;
            if (document.querySelector('#languageSetterButton').innerHTML == "EN") {
                lang = 'en';
            }
            if (document.querySelector('#notificationsSetterButton').innerHTML == "OFF") {
                notifs = false;
            }
            console.log(lang, notifs, true, userID, 'https://api.ardeco.app/settings');
            const response = await fetch('https://api.ardeco.app/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "language": lang,
                    "notifications_enabled": notifs,
                    "sounds_enabled": true  // Useless
                }),
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200) {
                document.getElementById('reponseText').innerHTML = result.description;
                localStorage.setItem('lang', lang);
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
            location.reload()
        },
        async addFurniture() {
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
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
        async getSettings() {
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
            const response = await fetch('https://api.ardeco.app/settings', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200) {
                if (result.data.language == "fr") {
                    document.getElementById('currentLang').innerHTML = "FR";
                } else {
                    document.getElementById('currentLang').innerHTML = "EN";
                }
                if (result.data.notifications_enabled == true) {
                    document.getElementById('currentNotifications').innerHTML = "ON";
                } else {
                    document.getElementById('currentNotifications').innerHTML = "OFF";
                }
                localStorage.setItem('lang', result.data.language);
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
        },
        async getGallery() {
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
            const response = await fetch('https://api.ardeco.app/gallery/user/' + `${userID}`, {
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
                document.getElementById('reponseText').innerHTML = 'Gallery empty';
            } else {
                for (let i = 0; i < result.data.length; i++) {
                    document.getElementById('reponseText').innerHTML += 
                        '<p>' + (i + 1) + '. ' + `${result.data[i].name}` +
                        ' - ' + `${result.data[i].room_type}` + 
                        ' - ' + `${result.data[i].description}` +
                        ' - ' + `${result.data[i].id}` + '</p>';
                }
            }
        },
        async getCatalog() {
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
            const response = await fetch('https://api.ardeco.app/catalog', {
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
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
            if (localStorage.getItem('userID') == null) {
                console.log('No user found, redirecting to login');
                window.location.href = 'http://localhost:3000/login';
                return;
            } else if (document.getElementById('itemInputID').value == "") {
                document.getElementById('reponseText').innerHTML = "Please precise the id of the item you want to change.";
                return;
            }
            let bool = false;
            if (document.getElementById('visibilityButton').innerHTML == 'Visible') {
                bool = true;
            }
            const itemInputID = document.getElementById('itemInputID').value;
            console.log('https://api.ardeco.app/gallery/' + itemInputID);
            const response = await fetch('https://api.ardeco.app/gallery/' + itemInputID, {
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
        },
        async changeVisibility() {
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
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
            const userID = this.checkUserConnected();
            if (userID == -1)
                return;
            const response = await fetch('https://api.ardeco.app/company/requestToken', {
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
@import "~/styles/ProfileSettings.scss";

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
    border: 1px solid red;
    width: 33.3%;
    text-align: center;
}

.center-side-parameters {
    border: 1px solid red;
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
    border: 1px solid red;
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

</style>
