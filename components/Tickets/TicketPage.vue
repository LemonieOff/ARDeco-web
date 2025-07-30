<template>
    <Head>
        <Title>ARDeco - {{ content.title }}</Title>
    </Head>
    <div class="flex flex-col items-center px-4">
        <h1 class="text-center font-bold text-xl md:text-4xl my-8">{{ content.title }}</h1>
        <div>{{ content.somethingWrong }}</div>
        <div>{{ content.askUs }}</div>
    </div>
    <br>
    <div class="flex flex-col md:flex-row w-full px-4 justify-evenly">
        <div
            class="overflow-y-auto bg-port-brown bg-opacity-20 p-2 border border-gray-300 rounded-md w-full md:w-1/3 mb-4 md:mb-0 md:mr-4 h-2/4 md:h-full">
            <div class="text-center">{{ content.pendingTickets }}</div>
            <div v-for="ticket in tickets" :key="ticket.id"
                 :class="getTicketStatusClass(ticket.status)"
                 class="flex items-center cursor-pointer border border-gray-400 rounded-md p-2 my-3 w-full"
                 @click="receiveTicketDetails(ticket.id)">
                <div class="w-1/3 text-center">{{ content[ticket.status] }}</div>
                <div class="w-2/3 text-center">{{ ticket.title }}</div>
            </div>
        </div>
        <div ref="ticketCreator"
             class="bg-port-brown bg-opacity-20 p-2 border border-gray-300 rounded-md w-full md:w-1/2 h-2/4 mb-4 md:mb-0">
            <input ref="titleInput" :placeholder="content.writeYourTitleHere"
                   class="w-full p-2 rounded-md border border-gray-400 mb-2 bg-port-brown bg-opacity-40 placeholder-AR-Grey dark:placeholder-AR-Beige placeholder-opacity-60 dark:placeholder-opacity-60"
                   required type="text">
            <textarea ref="descriptionInput" :placeholder="content.shortDescriptionOfYourProblem"
                      class="w-full p-2 rounded-md border border-gray-400 mb-2 bg-port-brown bg-opacity-40 placeholder-AR-Grey dark:placeholder-AR-Beige placeholder-opacity-60 dark:placeholder-opacity-60"
                      required></textarea>
            <textarea ref="messageInput" :placeholder="content.writeYourProblemHere"
                      class="w-full h-[20dvh] p-2 rounded-md border border-gray-400 mb-2 h-2/3 bg-port-brown bg-opacity-40 placeholder-AR-Grey dark:placeholder-AR-Beige placeholder-opacity-60 dark:placeholder-opacity-60"
                      required></textarea>
            <button
                class="bg-gray-300 hover:bg-gray-400 text-AR-Grey text-center py-2 px-4 rounded-md w-2/5 mx-auto block"
                @click="createTicket">{{ content.createTicket }}
            </button>
        </div>
        <div ref="ticketManage"
            class="bg-port-brown bg-opacity-20 p-2 border border-gray-300 rounded-md w-full md:w-1/2 h-2/4 md:h-full hidden">
            <div class="text-center font-bold text-xl md:text-xl my-4"> {{ this.currentTicketTitle }}</div>
            <div class="text-center my-8" style="color: gray;"> {{ this.currentTicketDescription }}</div>
            <div class="h-2/3 overflow-y-auto border border-gray-400 rounded-md mb-4">
                <div v-for="message in messages" :key="message.timestamp"
                     :class="{ 'bg-green-200': message.sender !== 'Support', 'bg-blue-100 text-right ml-auto mr-4 w-2/3': message.sender === 'Support' }"
                     class="p-3 my-2 mx-4 rounded-md text-sm text-AR-Grey">
                    <p v-html='message.content.replaceAll(/\n/g, "<br />")'></p>
                    <div class="text-xs text-gray-500 mt-1">
                        <span>{{ message.sender }}</span> -
                        <span>{{ formatDate(message.timestamp.replaceAll(",", "").substring(0, 10))
                            }}</span>
                    </div>
                </div>
            </div>
            <textarea v-if="currentTicketStatus === 'pending'" ref="responseInput"
                      :placeholder="content.typeYourTextHere"
                      class="w-full p-2 rounded-md border border-gray-400 mb-2 h-1/6 resize-none bg-port-brown bg-opacity-40 placeholder-AR-Grey dark:placeholder-AR-Beige placeholder-opacity-60 dark:placeholder-opacity-60"></textarea>
            <textarea v-if="currentTicketStatus === 'closed'" ref="responseInput"
                      :placeholder="content.youCantReplyToAClosedTicket"
                      class="w-full p-2 rounded-md border border-gray-400 mb-2 h-1/6 resize-none cursor-not-allowed placeholder-AR-Grey dark:placeholder-AR-Beige placeholder-opacity-60 dark:placeholder-opacity-60"
                      disabled></textarea>
            <div class="flex">
                <button v-if="currentTicketStatus === 'pending'"
                        class="bg-green-400 hover:bg-green-500 text-white text-xs py-1 px-2 rounded-md mr-2"
                        @click="sendNewMessage">{{ content.send }}
                </button>
                <button v-if="currentTicketStatus === 'pending'"
                        class="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded-md mr-2"
                        @click="closeTicket">{{ content.close }}
                </button>
                <button class="bg-gray-400 hover:bg-gray-500 text-white text-xs py-1 px-2 rounded-md"
                        @click="closeConversation">{{ content.back }}
                </button>
            </div>
        </div>
    </div>
    <Notifications ref="notifications" />
