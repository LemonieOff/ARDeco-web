<template>
    <div>
        <Navbar/>
        <div class="title"> Donnez nous votre avis ! </div>
        <div class="formCard">
            <div class="motivationalText textToHighlight"> Ça ne vous prend que deux minutes ! </div>
            <div class="chooseFeedbackType">
                <svg class="fontAwsomeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                </svg>
                <span class="question textToHighlight"> De quoi voulez-vous nous parler ? </span>
            </div>
            <div class="typesCards">
                <button v-for="(card, index) in cards" :key="index" :id="`card${index}`" class="typeCard" @click="changeSelection(index)" :class="{ active: index === selectedCard }" >
                    {{ card.name }}
                </button>
            </div>
            <div class="userInputTitle">
                <svg class="fontAwsomeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/>
                </svg>
                <span class="question textToHighlight"> Dites-nous tout ! </span>
            </div>
            <textarea id="textInput" class="userInput" placeholder="Je pense que..."></textarea>
            <div class="sendFormButton"> Envoyer </div>
        </div>
    </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
import { isLogged } from "public/js/checkLogin";

export default {
    name: "Feedback",
    components: {
        Navbar,
    },
    data() {
        return {
            cards: [
                { name: 'Feedback' },
                { name: 'Suggestion' },
                { name: 'Bug' }
            ],
            selectedCard: 0
        };
    },
    methods: {
        changeSelection(index) {
            this.selectedCard = index;
        },

        async sendForm() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const response = await fetch('https://api.ardeco.app/catalog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
        },
    }
};
</script>

<style scoped lang="scss">
@import '~/styles/variables/ColorVariables.scss';

.title {
    margin-top: 100px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
}

.textToHighlight {
    color: $primary-blue;
    font-weight: bold;
}

.formCard {
    background-color: $absolute-white;
    border: 2px outset $primary-black;
    height: 550px;
    width: 30%;
    margin-top: 50px;
    border-radius: 5px;
    margin-left: 35%;
}

.motivationalText {
    text-align: center;
    margin-top: 4%;
    font-size: 18px;
}

.chooseFeedbackType {
    display: flex;
    margin-left: 5%;
    margin-top: 5%;
}

.question {
    margin-left: 2%;
}

.typesCards {
    display: flex;
    margin-left: 5%;
    margin-top: 3%;
}

.typeCard {
    border: 1px outset $primary-black;
    padding: 5px;
    width: 25%;
    text-align: center;
    margin-right: 10%;
    border-radius: 5px;
    transition: 0.3s;
}

.typeCard:hover {
    background-color: $primary-black;
    color: $absolute-white;
}

.typeCard.active {
    background-color: $primary-blue;
    color: $absolute-white;
}

.fontAwsomeIcon {
    max-height: 20px;
    margin-top: 2px;
    fill: $primary-blue;
}

.userInputTitle {
    display: flex;
    margin-top: 5%;
    margin-left: 5%;
}

.userInput {
    margin-top: 3%;
    margin-left: 5%;
    width: 90%;
    height: 45%;
    border: 2px outset $primary-black;
    border-radius: 5px;
    padding: 2.5%;
}

.sendFormButton {
    border: 1px outset $primary-black;
    width: 20%;
    margin-left: 40%;
    background-color: $primary-black;
    color: $absolute-white;
    padding: 2%;
    text-align: center;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
    transition: 0.3s;
}

.sendFormButton:hover {
    background-color: $primary-white;
    color: $primary-black;
    cursor: pointer;
}

</style>
