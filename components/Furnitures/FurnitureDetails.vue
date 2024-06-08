<template>
    <div class="navbar-top-space"></div>
    <div class="title"> {{ catalogElement.name }}</div>
    <div class="furnitureElements">
        <img src="~/.././assets/images/furnitures/furnitureDefault.png" class="furniturePicture solidBorders roundedBorders">
        <div class="sideActions">
            <div class="furnitureDetails solidBorders roundedBorders">
                <div class="furnitureRooms"> {{ catalogElement.rooms }}</div>
                <div class="furnitureStyles"> {{ catalogElement.styles }}</div>
                <div class="furnitureDimentions"> Dimensions (cm): {{ catalogElement.width }} / {{ catalogElement.height }} / {{ catalogElement.depth }}</div>
                <div class="furniturePrice">{{ catalogElement.price }}€</div>
                <button class="addToCart solidBorders primaryButton"> Ajouter au panier </button>
            </div>
            <div class="furnitureActions">
                <button class="addFavoriteButton solidBorders roundedBorders secondaryButton"> Ajouter aux favoris </button>
                <div class="availableOrNot solidBorders roundedBorders statusElement"> Disponible </div>
            </div>
        </div>
    </div>
    <div class="adminActions">
        <button class="solidBorders roundedBorders primaryButton adminButton" @click="goToCatalog"> Retour </button>
        <button class="solidBorders roundedBorders secondaryButton adminButton"> Archiver </button>
        <button class="solidBorders roundedBorders secondaryButton adminButton"> Masquer </button>
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
            catalogElement: {}
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
        console.log(this.$route.params.id);

        // this.content = lang === 'en' ? en.furnitures.users : fr.furnitures.users;
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
                        this.catalogElement = item;
                        break;
                    }
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
}

.secondaryButton {
    background-color: $primary-light-blue;
}

.statusElement {
    background-color: $primary-green;
}

.adminButton {
    margin-left: 10%;
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
    border: 1px solid green;
}

.furnitureElements {
    margin-top: 1%;
    margin-left: 20%;
    display: flex;
    border: 1px solid black;
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
    border: 1px solid purple;
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
    border: 1px solid blue;
    height: 30%;
}

.addFavoriteButton {
    margin-left: 10%;
    height: 5vh;
    width: 80%;
}

.availableOrNot {
    text-align: center;
    padding-top: 1vh;
    margin-top: 10%;
    margin-left: 10%;
    height: 30%;
    width: 80%;
    // background-color: #E84545;
}

.adminActions {
    margin-left: 21%;
    border: 1px solid orange;
    width: 30vw;
    height: 5vh;
}

</style>
