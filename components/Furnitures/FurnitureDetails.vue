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
            </div>
        </div>
    </div>
    <div class="adminActions">
        <button class="solidBorders roundedBorders primaryButton adminButton goBack" @click="goToCatalog"> {{ content.goBack }} </button>
        <button class="solidBorders roundedBorders secondaryButton adminButton"> {{ content.hide }} </button>
        <button id="archiveButton" class="solidBorders roundedBorders secondaryButton adminButton" @click="archiveElement"> {{ content.archive }} </button>
        <button id="restoreButton" class="solidBorders roundedBorders secondaryButton adminButton" @click="restoreElement" hidden> {{ content.restore }} </button>
        <button id="deleteButton" class="solidBorders roundedBorders secondaryButton adminButton deleteButton" @click="deleteElement" hidden> {{ content.delete }} </button>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import { isLogged, loggedIn } from "public/js/checkLogin";

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
            elementIsNotArchived: false
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
    
        this.getCatalog();
        this.content = lang === 'en' ? en.catalog : fr.catalog;
    },
    methods: {
        async getCatalog() {
            try {
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

                console.log(this.catalogElement);
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
            if (!elementFound) {
                console.error("No element with this ID has been found in the catalog or the archive.");
            } else {
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
            this.switchButtonDeleteVisibility();
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
            this.switchButtonDeleteVisibility();
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
            this.goToCatalog();
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/variables/ColorVariables.scss';

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
    height: 60%;

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

</style>
