<template>
    <div>
        <Navbar/>
        <div class="blocked-users">
            <div class="title">{{ content.title }}</div>
            <div class="user-grid" v-if="UserData.length > 0">
                <div class="blocked-user" v-for="userData in UserData" :key="userData.data.userId">
                    <div class="user-cube">
                        <div class="user-details">
                            <p class="user-title">{{ content.lastname }} <span class="user-value">{{ userData.data.lastname }}</span></p>
                            <p class="user-title">{{ content.firstname }} <span class="user-value">{{ userData.data.firstname }}</span></p>
                            <p class="user-title">{{ content.id }} <span class="user-value">{{ userData.data.userId }}</span></p>
                            <button class="unblockButton" @click="unblockUser(userData.data.userId)">{{
                                    content.unblock
                                }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="no-blocked-users">Aucun utilisateur bloqué</p>
            </div>
        </div>
    </div>
</template>

  <script>
  import { isLogged } from "public/ts/checkLogin";
  
  export default {
    name: "Blocked",
    props: {
        urlLang: String | null
    },
    data() {
        return {
            BlockedData: [],
            UserData: [],
            errorMessage: "",
            successMessage: "",
            content: {},
            langPrefix: "fr"
        };
    },
    mounted() {
        let lang = this.urlLang

        if (lang !== 'en' && lang !== 'fr') {
            if (localStorage.getItem('lang')) {
                lang = localStorage.getItem('lang');
            } else {
                lang = 'fr';
            }
        }

        this.content = lang === 'en' ? en.blockedUsers : fr.blockedUsers;

        this.checkLogin();
        this.getBlocked();
    },
    methods: {
        async checkLogin() {
            const userID = await isLogged();
            if (!userID) {
                location.href = "/login";
            }
        },

        async getBlocked() {
            try {
                const userID = localStorage.getItem("userID");
                if (!userID) {
                    throw new Error("No user found, redirecting to login");
                }

                const response = await fetch("https://api.ardeco.app/blocked_users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await response.json();
                this.BlockedData = result.data;
            } catch (error) {
                console.error(error.message);
                this.errorMessage = error.message;
            }
            for (let x = 0; this.BlockedData[x] !== undefined; x++) {
                await this.getUserFullName(this.BlockedData[x]);
            }
        },

        async getUserFullName(userId) {
            try {
                const response = await fetch(`https://api.ardeco.app/user/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user information");
                }
                const userData = await response.json();
                userData.data.userId = userId; // Ajout de l'ID d'utilisateur
                this.UserData.push(userData);
            } catch (error) {
                console.error("Error fetching user information:", error);
                return "Unknown user";
            }
        },

        async unblockUser(userId) {
            try {
                const response = await fetch(`https://api.ardeco.app/unblock/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error("Failed to unblock user");
                }

                this.UserData = this.UserData.filter(user => user.data.userId !== userId);
                this.successMessage = `User ${userId} unblocked successfully`;
            } catch (error) {
                console.error(error.message);
                this.errorMessage = error.message;
            }
        }
    }
};

</script>

<style scoped>
.blocked-users {
    padding-top: 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
}

.user-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.blocked-user {
    margin-bottom: 20px;
    margin-right: 20px; /* Espacement entre les utilisateurs bloqués */
}

.user-cube {
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: floralwhite;
}

.user-details {
    padding: 20px;
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    min-width: 200px;
    max-width: 200px;
    min-height: 170px;
    max-height: 170px;
}

.user-title {
    font-weight: bold;

    span.user-value {
        font-weight: normal;
    }
}

.no-blocked-users {
    text-align: center;
    margin-top: 20px;
    font-style: italic;
    color: #888;
}

.unblockButton {
    display: block;
    background-color: #4ca444;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 10px 0 0 0;
    border-radius: 5px;
    cursor: pointer;
    align-self: center;
}
</style>
