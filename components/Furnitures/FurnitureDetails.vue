<template>
    <div class="navbar-top-space"></div>
    <div class="title"> {{ catalogElement.name }}</div>
    <div class="furnitureElements">
        <img src="~/.././assets/images/furnitures/furnitureDefault.png" class="furniturePicture">
        <div class="sideActions">
            <div class="furnitureDetails">
                <div class="furnitureRooms"> {{ catalogElement.rooms }}</div>
                <div class="furnitureStyles"> {{ catalogElement.styles }}</div>
                <div class="furnitureDimentions">{{ catalogElement.width }} cm / {{ catalogElement.height }} cm / {{ catalogElement.depth }} cm</div>
                <div class="furniturePrice">{{ catalogElement.price }}€</div>
                <button class="addToCart"> Ajouter au panier </button>
            </div>
            <div class="furnitureActions">
                <button class="addFavoriteButton"> Ajouter aux favoris </button>
                <div class="availableOrNot"> Disponible </div>
            </div>
        </div>
    </div>
    <div class="adminActions">
        <button class="archiveFurnitureButton"> Archiver </button>
        <button class="hideFurnitureButton"> Masquer </button>
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
                this.catalogElement = result.data[0];
                console.log(this.catalogElement);
            } catch (error) {
                console.error(error.message);
                errorMessage.value = error.message;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

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
    border: 3px solid #333333;
    width: 30vw;
    height: 30vw;
    border-radius: 10px;
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
    background-color: #E9E9E9;
    border: 3px solid #333333;
    border-radius: 10px;
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
    border: 3px solid #333333;
    background-color: #769FCD;
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
    border: 3px solid #333333;
    border-radius: 10px;
    background-color: #769FCD;
}

.availableOrNot {
    text-align: center;
    padding-top: 1vh;
    margin-top: 10%;
    margin-left: 10%;
    height: 30%;
    width: 80%;
    border: 3px solid #333333;
    border-radius: 10px;
    background-color: #609966;
    // background-color: #E84545;
}

.adminActions {
    margin-left: 21%;
    border: 1px solid orange;
    width: 30vw;
    height: 5vh;

}

.archiveFurnitureButton {
    border: 3px solid #333333;
    border-radius: 10px;
    background-color: #769FCD;
    width: 45%;
    height: 100%;
}

.hideFurnitureButton {
    margin-left: 10%;
    border: 3px solid #333333;
    border-radius: 10px;
    background-color: #769FCD;
    width: 45%;
    height: 100%;
}

</style>
