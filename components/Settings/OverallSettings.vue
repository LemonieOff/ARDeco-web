<template>
    <div class="navbar-top-space"></div>
    <div class="title">{{content.title}}</div>
    <div class="parameters">
        <hr>
        <div class="center-side-parameters">
            <div class="currentUserSettings">
                <div class="currentUserSettingsTitle" id="currentUserSettings">{{content.currentUserSettingsTitle}}</div>
                <div class="optionOnOff">
                    <span>{{content.language}} : </span>
                    <span id="currentLang">OFF</span>
                </div>
                <div class="optionOnOff">
                    <span>Notifications : </span>
                    <span id="currentNotifications">OFF</span>
                </div>
            </div>
            <div class="updateUserSettings">
                <button id="setUserSettings" class="buttonSettings" @click="setSettings">{{content.setUserSettings}}</button>
                <div class="settingsSetter">
                    <span id="languageSetter">{{content.language}} : </span>
                    <button class="optionSetter" id="languageSetterButton" @click="changeLanguageButton">FR</button>
                </div>
                <div class="settingsSetter">
                    <span id="notificationsSetter">Notifications : </span>
                    <button class="optionSetter" id="notificationsSetterButton" @click="changeNotificationsButton">ON</button>
                </div>
            </div>
            <button id="getUserGallery" class="buttonSettings" style="margin-top: 10%;" @click="getGallery">{{content.getUserGallery}}</button>
        </div>
        <div class="right-side-parameters">
            <div id="reponseText" class="buttonSettingsResponse"></div>
        </div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import {isLogged, loggedIn} from "public/js/checkLogin";

export default {
    name: "OverallSettings",
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: {},
            placeholders: {},
            langPrefix: "/"
        }
    },
    mounted() {
        let lang = this.urlLang

        if (lang !== 'en' && lang !== 'fr') {
            if (localStorage.getItem('lang')) {
                lang = localStorage.getItem('lang');
            } else {
                lang = 'fr';
            }
        }

        this.content = lang === 'en' ? en.settings.users : fr.settings.users;
        this.placeholders = lang === 'en' ? en.settings.users.placeholders : fr.settings.users.placeholders;

        this.getSettings();
    },
    methods: {
        async changeLanguageButton() {
            await isLogged();
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
        async changeNotificationsButton() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
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
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
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
        async getSettings() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
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
                localStorage.setItem('dark_mode', result.data.dark_mode);
                console.log('result.data.dark_mode : ', result.data.dark_mode);
                localStorage.setItem('lang', result.data.language);
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
        },
        async getGallery() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
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
    min-height: 100%;
    width: 50%;
    margin-left: 25%;
}

.center-side-parameters {
    width: 50%;
    text-align: center;
}

.right-side-parameters {
    width: 50%;
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
    margin-left: 20%;
    width: 60%;
    height: 100%;
    align-self: center;
    border-radius: 20px;
}

</style>
