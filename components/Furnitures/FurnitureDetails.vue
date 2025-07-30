<template>
    <Head>
        <Title>ARDeco - {{ content.title }} - {{ catalogElement.name }}</Title>
    </Head>
    <div class="navbar-top-space"></div>
    <div class="text-center text-3xl mb-9">{{ catalogElement.name }}</div>

    <div class="flex flex-col md:flex-row md:justify-between w-full md:px-10">
        <img class="w-full md:w-1/3 rounded-lg border-3 border-black mb-4 md:mb-0"
             src="~/.././assets/images/furnitures/furnitureDefault.png">

        <div class="flex flex-col justify-between w-full md:w-1/2 md:ml-4">
            <div class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige border-black p-4 rounded-lg h-80 flex flex-col">
                <div class="text-xl"><span class="font-bold">{{ content.roomType }} : </span>
                    {{ catalogElement.rooms ? catalogElement.rooms.map(room => values.rooms[room]).join(", ") : "" }}
                </div>
                <div class="text-xl mt-2"><span class="font-bold">{{ content.styles }} : </span>
                    {{ catalogElement.styles ? catalogElement.styles.map(style => values.styles[style]).join(", ") : "" }}
                </div>
                <div class="mt-4 text-lg">{{ content.dimensions }} {{ catalogElement.width }} / {{ catalogElement.height
                    }} / {{ catalogElement.depth }}
                </div>
                <div class="mt-2 text-2xl font-bold">{{ catalogElement.price }}€</div>
                <button
                    class="mt-4 bg-black text-white py-2 rounded hover:bg-white hover:text-black hover:border transition duration-200"
                    @click="addToCart">{{ content.addToCart }}
                </button>
            </div>

            <div class="mt-4 text-AR-Grey">
                <button id="addToFavorite"
                        class="bg-blue-300 rounded-lg py-2 px-4 w-full hover:bg-white transition duration-200"
                        @click="addToFavorite">{{ content.addToFavorites }}
                </button>
                <button id="removeFromFavorite"
                        class="bg-blue-300 rounded-lg py-2 px-4 w-full hover:bg-white transition duration-200"
                        hidden @click="removeFromFavorite">{{ content.removeFromFavorites }}
                </button>
                <div class="bg-green-300 text-center rounded-lg py-2 mt-2">{{ content.available }}</div>
                <div id="errorText" class="text-red-600 text-center mt-4 hidden"></div>
                <div id="successText" class="text-green-600 text-center mt-4"></div>
            </div>
        </div>
    </div>

    <div class="flex flex-wrap justify-center mt-4 md:px-10">
        <button
            class="bg-black text-white rounded-lg py-2 px-4 mr-2 mb-2 hover:bg-white hover:text-black transition duration-200"
            @click="goToCatalog">{{ content.goBack }}
        </button>
        <!--      <button class="bg-blue-300 rounded-lg py-2 px-4 mr-2 mb-2 hover:bg-white transition duration-200 companyAction adminAction" @click="archiveElement">{{ content.hide }}</button>-->
        <button id="archiveButton"
                class="bg-blue-300 text-AR-Grey rounded-lg py-2 px-4 mr-2 mb-2 hover:bg-white transition duration-200 companyAction"
                @click="archiveElement">{{ content.archive }}
        </button>
        <button id="restoreButton"
                class="bg-blue-300 text-AR-Grey rounded-lg py-2 px-4 mr-2 mb-2 hover:bg-white transition duration-200 companyAction"
                hidden @click="restoreElement">{{ content.restore }}
        </button>
        <button id="deleteButton"
                class="bg-red-600 text-white rounded-lg py-2 px-4 mr-2 mb-2 hover:bg-white hover:text-red-600 transition duration-200 deleteButton companyAction"
                hidden @click="deleteElement">{{ content.delete }}
        </button>
    </div>

    <Notifications ref="notifications" />
</template>

<script>
import { isLogged, userID } from "public/ts/checkLogin";
import Notifications from "@/components/Notifications.vue";

