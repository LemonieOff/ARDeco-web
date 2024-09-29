<template>
    <div class="text-center font-bold text-xl md:text-4xl my-8">{{content.title}}</div>
    <div class="parameters">
        <hr>
        <div class="left-side-parameters">
            <div class="currentUserSettings">
                <div class="currentUserSettingsTitle" id="currentUserSettings">{{content.currentUserSettingsTitle}}</div>
                <div class="optionOnOff">
                    <span>{{content.language}} : </span>
                    <span id="currentLang">{{content.no}}</span>
                </div>
                <div class="optionOnOff">
                    <span>{{content.notifications}} : </span>
                    <span id="currentNotifications">{{content.no}}</span>
                </div>
            </div>
            <div class="updateUserSettings">
                <button id="setUserSettings" class="buttonSettings" @click="setSettings">{{content.setUserSettings}}</button>
                <div class="settingsSetter">
                    <span id="languageSetter">{{content.language}} : </span>
                    <button class="optionSetter" id="languageSetterButton" @click="changeLanguageButton">{{content.french}}</button>
                </div>
                <div class="settingsSetter">
                    <span id="notificationsSetter">{{content.notifications}} : </span>
                    <button class="optionSetter" id="notificationsSetterButton" @click="changeNotificationsButton">{{content.yes}}</button>
                </div>
            </div>
        </div>
        <div class="right-side-parameters">
            <div class="centered bordered">
                <table v-if="galleryData.length">
                    <thead>
                        <tr>
                            <th>{{content.name}}</th>
                            <th>{{content.room}}</th>
                            <th>{{content.style}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="gallery in galleryData" :key="gallery.id">
                            <td>{{ gallery.name }}</td>
                            <td>{{ gallery.room }}</td>
                            <td>{{ gallery.style }}</td>
                        </tr>
                    </tbody>
                </table>
                <p v-else>{{content.galleryIsEmpty}}</p>
            </div>
        </div>
    </div>
    <Notifications ref="notifications"/>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import {isLogged, loggedIn} from "public/ts/checkLogin";
import Notifications from "@/components/Notifications.vue";

export default {
    name: "OverallSettings",
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
            galleryData: []
        }
    },
    mounted() {
        this.getGallery();
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
            if (document.getElementById('languageSetterButton').innerHTML == this.content.french) {
                document.getElementById('languageSetterButton').innerHTML = this.content.english;
                document.getElementById('languageSetterButton').style.backgroundColor = "red";
            } else {
                document.getElementById('languageSetterButton').innerHTML = this.content.french;
                document.getElementById('languageSetterButton').style.backgroundColor = "rgb(0, 122, 0)";
            }
        },
        async changeNotificationsButton() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            console.log("document.getElementById('notificationsSetterButton').innerHTML = ", document.getElementById('notificationsSetterButton').innerHTML)
            if (document.getElementById('notificationsSetterButton').innerHTML == this.content.yes) {
                document.getElementById('notificationsSetterButton').innerHTML = this.content.no;
                document.getElementById('notificationsSetterButton').style.backgroundColor = "red";
            } else {
                document.getElementById('notificationsSetterButton').innerHTML = this.content.yes;
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
            if (document.querySelector('#languageSetterButton').innerHTML == this.content.english) {
                lang = 'en';
            }
            if (document.querySelector('#notificationsSetterButton').innerHTML == this.content.no) {
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
                this.$refs.notifications.showSuccess("Parameters changed successfully.");
                localStorage.setItem('lang', lang);
            } else {
                this.$refs.notifications.showError("Error : We couldn't change your parameters, please try again.");
            }
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
                    document.getElementById('currentLang').innerHTML = this.content.french;
                } else {
                    document.getElementById('currentLang').innerHTML = this.content.english;
                }
                if (result.data.notifications_enabled == true) {
                    document.getElementById('currentNotifications').innerHTML = this.content.yes;
                } else {
                    document.getElementById('currentNotifications').innerHTML = this.content.no;
                }
                localStorage.setItem('dark_mode', result.data.dark_mode);
            } else {
                this.$refs.notifications.showError("Error : Couldn't receive your current settings, please try again later.");
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
            this.galleryData = result.data;
            if (result.code == 200 && result.data.length == 0) {
                this.$refs.notifications.showSuccess("Your personnal gallery is currently empty.");
            } else if (result.code != 200) {
                this.$refs.notifications.showError("Error : We couldn't the informations of your gallery.");
            }
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
    margin-top: 5%;
    display: inline-flex;
    width: 70%;
    margin-left: 15%;
}

.left-side-parameters {
    width: 30%;
    text-align: center;
}

.right-side-parameters {
    width: 70%;
}

.currentUserSettings {
    background-color: #F4F4F4;
    min-height: 15%;
    align-self: center;
    border-radius: 10px;
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
    min-height: 15%;
    align-self: center;
    border-radius: 10px;
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
    border-radius: 10px;
}

.centered {
    width: 60%;
    margin-left: 20%;
    text-align: center;
}

.bottomMargin {
    margin-bottom: 50px;
}

.bordered {
    border: 1px solid #846700;
    border-radius: 5px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 10px;
    border: 1px solid #ddd;
}

th {
    background-color: #f4f4f4;
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

</style>
