<template>
    <div class="navbar-top-space"></div>
    <div class="title"> {{ catalogElement.name }}</div>
    <div class="furnitureElements">
        <img src="~/.././assets/images/furnitures/furnitureDefault.png" class="furniturePicture solidBorders roundedBorders">
        <div class="sideActions">
            <div class="furnitureDetails solidBorders roundedBorders">
                <div class="furnitureRooms"> {{ catalogElement.rooms }}</div>
                <div class="furnitureStyles"> {{ catalogElement.styles }}</div>
                <div class="furnitureDimentions">{{ content.dimensions }} {{ catalogElement.width }} / {{ catalogElement.height }} / {{ catalogElement.depth }}</div>
                <div class="furniturePrice">{{ catalogElement.price }}€</div>
                <button class="addToCart solidBorders primaryButton"> {{ content.addToCart }} </button>
            </div>
            <div class="furnitureActions">
                <button class="addFavoriteButton solidBorders roundedBorders secondaryButton"> {{ content.addToFavorites }} </button>
                <div class="availableOrNot solidBorders roundedBorders statusElement"> {{ content.available }} </div>
                <div id="errorText" class="textReportJustification errorHandler" hidden></div>
                <div id="successText" class="textReportJustification successHandler"></div>
            </div>
        </div>
    </div>
    <div class="adminActions">
        <button class="solidBorders roundedBorders primaryButton adminButton goBack" @click="goToCatalog"> {{ content.goBack }} </button>
        <button class="solidBorders roundedBorders secondaryButton adminButton companyAction companyAction adminAction"> {{ content.hide }} </button> <!-- Est plutôt une "adminAction", mais pour l'instant je le met en "companyAction" -->
        <button id="archiveButton" class="solidBorders roundedBorders secondaryButton adminButton companyAction" @click="archiveElement"> {{ content.archive }} </button>
        <button id="restoreButton" class="solidBorders roundedBorders secondaryButton adminButton companyAction" @click="restoreElement" hidden> {{ content.restore }} </button>
        <button id="deleteButton" class="solidBorders roundedBorders secondaryButton adminButton deleteButton companyAction" @click="deleteElement" hidden> {{ content.delete }} </button>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import { isLogged, loggedIn } from "public/ts/checkLogin";

export default {
    name: "FurnitureDetails",
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: {},
            langPrefix: "/",
            catalogElement: {},
            elementIsNotArchived: false,
            profileID: null
        }
    },
    mounted() {
        const body = document.body
        body.style.backgroundColor = "#F4F4F4";
        let lang = this.urlLang

        if (lang !== 'en' && lang !== 'fr') {
            if (localStorage.getItem('lang')) {
                lang = localStorage.getItem('lang');
            } else {
                lang = 'fr';
            }
        }
    
        this.getCatalogAndCompanyName();
        this.content = lang === 'en' ? en.catalog : fr.catalog;
    },
    methods: {
        async getCatalogAndCompanyName() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = langPrefix.value + "login";
            }

            try {
                // Data du profil
                const response_profile = await fetch(`https://api.ardeco.app/user/${userID}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response_profile.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data_profile = await response_profile.json();
                if (data_profile.data.role = "company") {
                    this.profileID = data_profile.data.id
                }
                console.log(data_profile)
            } catch (error) {
                console.error(error.message);
                errorMessage.value = error.message;
            }

            try {
                // Data du catalog
                const response = await fetch('https://api.ardeco.app/catalog', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                for (let item of result.data) {
                    if (item.id == this.$route.params.id) {
                        this.catalogElement = item
                        this.elementIsNotArchived = true;
                        break;
                    }
                }

                if (this.elementIsNotArchived == false) {
                    this.lookIntoArchive();
                }

                const companyActions = document.getElementsByClassName('companyAction');

                console.log('this.profileID', this.profileID)
                console.log('this.catalogElement.company', this.catalogElement.company)
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
            this.$router.push('/catalog');
        },

        async lookIntoArchive() {
            let elementFound = false;
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
            for (let item of result.data) {
                if (item.id == this.$route.params.id) {
                    this.catalogElement = item;
                    elementFound = true;
                    break;
                }
            }

            const errorDiv = document.getElementById('errorText');
            const successDiv = document.getElementById('successText');
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
                document.getElementById('deleteButton').hidden = false;
                document.getElementById('archiveButton').hidden = true;
                document.getElementById('restoreButton').hidden = false;
            }
        },

        async switchButtonDeleteVisibility() {
            if (this.elementIsNotArchived == false) {
                document.getElementById('deleteButton').hidden = true;
                document.getElementById('archiveButton').hidden = false;
                document.getElementById('restoreButton').hidden = true;
                this.elementIsNotArchived = true;
            } else {
                document.getElementById('deleteButton').hidden = false;
                document.getElementById('archiveButton').hidden = true;
                document.getElementById('restoreButton').hidden = false;
                this.elementIsNotArchived = false;
            }
        },

        async archiveElement() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const response = await fetch('https://api.ardeco.app/catalog/' + `${userID}` + '/remove/' + `${this.catalogElement.object_id}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);

            const errorDiv = document.getElementById('errorText');
            const successDiv = document.getElementById('successText');
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
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const response = await fetch('https://api.ardeco.app/archive/restore/' + `${userID}` + '/' + `${this.catalogElement.object_id}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);

            const errorDiv = document.getElementById('errorText');
            const successDiv = document.getElementById('successText');
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
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const response = await fetch('https://api.ardeco.app/archive/' + `${userID}` + '/' + `${this.catalogElement.object_id}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);

            const errorDiv = document.getElementById('errorText');
            const successDiv = document.getElementById('successText');
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
        }
    }
}
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
    height: 10vh;
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
