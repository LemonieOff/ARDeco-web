<template>
    <h1 class="text-center font-bold text-xl md:text-4xl my-8">{{ content.myCompany }}</h1>
    <div class="listSelection flex justify-center mx-auto gap-10 sm:w-1/3">
        <button v-for="(card, index) in cards" :id="`card${index}`" :key="index"
                :class="{ active: index === selectedCard }"
                class="showListButton" @click="selectedCard = index">
            {{ card.name }}
        </button>
    </div>
    <div class="pageContent">
        <div class="buttonsArea">
            <button class="buttonSettings" style="margin-top: 0" @click="goToFurnitureCreation">
                {{ content.buttons.createNewFurniture }}
            </button>
            <button class="buttonSettings" @click="deleteArchive">{{ content.buttons.emptyCompagnyArchive }}</button>
            <button class="buttonSettings" @click="getApiToken">{{ content.buttons.resetCompagnyApiKey }}</button>
        </div>
        <div class="listArea">
            <div v-if="selectedCard === 0" class="catalog">
                <div class="grid-header">
                    <div class="grid-item">{{ content.list.name }}</div>
                    <div class="grid-item">{{ content.list.colors }}</div>
                    <div class="grid-item">{{ content.list.rooms }}</div>
                    <div class="grid-item">{{ content.list.styles }}</div>
                    <div class="grid-item">{{ content.list.price }}</div>
                    <div class="grid-item no-right-border">{{ content.list.actions }}</div>
                </div>
                <div v-for="(item) in this.catalogList" class="flex">
                    <div v-if="item.company === this.userID" class="grid-item font-bold">{{ item.name }}</div>
                    <div v-if="item.company === this.userID" class="grid-item">
                        <span v-for="(col, index) in item.colors" :key="index">
                            {{ col.color }}
                            <span v-if="index < item.colors.length - 1">, </span>
                        </span>
                    </div>
                    <div v-if="item.company === this.userID" class="grid-item">
                        <span v-for="(room, index) in item.rooms" :key="index">
                            {{ room }}
                            <span v-if="index < item.rooms.length - 1">, </span>
                        </span>
                    </div>
                    <div v-if="item.company === this.userID" class="grid-item">
                        <span v-for="(style, index) in item.styles" :key="index">
                            {{ style }}
                            <span v-if="index < item.styles.length - 1">, </span>
                        </span>
                    </div>
                    <div v-if="item.company === this.userID" class="grid-item">{{ item.price }}</div>
                    <div v-if="item.company === this.userID" class="grid-item no-right-border">
                        <button class="actionButton redBackground" @click="archiveItem(item.id)"> Archive</button>
                        <button v-if="item.active === true" class="addLeftMargin actionButton greenBackground"
                                @click="changeItemActiveness(item.id, item.active)">
                            <span> {{ content.buttons.public }} </span>
                        </button>
                        <button v-if="item.active === false" class="addLeftMargin actionButton redBackground"
                                @click="changeItemActiveness(item.id, item.active)">
                            <span> {{ content.buttons.private }} </span>
                        </button>
                    </div>
                </div>
            </div>
            <div v-else class="archive">
                <div class="grid-header">
                    <div class="grid-item">{{ content.list.name }}</div>
                    <div class="grid-item">{{ content.list.colors }}</div>
                    <div class="grid-item">{{ content.list.rooms }}</div>
                    <div class="grid-item">{{ content.list.styles }}</div>
                    <div class="grid-item">{{ content.list.price }}</div>
                    <div class="grid-item no-right-border">{{ content.list.actions }}</div>
                </div>
                <div v-for="(item) in this.archiveList" class="flex">
                    <div v-if="item.company === this.userID" class="grid-item font-bold">{{ item.name }}</div>
                    <div v-if="item.company === this.userID" class="grid-item">
                        <span v-for="(col, index) in item.colors" :key="index">
                            {{ col.color }}
                            <span v-if="index < item.colors.length - 1">, </span>
                        </span>
                    </div>
                    <div v-if="item.company === this.userID" class="grid-item">
                        <span v-for="(room, index) in item.rooms" :key="index">
                            {{ room }}
                            <span v-if="index < item.rooms.length - 1">, </span>
                        </span>
                    </div>
                    <div v-if="item.company === this.userID" class="grid-item">
                        <span v-for="(style, index) in item.styles" :key="index">
                            {{ style }}
                            <span v-if="index < item.styles.length - 1">, </span>
                        </span>
                    </div>
                    <div v-if="item.company === this.userID" class="grid-item">{{ item.price }}</div>
                    <div v-if="item.company === this.userID" class="grid-item no-right-border">
                        <button class="actionButton greenBackground" @click="restoreItem(item.id)"> Restorer</button>
                        <button class="actionButton redBackground" @click="deleteArchivedItem(item.id)"> Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Notifications ref="notifications" />
