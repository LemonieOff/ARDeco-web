<template>
    <div class="navbar-top-space"></div>
    <div class="title"> Mon entreprise </div>
    <div class="listSelection">
        <button v-for="(card, index) in cards" :key="index" :id="`card${index}`" class="showListButton" @click="changeSelection(index)" :class="{ active: index === selectedCard }" >
            {{ card.name }}
        </button>
    </div>
    <div class="pageContent">
        <div class="buttonsArea">
            <button class="buttonSettings" @click="deleteArchive">{{buttons.emptyCompagnyArchive}}</button>
            <button class="buttonSettings" style="margin-top:10%" @click="getApiToken">{{buttons.resetCompagnyApiKey}}</button>
        </div>
        <div class="listArea">
            <div class="catalog">
                <div class="grid-header">
                    <div class="grid-item">{{ content.name }}</div>
                    <div class="grid-item">{{ content.colors }}</div>
                    <div class="grid-item">{{ content.rooms }}</div>
                    <div class="grid-item">{{ content.styles }}</div>
                    <div class="grid-item">{{ content.price }}</div>
                    <div class="grid-item no-right-border">{{ content.actions }}</div>
                </div>
                <div v-for="(item) in this.catalogList" class="row">
                    <div class="grid-item bold" v-if="item.company === this.userID">{{ item.name }}</div>
                    <div class="grid-item" v-if="item.company === this.userID">{{ item.colors }}</div>
                    <div class="grid-item" v-if="item.company === this.userID">{{ item.rooms }}</div>
                    <div class="grid-item" v-if="item.company === this.userID">{{ item.styles }}</div>
                    <div class="grid-item" v-if="item.company === this.userID">{{ item.price }}</div>
                    <div class="grid-item no-right-border" v-if="item.company === this.userID">
                        <button class="actionButton redBackground" @click="archiveItem(item.object_id)"> Archive </button>
                    </div>
                </div>
            </div>
            <div class="archive" hidden>
                <div class="grid-header">
                    <div class="grid-item">{{ content.name }}</div>
                    <div class="grid-item">{{ content.colors }}</div>
                    <div class="grid-item">{{ content.rooms }}</div>
                    <div class="grid-item">{{ content.styles }}</div>
                    <div class="grid-item">{{ content.price }}</div>
                    <div class="grid-item no-right-border">{{ content.actions }}</div>
                </div>
                <div v-for="(item) in this.archiveList" class="row">
                    <div class="grid-item bold" v-if="item.company === this.userID">{{ item.name }}</div>
                    <div class="grid-item" v-if="item.company === this.userID">{{ item.colors }}</div>
                    <div class="grid-item" v-if="item.company === this.userID">{{ item.rooms }}</div>
                    <div class="grid-item" v-if="item.company === this.userID">{{ item.styles }}</div>
                    <div class="grid-item" v-if="item.company === this.userID">{{ item.price }}</div>
                    <div class="grid-item no-right-border" v-if="item.company === this.userID">
                        <button class="actionButton greenBackground" @click="restoreItem(item.object_id)"> Restorer </button>
                        <button class="actionButton redBackground" @click="deleteArchive(item.object_id)"> Supprimer </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Notifications ref="notifications"/>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import {isLogged, loggedIn} from "public/js/checkLogin";
import Notifications from "~/components/Notifications.vue";

