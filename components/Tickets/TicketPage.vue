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
            <div class="alignCenter pendingTicket" v-for="ticket in tickets" :key="ticket.id" :class="getTicketStatusClass(ticket.status)" @click="receiveTicketDetails(ticket.id)">
                <div class="ticketStatus">{{ content[ticket.status] }}</div>
                <div class="ticketTitle">{{ ticket.title }}</div>
            </div>
        </div>
        <div ref="ticketCreator" class="manageTicket">
            <input ref="titleInput" type="text" class="titleOrDescripion" :placeholder="content.writeYourTitleHere">
            <input ref="descriptionInput" type="text" class="titleOrDescripion" :placeholder="content.shortDescriptionOfYourProblem">
            <input ref="messageInput" type="text" class="textContent" :placeholder="content.writeYourProblemHere">
            <button class="alignCenter ticketManagementButton" @click="createTicket">{{ content.createTicket }}</button>
        </div>
        <div ref="ticketManage" class="manageTicket" style="display: none;">
            <div class="messageHistory">
                <div class="message" v-for="message in messages" :key="message.timestamp" :class="{ 'fromUser': message.sender !== 'Support', 'fromSupport': message.sender === 'Support' }">
                    {{ message.content }}
                    <div class="messageDetails">
                        <span> {{ message.sender }}</span>
                        <span> - </span>
                        <span> {{ formatDate(message.timestamp) }}</span>
                    </div>
                </div>
            </div>
            <input ref="responseInput" v-if="currentTicketStatus === 'pending'" type="text" class="newMessageInuput" :placeholder="content.typeYourTextHere">
            <input ref="responseInput" v-if="currentTicketStatus === 'closed'" class="newMessageInuput" :placeholder="content.youCantReplyToAClosedTicket">
            <span class="ticketButtons">
                <button class="buttonFontClass sendMessage" v-if="currentTicketStatus === 'pending'" @click="sendNewMessage"> {{ content.send }}</button>
                <button class="buttonFontClass closeMessage" v-if="currentTicketStatus === 'pending'" @click="closeTicket"> {{ content.close }}</button>
                <button class="buttonFontClass goBack" @click="closeConversation"> {{ content.back }}</button>
            </span>
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
            tickets: [],
            messages: [],
            langPrefix: "/",
            currentTicketID: null,
            currentTicketStatus: null
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
            const title = this.$refs.titleInput.value;
            const description = this.$refs.descriptionInput.value;
            const message = this.$refs.messageInput.value;
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

            this.$refs.titleInput.value = "";
            this.$refs.descriptionInput.value = "";
            this.$refs.messageInput.value = "";

            this.getUserTickets();
        },
        async receiveTicketDetails(ticketID) {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }

            const response = await fetch('https://api.ardeco.app/ticket/' + `${ticketID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            this.$refs.ticketManage.style.display = "block";
            this.$refs.ticketCreator.style.display = "none";

            const result = await response.json();
            console.log("result", result);

            if (result.code == 200) {
                this.messages = result.data.messages;
                this.currentTicketStatus = result.data.status;
                console.log("messages", this.messages);
                console.log("status", this.currentTicketStatus);
            }
            
            this.currentTicketID = ticketID;
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
                this.tickets = result.data;
            }
        },
        async sendNewMessage() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }

            const message = this.$refs.responseInput.value;
            const response = await fetch('https://api.ardeco.app/ticket/write/' + `${this.currentTicketID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "message": message
                }),
                credentials: 'include',
            });

            const result = await response.json();
            console.log("result", result);

            this.$refs.responseInput.value = "";
            await this.receiveTicketDetails(this.currentTicketID);
        },
        async closeTicket() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }

            const response = await fetch('https://api.ardeco.app/ticket/close/' + `${this.currentTicketID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log("result", result);

            this.$refs.responseInput.value = "";
            await this.receiveTicketDetails(this.currentTicketID);
            await this.getUserTickets();
        },
        async closeConversation() {
            this.$refs.responseInput.value = null;
            this.$refs.ticketManage.style.display = "none";
            this.$refs.ticketCreator.style.display = "block";
            this.messages = [];
            this.currentTicketStatus = null;
        },
        getTicketStatusClass(status) {
            if (status === "pending") return "pending";
            else if (status === "closed") return "closed";
            else if (status === "deleted") return "deleted";
            else return "";
        },
        formatDate(timestamp) {
            const newTimestamp = timestamp.replace(/,/g, '');
            const date = new Date(parseInt(newTimestamp) * 1000);
            return date.toLocaleString();
        }
    }
}
</script>

<style lang="scss" scoped>

.pendingTicket {
    cursor: pointer;
    display: inline-flex;
    border-radius: 5px;
    border: 1px solid black;
    height: 10%;
    width: 90%;
    margin-left: 5%;
    margin-top: 2.5%;
}

.ticketStatus {
    margin-left: 5%;
    align-self: center;
    width: 30%;
    padding: 1%;
}

.ticketTitle {
    align-self: center;
    max-width: 60%;
    margin-left: 5%;
}

.pending {
    background-color: #f5f5f5;
    color: #fe9496;
    font-weight: bold;
}

.pending:hover {
    background-color: #fe9496;
    color: #FFFFFF;
}

.closed {
    background-color: #f5f5f5;
    color: #1bcfc4;
    font-weight: bold;
}

.closed:hover {
    background-color: #1bcfc4;
    color: #f5f5f5;
}

.deleted {
    background-color: #f5f5f5;
    color: #9e58ff;
    font-weight: bold;
}

.deleted {
    background-color: #9e58ff;
    color: #f5f5f5;
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
    overflow-y: auto;
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

.messageHistory {
    height: 80%;
    border: 1px solid black;
    border-radius: 5px;
    overflow-y: auto;
}

.newMessageInuput {
    margin-top: 1%;
    min-width: 78%;
    min-height: 18%;
    border: 1px solid black;
    border-radius: 5px;
}

.buttonFontClass {
    font-size: 10px;
}

.ticketButtons {
}

.sendMessage {
    margin-left: 1%;
    background-color: #1bcfc4;
    color: #FFFFFF;
    font-weight: bold;
    border: 1px solid black;
    border-radius: 3px;
    padding: 4px;
}

.sendMessage:hover {
    color: #1bcfc4;
    background-color: #FFFFFF;
    cursor: pointer;
}

.closeMessage {
    margin-left: 1%;
    background-color: #fe9496;
    color: #FFFFFF;
    font-weight: bold;
    border: 1px solid black;
    border-radius: 3px;
    padding: 4px;
}

.closeMessage:hover {
    color: #fe9496;
    background-color: #FFFFFF;
    cursor: pointer;
}

.goBack {
    margin-left: 1%;
    background-color: #505050;
    color: #FFFFFF;
    font-weight: bold;
    border: 1px solid black;
    border-radius: 3px;
    padding: 4px;
}

.goBack:hover {
    color: #505050;
    background-color: #FFFFFF;
    cursor: pointer;
}

.message {
    font-size: 16px;
    border: 1px solid black;
    padding: 2%;
    padding-bottom: 1%;
    padding-top: 1.5%;
    margin: 1%;
    max-width: 60%;
    min-height: 4%;
    border-radius: 5px;
}

.messageDetails {
    font-size: 10px;
}

.fromUser {
    background-color: #1bcfc4;
}

.fromSupport {
    background-color: #e1e9f5;
    text-align: end;
    margin-left: 40%;
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
