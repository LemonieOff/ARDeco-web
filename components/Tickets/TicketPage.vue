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
            <div class="alignCenter pendingTicket" v-for="ticket in tickets" :key="ticket.id"
                 :class="getTicketStatusClass(ticket.status)" @click="receiveTicketDetails(ticket.id)">
                <div class="ticketStatus">{{ content[ticket.status] }}</div>
                <div class="ticketTitle">{{ ticket.title }}</div>
            </div>
        </div>
        <div ref="ticketCreator" class="manageTicket">
            <input ref="titleInput" type="text" class="titleOrDescription" :placeholder="content.writeYourTitleHere">
            <textarea ref="descriptionInput" class="titleOrDescription"
                      :placeholder="content.shortDescriptionOfYourProblem"></textarea>
            <textarea ref="messageInput" class="textContent" :placeholder="content.writeYourProblemHere"></textarea>
            <button class="alignCenter ticketManagementButton" @click="createTicket">{{ content.createTicket }}</button>
        </div>
        <div ref="ticketManage" class="manageTicket" style="display: none;">
            <div class="messageHistory">
                <div class="message" v-for="message in messages" :key="message.timestamp"
                     :class="{ 'fromUser': message.sender !== 'Support', 'fromSupport': message.sender === 'Support' }">
                    {{ message.content }}
                    <div class="messageDetails">
                        <span> {{ message.sender }}</span>
                        <span> - </span>
                        <span> {{ formatDate(message.timestamp) }}</span>
                    </div>
                </div>
            </div>
            <textarea ref="responseInput" v-if="currentTicketStatus === 'pending'" class="newMessageInput"
                      :placeholder="content.typeYourTextHere"></textarea>
            <textarea ref="responseInput" v-if="currentTicketStatus === 'closed'" class="newMessageInput"
                      :placeholder="content.youCantReplyToAClosedTicket" disabled
                      style="cursor: not-allowed;"></textarea>
            <span class="ticketButtons">
                <button class="buttonFontClass sendMessage" v-if="currentTicketStatus === 'pending'"
                        @click="sendNewMessage"> {{ content.send }}</button>
                <button class="buttonFontClass closeMessage" v-if="currentTicketStatus === 'pending'"
                        @click="closeTicket"> {{ content.close }}</button>
                <button class="buttonFontClass goBack" @click="closeConversation"> {{ content.back }}</button>
            </span>
        </div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import {isLogged, loggedIn} from "public/js/checkLogin";

export default {
    name: "TicketPage",
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: this.$lang === 'en' ? en.tickets : fr.tickets,
            tickets: [],
            messages: [],
            langPrefix: this.$langPrefix,
            currentTicketID: null,
            currentTicketStatus: null
        }
    },
    async mounted() {
        await this.checkIfLogged();
        await this.getUserTickets();
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

            await this.getUserTickets();
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

            if (result.code === 200) {
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

            if (result.code === 200) {
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
    width: 100dvw;
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
    height: 70%;
    border: 1px solid black;
    border-radius: 5px;
    overflow-y: auto;
    margin-bottom: 4%;
}

.newMessageInput {
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
    display: flex;
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
    padding: 1.5% 2% 1%;
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

.ticketManagementButton {
    background-color: #F2EBDF;
    border: 1px solid;
    border-radius: 5px;
    padding: 1%;
    margin-left: 30%;
    width: 40%;
}

#messageInput {
    text-align: start;
}

::placeholder {
    text-align: center;
    white-space: normal;
    word-wrap: break-word;
}

.titleOrDescription,
.textContent,
.newMessageInput {
    overflow-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
    background-color: #FFFFFF;
    margin: 0 2.5% 1%;
    width: 95%;
    border-radius: 5px;
    border: 1px solid;
    padding: 1%;
}

.titleOrDescription {
    height: 10%;
}

.textContent {
    height: 55%;
}

.newMessageInput {
    min-height: 18%;
}

</style>