export default {
    name: "UserCatalogAndArchive",
    components: {
        Notifications,
    },
    props: {
        urlLang: String | null
    },
    data() {
        return {
            cards: [
                { name: 'Catalogue' },
                { name: 'Archive' }
            ],
            content: {},
            buttons: {},
            userID: 0,
            selectedCard: 0,
            catalogList: [],
            archiveList: [],
            langPrefix: "/"
        }
    },
    mounted() {
        const body = document.body
        body.style.backgroundColor = "#F4F4F4"
        this.checkIfLogged();
        let lang = this.urlLang

        if (lang !== 'en' && lang !== 'fr') {
            if (localStorage.getItem('lang')) {
                lang = localStorage.getItem('lang');
            } else {
                lang = 'fr';
            }
        }

        this.content = lang === 'en' ? en.catalog.list : fr.catalog.list;
        this.buttons = lang === 'en' ? en.catalog.buttons : fr.catalog.buttons;

        this.getArchive();
        this.getCatalog();
    },
    methods: {
        async checkIfLogged() {
            const userID_TMP = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            this.userID = Number(userID_TMP);
        },

        changeSelection(index) {
            this.selectedCard = index;

            if (index == 1) {
                document.getElementsByClassName("catalog")[0].hidden = true;
                document.getElementsByClassName("archive")[0].hidden = false;
            } else {
                document.getElementsByClassName("catalog")[0].hidden = false;
                document.getElementsByClassName("archive")[0].hidden = true;
            }
        },

        async getCatalog() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const response = await fetch('https://api.ardeco.app/catalog', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200 && result.data.length == 0) {
                this.catalogList = result.data;
                this.$refs.notifications.showSuccess("Votre catalogue est vide")
            } else {
                this.catalogList = result.data;
            }
        },

        async getArchive() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
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
            if (result.code == 200 && result.data.length == 0) {
                this.archiveList = result.data;
                this.$refs.notifications.showSuccess("Votre archive est vide")
            } else if (result.code == 200) {
                this.archiveList = result.data;
            }
        },

        async archiveItem(itemInputID) {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
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
                this.$refs.notifications.showSuccess(result.description)
            } else {
                this.$refs.notifications.showError(result.description)
            }
            this.getArchive();
            this.getCatalog();
        },

        async deleteArchive(itemInputID) {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const response = await fetch('https://api.ardeco.app/archive/' + `${userID}` + '/' + `${itemInputID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200) {
                this.$refs.notifications.showSuccess(result.description)
            } else {
                this.$refs.notifications.showError(result.description)
            }
            this.getArchive();
            this.getCatalog();
        },

        async restoreItem(itemInputID) {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
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
                this.$refs.notifications.showSuccess(result.description)
            } else {
                this.$refs.notifications.showError(result.description)
            }
            this.getArchive();
            this.getCatalog();
        },

        async deleteArchive() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
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
                this.$refs.notifications.showSuccess(result.description)
            } else {
                this.$refs.notifications.showError(result.description)
            }
        },

        async getApiToken() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const response = await fetch('https://api.ardeco.app/company/requestToken', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200) {
                this.$refs.notifications.showSuccess(result.description)
            } else {
                this.$refs.notifications.showError(result.description)
            }
            localStorage.setItem('COMPANY_API_TOKEN', result.data);
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
    width: 20%;
    margin-left: 7.5%;
    text-align: center;
    font-size: xx-large;
}

.listSelection {
    margin-top: 5vh;
    margin-bottom: 2.5vh;
    height: 5vh;
    width: 25vw;
    margin-left: 37.5vw;
}

.showListButton {
    border: 1px outset $primary-black;
    border-radius: 5px;
    min-width: 35%;
    height: 100%;
    text-align: center;
    transition: 0.3s;
    margin-right: 15%;
}

.showListButton:hover {
    background-color: $primary-black;
    color: $absolute-white;
}

.placementRight {
    margin-left: 30%;
}

.showListButton.active {
    background-color: $primary-black;
    color: $absolute-white;
}

.pageContent {
    display: flex;
    margin-top: 7.5vh;
    margin-left: 5vw;
    width: 90vw;
    height: 60vh;
}

.buttonsArea {
    border-radius: 5px;
    width: 20vw;
}

.buttonSettings {
    width: 70%;
    margin-left: 15%;
    height: 7.5%;
    background-color: $primary-white;
    border: 2px solid $primary-black;
    border-radius: 5px;
    text-align: center;
    transition: 0.3s;
}

.buttonSettings:hover {
    background-color: $primary-black;
    color: $primary-white;
}

.listArea {
    text-align: center;
    margin-left: 5vw;
    width: 65.5vw;
    max-height: 100%;
    overflow: auto;
}

.catalog {
    text-align: center;
    border: 2px solid $primary-black;
    border-radius: 5px;
    width: 65vw;
    max-height: 100%;
    background-color: $secondary-white;
}

.archive {
    text-align: center;
    border: 2px solid $primary-black;
    border-radius: 5px;
    width: 65vw;
    max-height: 100%;
    background-color: $secondary-white;
}


.grid-header {
    display: flex;
    font-weight: bold;
    background-color: $primary-black;
    color: $primary-white;
}

.row {
    display: flex;
}

.grid-item {
    flex: 1;
    padding-top: 15px;
    padding-bottom: 15px;
    border-right: 1px solid $primary-gray;
    border-bottom: 1px solid $primary-gray;
}

.no-right-border {
    border-right: none;
}

.bold {
    font-weight: bold;
}

.actionButton {
    color: $secondary-white;
    padding: 5px;
    border: 1px solid $primary-black;
    border-radius: 5px;
}

.redBackground {
    background-color: $primary-red;
}

.greenBackground {
    background-color: green;
    margin-right: 5%;
}

</style>
