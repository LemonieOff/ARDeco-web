<template>
    <div class="navbar-top-space"></div>
    <div class="titleElements alignCenter">
        <div class="title">{{ content.title }}</div>
        <br>
        <div class="subTitle">{{ content.somethingWrong }}</div>
        <div class="subTitle">{{ content.askUs }}</div>
    </div>
    <div class="pageContent">
        <div id="pendingTickets" class="pendingTickets">
            <div class="alignCenter">{{ content.pendingTickets }}</div>
            <div class="alignCenter pendingTicket">
                <div class="ticketStatus">STATUS</div>
                <div class="ticketTitle">TITRE</div>
            </div>
        </div>
        <div class="manageTicket">
            <input id="title" type="text" class="titleOrDescripion" :placeholder="content.writeYourTitleHere">
            <input id="description" type="text" class="titleOrDescripion" :placeholder="content.shortDescriptionOfYourProblem">
            <input id="message" type="text" class="textContent" :placeholder="content.writeYourProblemHere">
            <button class="alignCenter ticketManagementButton" @click="createTicket">{{ content.createTicket }}</button>
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
        this.getUserTickets();
    },
    methods: {
        async checkIfLogged() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
        },
        async createTicket() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const message = document.getElementById("message").value;
            const response = await fetch('https://api.ardeco.app/ticket/create?mode=id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "title": title,
                    "description": description,
                    "message": message
                }),
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);

            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            document.getElementById("message").value = "";
        },
        async getUserTickets() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }

            const response = await fetch('https://api.ardeco.app/ticket/user/' + `${userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log("result", result);

            if (result.code == 200) {
                const ticketsContainer = document.getElementById('pendingTickets');
                result.data.forEach(ticket => {
                    const ticketDiv = document.createElement('div');
                    // ticketDiv.classList.add('alignCenter', 'pendingTicket');
                    ticketDiv.style = "padding-top: 2.5%; display: inline-flex; background-color: #F2EBDF; border-radius: 5px; border: 1px solid black; height: 10%; width: 90%; margin-left: 5%; margin-top: 2.5%;";

                    const statusDiv = document.createElement('div');
                    statusDiv.classList.add('ticketStatus');
                    statusDiv.style = "max-width: 20%; border: 1px solid red;";

                    statusDiv.textContent = ticket.status;
                    if (ticket.status == "pending")
                        ticketDiv.style.backgroundColor = "#fe9496";
                    else if (ticket.status == "closed")
                        ticketDiv.style.backgroundColor = "#1bcfc4";
                    else if (ticket.status == "deleted")
                        ticketDiv.style.backgroundColor = "#9e58ff";
                    else
                        console.log("ERROR : ", ticket.status)

                    const titleDiv = document.createElement('div');
                    titleDiv.classList.add('ticketTitle');
                    titleDiv.style = "max-width: 75%; border: 1px solid green; margin-left: 5%;";
                    titleDiv.textContent = ticket.title;

                    ticketDiv.appendChild(statusDiv);
                    ticketDiv.appendChild(titleDiv);
                    ticketsContainer.appendChild(ticketDiv);
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.pendingTicket {
    display: inline-flex;
    background-color: #F2EBDF;
    border-radius: 5px;
    border: 1px solid black;
    height: 10%;
    width: 90%;
    margin-left: 5%;
    margin-top: 2.5%;
    padding-top: 2.5%;
}

.ticketStatus {
    max-width: 20%;
    border: 1px solid red;
}

.ticketTitle {
    max-width: 80%;
    margin-left: 5%;
    border: 1px solid green;
}

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
    max-width: 30%;
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
    height: 55%;
    border-radius: 5px;
    border: 1px solid;
}

.titleOrDescripion {
    background-color: #FFFFFF;
    margin: 2.5%;
    margin-top: 1%;
    margin-bottom: 1%;
    width: 95%;
    height: 10%;
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
