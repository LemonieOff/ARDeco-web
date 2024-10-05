<template>
    <div class="text-center font-bold text-xl md:text-4xl my-8">{{content.title}}</div>
    <div class="parameters">
        <hr>
        <div class="left-side-parameters">
            <div class="currentUserSettings">
                <div class="parameterOption">
                    <div class="parameterTitle"> {{ content.notificationsActive }} </div>
                    <div class="parameterElement">
                        <span id="notifications_enabled"></span>
                        <button class="parameterModifier" @click="setSetting('notifications_enabled', !this.settings.notifications_enabled)"> Modifier </button>
                    </div>
                </div>
                <div class="parameterOption">
                    <div class="parameterTitle"> {{ content.publicLastName}} </div>
                    <div class="parameterElement">
                        <span id="display_lastname_on_public"></span>
                        <button class="parameterModifier" @click="setSetting('display_lastname_on_public', !this.settings.display_lastname_on_public)"> Modifier </button>
                    </div>
                </div>
                <div class="parameterOption">
                    <div class="parameterTitle"> {{ content.publicEmailAddress }} </div>
                    <div class="parameterElement">
                        <span id="display_email_on_public"></span>
                        <button class="parameterModifier" @click="setSetting('display_email_on_public', !this.settings.display_email_on_public)"> Modifier </button>
                    </div>
                </div>
                <div class="parameterOption">
                    <div class="parameterTitle"> {{ content.newGalleries }} </div>
                    <div class="parameterElement">
                        <span id="automatic_new_gallery_share"></span>
                        <button class="parameterModifier" @click="setSetting('automatic_new_gallery_share', !this.settings.automatic_new_gallery_share)"> Modifier </button>
                    </div>
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
import { isLogged, loggedIn } from "public/ts/checkLogin";
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
            galleryData: [],
            settings: []
        }
    },
    mounted() {
        this.getGallery();
        let lang = this.urlLang
        console.log("lang :", lang)

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
        async setSetting(optionName, optionEffect) {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            console.log(optionName, optionEffect);

            const response = await fetch('https://api.ardeco.app/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    [optionName]: optionEffect,
                }),
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200) {
                this.$refs.notifications.showSuccess("Parameters changed successfully.");
                if (optionEffect) {
                    document.getElementById([optionName]).textContent = "Oui";
                } else {
                    document.getElementById([optionName]).textContent = "Non"
                }
            } else {
                this.$refs.notifications.showError("Error : We couldn't change your parameters, please try again.");
            }
            this.getSettings();
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
            this.settings = result.data;

            console.log(result);
            if (result.code == 200) {
                if (this.settings.notifications_enabled == true) {
                    document.getElementById("notifications_enabled").textContent = this.content.yes;
                } else {
                    document.getElementById("notifications_enabled").textContent = this.content.no;
                }
                if (this.settings.display_lastname_on_public == true) {
                    document.getElementById("display_lastname_on_public").textContent = this.content.yes;
                } else {
                    document.getElementById("display_lastname_on_public").textContent = this.content.no;
                }
                if (this.settings.display_email_on_public == true) {
                    document.getElementById("display_email_on_public").textContent = this.content.yes;
                } else {
                    document.getElementById("display_email_on_public").textContent = this.content.no;
                }
                if (this.settings.automatic_new_gallery_share == true) {
                    document.getElementById("automatic_new_gallery_share").textContent = this.content.yes;
                } else {
                    document.getElementById("automatic_new_gallery_share").textContent = this.content.no;
                }
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
@import '@/styles/variables/ColorVariables.scss';

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
    align-self: center;
    border-radius: 10px;
    padding: 10px;
}

.currentUserSettingsTitle {
    padding: 2%;
    font-weight: bold;
}

.parameterOption {
    width: 90%;
    margin-left: 5%;
    text-align: left;
    padding: 10px;
}

.parameterTitle {
    color: gray;
}

.parameterElement {
    font-size: 14px;
}

.parameterModifier {
    border: 1px solid $primary-black;
    border-radius: 5px;
    background-color: $background-main-theme;
    padding: 5px;
    float: right;
    margin-top: -15px;
}

// .optionOnOff {
//     padding: 1%;
// }

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