</template>

<script>
import { isLogged, loggedIn } from "@/public/ts/checkLogin";

export default {
    name: "TicketPage",
    data() {
        return {
            content: this.$content.tickets,
            notificationsMessages: this.$content.notifications,
            tickets: [],
            messages: [],
            langPrefix: this.$langPrefix,
            currentTicketID: null,
            currentTicketStatus: null,
            currentTicketTitle: "",
            currentTicketDescription: "",
            backendHost: this.$config.public.backendHost,
        };
    },
    async mounted() {
        await this.getUserTickets();
    },
    methods: {
        async checkIfLogged() {
            const userId = await isLogged();
            if (!loggedIn) {
                location.href = `${this.langPrefix}login?redirect=${this.langPrefix}tickets`;
                return -1;
            }
            return userId;
        },
        validateCreateForm() {
            let errors = 0;

            const title = this.$refs.titleInput.checkValidity();
            const description = this.$refs.descriptionInput.checkValidity();
            const message = this.$refs.messageInput.checkValidity();

            if (!title) {
                this.$refs.notifications.showError(this.notificationsMessages.ticket.missingTitle);
                errors++;
            }
            if (!description) {
                this.$refs.notifications.showError(this.notificationsMessages.ticket.missingDescription);
                errors++;
            }
            if (!message) {
                this.$refs.notifications.showError(this.notificationsMessages.ticket.missingMessage);
                errors++;
            }

            return errors;
        },
        async createTicket() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }

            const errors = this.validateCreateForm();
            if (errors > 0) return;

            const title = this.$refs.titleInput.value;
            const description = this.$refs.descriptionInput.value;
            const message = this.$refs.messageInput.value;
            const response = await fetch(`${this.backendHost}/ticket/create?mode=id`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "title": title,
                    "description": description,
                    "message": message
                }),
                credentials: "include"
            });

            const result = await response.json();
            console.debug(result);

            if (result.code === 200) {
                this.$refs.notifications.showSuccess(this.notificationsMessages.ticketSuccessfullyCreated);
                this.$refs.titleInput.value = "";
                this.$refs.descriptionInput.value = "";
                this.$refs.messageInput.value = "";
            } else {
                this.$refs.notifications.showError(this.notificationsMessages.ticketCreationFailed);
            }

            await this.getUserTickets();
        },
        async receiveTicketDetails(ticketID) {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }

            const response = await fetch(`${this.backendHost}/ticket/${ticketID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            this.$refs.ticketManage.style.display = "block";
            this.$refs.ticketCreator.style.display = "none";

            const result = await response.json();
            console.log(result.data)
            console.debug("result", result);

            if (result.code === 200) {
                this.messages = result.data.messages;
                this.currentTicketStatus = result.data.status;
                this.currentTicketTitle = result.data.title;
                this.currentTicketDescription = result.data.description;
                console.debug("messages", this.messages);
                console.debug("status", this.currentTicketStatus);
                console.debug("title", this.currentTicketTitle);
                console.debug("description", this.currentTicketDescription);
            }

            this.currentTicketID = ticketID;
        },
        async getUserTickets() {
            const userID = await this.checkIfLogged();

            const response = await fetch(`${this.backendHost}/ticket/user/` + `${userID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();
            console.debug("result", result);

            if (result.code === 200) {
                this.tickets = result.data;
            }
        },
        async sendNewMessage() {
            await this.checkIfLogged();

            const message = this.$refs.responseInput.value;
            const response = await fetch(`${this.backendHost}/ticket/write/` + `${this.currentTicketID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "message": message
                }),
                credentials: "include"
            });

            const result = await response.json();
            console.debug("result", result);

            this.$refs.responseInput.value = "";
            await this.receiveTicketDetails(this.currentTicketID);
        },
        async closeTicket() {
            await this.checkIfLogged();

            const response = await fetch(`${this.backendHost}/ticket/close/` + `${this.currentTicketID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();
            console.debug("result", result);

            if (result.code === 200) {
                this.$refs.notifications.showSuccess(this.notificationsMessages.ticketSuccessfullyClosed);
            } else {
                this.$refs.notifications.showError(this.notificationsMessages.ticketSuccessfullyClosed.ticketClosureFailed);
            }

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
            const newTimestamp = timestamp.replace(/,/g, "");
            const date = new Date(parseInt(newTimestamp) * 1000);
            return date.toLocaleString();
        }
    }
};
</script>

<style lang="scss" scoped>
.pending {
    color: #fe9496;
    font-weight: bold;
}

.pending:hover {
    background-color: #fe9496;
    color: #FFFFFF;
}

.closed {
    color: #1bcfc4;
    font-weight: bold;
}

.closed:hover {
    background-color: #1bcfc4;
    color: #f5f5f5;
}

.deleted {
    color: #9e58ff;
    font-weight: bold;
}

.deleted {
    background-color: #9e58ff;
    color: #f5f5f5;
}

::placeholder {
    text-align: center;
    white-space: normal;
    word-wrap: break-word;
}

#messageInput {
    text-align: start;
}
</style>