export default {
    name: "FurnitureDetails",
    components: {
        Notifications
    },
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: this.$content.catalog,
            values: this.$content.values,
            notificationMessages: this.$content.notifications,
            langPrefix: this.$langPrefix,
            catalogElement: {},
            elementIsNotArchived: false,
            profileID: null,
            backendHost: this.$config.public.backendHost,
        };
    },
    mounted() {
        this.getCatalogAndCompanyName().then(() => {
            this.isElementInFavorites();
        });
    },
    methods: {
        async checkLogin() {
            console.log("test");
            let userId;
            if (!userID) {
                let userID_tmp = await isLogged();
                if (!userID_tmp) {
                    location.href = `${this.langPrefix}login?redirect=${this.langPrefix}catalog/${this.$route.params.id}`;
                    return;
                }
                userId = userID_tmp;
            } else {
                userId = userID;
            }
            return userId;
        },

        async getCatalogAndCompanyName() {
            const userID = await this.checkLogin();

            try {
                // Data du profil
                const response_profile = await fetch(`${this.backendHost}/user/${userID}`, {
                    method: "GET",
                    credentials: "include"
                });

                if (!response_profile.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data_profile = await response_profile.json();
                if (data_profile.data.role === "company") {
                    this.profileID = data_profile.data.id;
                }
            } catch (error) {
                console.error(error.message);
                errorMessage.value = error.message;
            }

            try {
                // Data du catalog
                const response = await fetch(`${this.backendHost}/catalog`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await response.json();
                for (let item of result.data) {
                    if (item.id == this.$route.params.id) {
                        this.catalogElement = item;
                        this.elementIsNotArchived = true;
                        break;
                    }
                }

                console.log("this.catalogElement", this.catalogElement);

                if (this.elementIsNotArchived == false) {
                    this.lookIntoArchive();
                }

                const companyActions = document.getElementsByClassName("companyAction");

                if (this.profileID != this.catalogElement.company) {
                    for (const action of companyActions) {
                        action.hidden = true;
                    }
                }
            } catch (error) {
                console.error(error.message);
                errorMessage.value = error.message;
            }
        },

        async goToCatalog() {
            this.$router.push("/catalog");
        },

        async lookIntoArchive() {
            let elementFound = false;
            const userID = await this.checkLogin();

            const COMPANY_API_TOKEN = localStorage.getItem("COMPANY_API_TOKEN");
            const response = await fetch(`${this.backendHost}/archive/` + `${userID}` + "?company_api_key=" + `${COMPANY_API_TOKEN}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();
            for (let item of result.data) {
                if (item.id == this.$route.params.id) {
                    this.catalogElement = item;
                    elementFound = true;
                    break;
                }
            }

            const errorDiv = document.getElementById("errorText");
            const successDiv = document.getElementById("successText");
            if (!elementFound) {
                console.error("No element with this ID has been found in the catalog or the archive.");
                successDiv.hidden = true;
                errorDiv.hidden = false;
                errorDiv.innerText = "No element with this ID has been found in the catalog or the archive.";
            } else {
                successDiv.hidden = false;
                errorDiv.hidden = true;
                successDiv.innerText = "Element found.";
                this.showDeleteOption();
            }
        },

        async showDeleteOption() {
            if (this.elementIsNotArchived == false) {
                document.getElementById("deleteButton").hidden = false;
                document.getElementById("archiveButton").hidden = true;
                document.getElementById("restoreButton").hidden = false;
            }
        },

        async switchButtonDeleteVisibility() {
            if (this.elementIsNotArchived == false) {
                document.getElementById("deleteButton").hidden = true;
                document.getElementById("archiveButton").hidden = false;
                document.getElementById("restoreButton").hidden = true;
                this.elementIsNotArchived = true;
            } else {
                document.getElementById("deleteButton").hidden = false;
                document.getElementById("archiveButton").hidden = true;
                document.getElementById("restoreButton").hidden = false;
                this.elementIsNotArchived = false;
            }
        },

        async archiveElement() {
            const userID = await this.checkLogin();

            const COMPANY_API_TOKEN = localStorage.getItem("COMPANY_API_TOKEN");
            const response = await fetch(`${this.backendHost}/catalog/` + `${userID}` + "/remove/" + `${this.catalogElement.id}` + "?company_api_key=" + `${COMPANY_API_TOKEN}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();

            const errorDiv = document.getElementById("errorText");
            const successDiv = document.getElementById("successText");
            if (!response.ok) {
                successDiv.hidden = true;
                errorDiv.hidden = false;
                errorDiv.innerText = result.description;
            } else {
                successDiv.hidden = false;
                errorDiv.hidden = true;
                successDiv.innerText = result.description;
                this.switchButtonDeleteVisibility();
            }
        },

        async restoreElement() {
            const userID = await this.checkLogin();

            const COMPANY_API_TOKEN = localStorage.getItem("COMPANY_API_TOKEN");
            const response = await fetch(`${this.backendHost}/archive/restore/` + `${userID}` + "/" + `${this.catalogElement.id}` + "?company_api_key=" + `${COMPANY_API_TOKEN}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();

            const errorDiv = document.getElementById("errorText");
            const successDiv = document.getElementById("successText");
            if (!response.ok) {
                successDiv.hidden = true;
                errorDiv.hidden = false;
                errorDiv.innerText = result.description;
            } else {
                successDiv.hidden = false;
                errorDiv.hidden = true;
                successDiv.innerText = result.description;
                this.switchButtonDeleteVisibility();
            }
        },

        async deleteElement() {
            const userID = await this.checkLogin();

            const COMPANY_API_TOKEN = localStorage.getItem("COMPANY_API_TOKEN");
            const response = await fetch(`${this.backendHost}/archive/` + `${userID}` + "/" + `${this.catalogElement.id}` + "?company_api_key=" + `${COMPANY_API_TOKEN}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();

            const errorDiv = document.getElementById("errorText");
            const successDiv = document.getElementById("successText");
            if (!response.ok) {
                successDiv.hidden = true;
                errorDiv.hidden = false;
                errorDiv.innerText = result.description;
            } else {
                successDiv.hidden = false;
                errorDiv.hidden = true;
                successDiv.innerText = result.description;
                this.goToCatalog();
            }
        },

        async addToFavorite() {
            await this.checkLogin();

            const response = await fetch(`${this.backendHost}/favorite/furniture/` + `${this.catalogElement.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();

            if (result.code === 201) {
                document.getElementById("addToFavorite").hidden = true;
                document.getElementById("removeFromFavorite").hidden = false;
            } else {
                this.refs.notifications.showError(this.notificationMessages.couldntAddFavorite);
            }
        },

        async removeFromFavorite() {
            await this.checkLogin();

            const response = await fetch(`${this.backendHost}/favorite/furniture/` + `${this.catalogElement.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();

            if (result.code === 200) {
                document.getElementById("addToFavorite").hidden = false;
                document.getElementById("removeFromFavorite").hidden = true;
            } else {
                this.$refs.notifications.showError(this.notificationMessages.couldntRemoveFavorite);
            }
        },

        async isElementInFavorites() {
            await this.checkLogin();

            const response = await fetch(`${this.backendHost}/favorite/furniture/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();

            if (result.code === 200) {
                for (let item of result.data) {
                    if (item.favorite_furniture.furniture_id == this.catalogElement.id) {
                        document.getElementById("addToFavorite").hidden = true;
                        document.getElementById("removeFromFavorite").hidden = false;
                    }
                }
            } else if (result.code != 404) {
                this.$refs.notifications.showError(this.notificationMessages.infoNotReceived);
            }
        },

        async addToCart() {
            await this.checkLogin();

            const FURNITURE_ID = Number(this.$route.params.id);
            const MODEL_ID = Number(this.catalogElement.colors[0].model_id);
            const response = await fetch(`${this.backendHost}/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([{
                    "furniture_id": FURNITURE_ID,
                    "model_id": MODEL_ID
                }]),
                credentials: "include"
            });

            console.log(FURNITURE_ID, MODEL_ID);
            const result = await response.json();
            console.log(result);

            if (result.code === 201) {
                this.$refs.notifications.showSuccess(this.notificationMessages.itemAddedToCart);
            } else if (result.code != 404) {
                this.$refs.notifications.showError(this.notificationMessages.couldntAddToCart);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables/ColorVariables.scss';

.solidBorders {
    border: 3px solid $primary-black;
}

.roundedBorders {
    border-radius: 10px;
}

.primaryButton {
    background-color: $primary-black;
    color: $primary-white;
    transition: 0.25s;
}

.primaryButton:hover {
    background-color: $primary-white;
    color: $primary-black;
}

.secondaryButton {
    background-color: $primary-light-blue;
    transition: 0.25s;
}

.secondaryButton:hover {
    background-color: $primary-white;
    color: $secondary-blue;
    border-color: $secondary-blue;
}

.deleteButton {
    background-color: #860000;
    transition: 0.25s;
}

.deleteButton:hover {
    background-color: $primary-white;
    color: #860000;
    border-color: #860000;
}

.statusElement {
    background-color: $primary-green;
    transition: 0.25s;
}

.statusElement:hover {
    background-color: $primary-white;
    color: $primary-green;
    border-color: $primary-green;
}

.adminButton {
    margin-left: 5%;
    width: 20%;
    height: 100%;
}

.navbar-top-space {
    height: 5vh;
}

.textReportJustification {
    margin-top: 20%;
    text-align: justify;
    font-size: 12px;
    font-style: italic;
}

.errorHandler {
    font-style: normal;
    font-weight: bold;
    color: $primary-red;
    text-align: center;
}

.successHandler {
    font-style: normal;
    font-weight: bold;
    color: $primary-green;
    text-align: center;
}

.title {
    margin: auto;
    text-align: center;
    font-size: 200%;
}

.furnitureElements {
    margin-top: 1%;
    margin-left: 20%;
    display: flex;
    width: 60%;
    padding: 1%;
}

.furniturePicture {
    width: 30vw;
    height: 30vw;
}

.sideActions {
    margin-left: 15%;
    display: block;
    width: 30%;
    height: 30vw;
}

.furnitureDetails {
    padding: 10%;
    background-color: $secondary-white;
    height: 35vh;

}

.furnitureRooms {
    font-size: 125%;
}

.furnitureStyles {
    font-size: 125%;
    margin-top: 5%;
}

.furnitureDimentions {
    font-size: 100%;
    margin-top: 25%;
}

.furniturePrice {
    font-size: 150%;
    margin-top: 5%;
    font-weight: bold;
}

.addToCart {
    margin-top: 5%;
    text-align: center;
    width: 100%;
    height: 5vh;
}

.furnitureActions {
    margin-top: 15%;
    height: 30%;
}

.addFavoriteButton {
    margin-left: 10%;
    height: 30%;
    width: 80%;
}

.availableOrNot {
    text-align: center;
    padding-top: 1vh;
    margin-top: 10%;
    margin-left: 10%;
    height: 30%;
    width: 80%;
}

.adminActions {
    margin-left: 21%;
    width: 30vw;
    height: 5vh;
}

.goBack {
    margin-left: 2.5%;
}

.deleteButton {
    background-color: $primary-red;
    transition: 0.25s;
}

.deleteButton:hover {
    color: $primary-red;
    background-color: $primary-white;
    border-color: $primary-red;
}

@media screen and (max-width: 768px) {

    .solidBorders {
        border: 1px solid $primary-black;
    }

    .roundedBorders {
        border-radius: 5px;
    }

    .adminButton {
        font-size: 12px;
        margin-left: 5%;
        width: 100px;
        padding: 5px;
    }

    .textReportJustification {
        margin-left: 0%;
        margin-top: 5%;
        text-align: center;
        font-size: 12px;
        font-style: italic;
    }

    .title {
        margin: auto;
        text-align: center;
        font-size: 200%;
    }

    .furnitureElements {
        margin-top: 1%;
        margin-left: 5%;
        width: 90%;
        height: 100%;
        padding: 1%;
    }

    .furniturePicture {
        width: 60%;
        height: 100%;
    }

    .sideActions {
        margin-left: 5%;
        width: 100%;
        height: 100%;
    }

    .furnitureDetails {
        padding: 10%;
        height: 200px;
    }

    .furnitureRooms {
        font-size: 16px;
    }

    .furnitureStyles {
        font-size: 14px;
        margin-top: 5%;
    }

    .furnitureDimentions {
        font-size: 10px;
    }

    .furniturePrice {
        font-size: 16px;
    }

    .addToCart {
        font-size: 12px;
        height: auto;
    }

    .furnitureActions {
        margin-top: 15%;
        height: 30%;
    }

    .addFavoriteButton {
        font-size: 10px;
        padding: 2%;
    }

    .availableOrNot {
        font-size: 12px;
        padding-top: 0;
    }

    .adminActions {
        display: flex;
        margin-left: 5%;
        width: 90%;
        height: auto;
        margin-top: 5px;
    }

    .goBack {
        margin-left: 0;
    }

}

</style>