</template>

<script>
import { isLogged, loggedIn } from "public/ts/checkLogin";
import Notifications from "@/components/Notifications.vue";

export default {
    name: "UserCatalogAndArchive",
    components: {
        Notifications
    },
    data() {
        return {
            cards: [
                { name: this.$content.catalog.title },
                { name: this.$content.catalog.archiveTitle }
            ],
            content: this.$content.catalog,
            userID: 0,
            selectedCard: 0,
            catalogList: [],
            archiveList: []
        };
    },
    mounted() {
        this.checkIfLogged();
    },
    methods: {
        async checkIfLogged() {
            const userID_TMP = await isLogged();
            if (!loggedIn) {
                location.href = this.$langPrefix + "login";
            }
            this.userID = Number(userID_TMP);

            const COMPANY_API_TOKEN = localStorage.getItem("COMPANY_API_TOKEN");
            if (!COMPANY_API_TOKEN) {
                this.$refs.notifications.showError("Vous devez réinitialiser votre clé API");
            } else {
                await this.getArchive();
                await this.getCatalog();
            }
        },

        async getCatalog() {
            const COMPANY_API_TOKEN = localStorage.getItem("COMPANY_API_TOKEN");
            const response = await fetch(`https://api.ardeco.app/catalog/company/${this.userID}?company_api_key=${COMPANY_API_TOKEN}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();
            if (result.code === 200 && result.data.length === 0) {
                this.catalogList = result.data;
                this.$refs.notifications.showSuccess("Votre catalogue est vide");
            } else {
                this.catalogList = result.data;
            }
            console.log(this.catalogList);
        },

        async getArchive() {
            const COMPANY_API_TOKEN = localStorage.getItem("COMPANY_API_TOKEN");
            const response = await fetch(`https://api.ardeco.app/archive/${this.userID}?company_api_key=${COMPANY_API_TOKEN}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();
            console.log(result);
            if (result.code === 200 && result.data.length === 0) {
                this.archiveList = result.data;
                this.$refs.notifications.showSuccess("Votre archive est vide");
            } else if (result.code === 200) {
                this.archiveList = result.data;
            }
        },

        async archiveItem(itemInputID) {
            const COMPANY_API_TOKEN = localStorage.getItem("COMPANY_API_TOKEN");
            const response = await fetch("https://api.ardeco.app/catalog/" + `${this.userID}` + "/remove/" + `${itemInputID}` + "?company_api_key=" + `${COMPANY_API_TOKEN}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();
            console.log(result);
            if (result.code === 200) {
                this.$refs.notifications.showSuccess(result.description);
            } else {
                this.$refs.notifications.showError(result.description);
            }
            await this.getArchive();
            await this.getCatalog();
        },

        async deleteArchivedItem(itemInputID) {
            const COMPANY_API_TOKEN = localStorage.getItem("COMPANY_API_TOKEN");
            const response = await fetch("https://api.ardeco.app/archive/" + `${this.userID}` + "/" + `${itemInputID}` + "?company_api_key=" + `${COMPANY_API_TOKEN}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();
            console.log(result);
            if (result.code === 200) {
                this.$refs.notifications.showSuccess(result.description);
            } else {
                this.$refs.notifications.showError(result.description);
            }
            await this.getArchive();
            await this.getCatalog();
        },

        async restoreItem(itemInputID) {
            const COMPANY_API_TOKEN = localStorage.getItem("COMPANY_API_TOKEN");
            const response = await fetch("https://api.ardeco.app/archive/restore/" + `${this.userID}` + "/" + `${itemInputID}` + "?company_api_key=" + `${COMPANY_API_TOKEN}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();
            console.log(result);
            if (result.code === 200) {
                this.$refs.notifications.showSuccess(result.description);
            } else {
                this.$refs.notifications.showError(result.description);
            }
            await this.getArchive();
            await this.getCatalog();
        },

        async getApiToken() {
            const response = await fetch("https://api.ardeco.app/company/requestToken", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();
            console.log(result);
            if (result.code === 200) {
                this.$refs.notifications.showSuccess(result.description);
            } else {
                this.$refs.notifications.showError(result.description);
            }
            localStorage.setItem("COMPANY_API_TOKEN", result.data);
            await this.getArchive();
            await this.getCatalog();
        },

        async goToFurnitureCreation() {
            window.location.href = this.$langPrefix + "furniture-creation";
        },

        async changeItemActiveness(CATALOG_ID, bool) {
            const COMPANY_API_TOKEN = localStorage.getItem("COMPANY_API_TOKEN");
            console.log("https://api.ardeco.app/catalog/" + `${this.userID}` + "/edit/" + `${CATALOG_ID}`);
            const response = await fetch("https://api.ardeco.app/catalog/" + `${this.userID}` + "/edit/" + `${CATALOG_ID}` + "?company_api_key=" + `${COMPANY_API_TOKEN}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "active": !bool
                }),
                credentials: "include"
            });

            const result = await response.json();
            console.log(result);
            if (result.code === 200) {
                this.$refs.notifications.showSuccess(result.description);
                location.reload();
            } else {
                this.$refs.notifications.showError(result.description);
            }
        },

        async deleteArchive() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const COMPANY_API_TOKEN = localStorage.getItem("COMPANY_API_TOKEN");
            const response = await fetch("https://api.ardeco.app/archive/" + `${userID}` + "?company_api_key=" + `${COMPANY_API_TOKEN}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();
            console.log(result);
            if (result.code === 200) {
                this.$refs.notifications.showSuccess(result.description);
            } else {
                this.$refs.notifications.showError(result.description);
            }
            await this.getArchive();
            await this.getCatalog();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/ProfileSettings.scss";
@import '@/styles/variables/ColorVariables.scss';

.listSelection {
    margin-top: 5vh;
    margin-bottom: 2.5vh;
    height: 5vh;
}

.showListButton {
    border: 1px outset $primary-black;
    border-radius: 5px;
    min-width: 35%;
    height: 100%;
    text-align: center;
    transition: 0.3s;
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
    margin-left: 5%;
    margin-top: 10%;
    min-height: 7.5%;
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
    width: 65.5vw;
    max-height: 100%;
    overflow: auto;
}

.catalog, .archive {
    text-align: center;
    border: 2px solid $primary-black;
    border-radius: 5px;
    width: 65vw;
    background-color: $secondary-white;
}

.grid-header {
    display: flex;
    font-weight: bold;
    background-color: $primary-black;
    color: $primary-white;
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

.actionButton {
    color: $secondary-white;
    padding: 5px;
    border: 1px solid $primary-black;
    border-radius: 5px;
}

.addLeftMargin {
    margin-left: 5%;
}

.redBackground {
    background-color: $primary-red;
}

.greenBackground {
    background-color: green;
    margin-right: 5%;
}
</style>
