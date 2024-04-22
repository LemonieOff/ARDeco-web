<template>
    <div class="navbar-top-space"></div>
    <div class="titleElements alignCenter">
        <div class="title">{{ content.title }}</div>
        <br>
        <div class="subTitle">{{ content.somethingWrong }}</div>
        <div class="subTitle">{{ content.askUs }}</div>
    </div>
    <div class="pageContent">
        <div class="pendingTickets">
            <div class="alignCenter">{{ content.pendingTickets }}</div>
        </div>
        <div class="manageTicket">
            <input type="text" class="textContent" :placeholder="content.writeYourProblemHere">
            <button class="alignCenter ticketManagementButton">{{ content.createTicket }}</button>
            <!-- <button class="alignCenter">{{ content.updateTicket }}</button> -->
        </div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import { isLogged, loggedIn } from "public/js/checkLogin";

export default {
    name: "TicketPage",
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: {},
            placeholders: {},
            langPrefix: "/"
        }
    },
    mounted() {
        this.checkIfLogged();
        let lang = this.urlLang

        if (lang !== 'en' && lang !== 'fr') {
            if (localStorage.getItem('lang')) {
                lang = localStorage.getItem('lang');
            } else {
                lang = 'fr';
            }
        }

        this.content = lang === 'en' ? en.tickets : fr.tickets;
    },
    methods: {
        async checkIfLogged() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
        }
    }
}
</script>

<style lang="scss" scoped>

::placeholder {
    text-align: center;
}

.alignCenter {
    text-align: center;
}

.navbar-top-space {
    height: 10vh;
}

.titleElements {
    font-weight: bold;
    margin-bottom: 5%;
}

.title {
    font-size: xx-large;
}

.subTitle {
    font-size: large;
    color: gray;
}

.pageContent {
    display: inline-flex;
    width:100dvw;
    height: 55dvh;
}

.pendingTickets {
    background-color: #F5F5F5;
    padding: 1%;
    border: 1px solid;
    border-radius: 10px;
    width: 30%;
    height: 100%;
    margin-left: 7.5%;
}

.manageTicket {
    background-color: #F5F5F5;
    padding: 1%;
    border: 1px solid;
    border-radius: 10px;
    margin-left: 5%;
    width: 50%;
}

.textContent {
    background-color: #FFFFFF;
    margin: 2.5%;
    width: 95%;
    height: 80%;
    border-radius: 5px;
    border: 1px solid;
}

.ticketManagementButton {
    background-color: #F2EBDF;
    border: 1px solid;
    border-radius: 5px;
    padding: 1%;
    margin-left: 30%;
    width: 40%;
}

</style>
