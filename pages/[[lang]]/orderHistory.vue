<template>
    <Navbar :urlLang=this.lang></Navbar>
    <div class="title" style="margin-top: 10%">{{ content.title }}</div>
    <div id="order_history_loading">{{ content.loading }}</div>
    <div id="order_history_error">{{ errorMessage }}</div>
    <div class="form" id="order_history_table" style="display: none">
        <div class="grid">
            <div class="grid-header">
                <div class="grid-item">{{ content.id }}</div>
                <div class="grid-item">{{ content.date }}</div>
                <div class="grid-item">{{ content.total }}</div>
                <div class="grid-item">{{ content.furniture }}</div>
                <div class="grid-item">{{ content.actions }}</div>
            </div>
            <div v-for="(item, index) in orderHistory" :key="index" class="grid-row">
                <div class="grid-item">{{ item.id }}</div>
                <div class="grid-item">{{ item.datetime }}</div>
                <div class="grid-item">{{ item.total_amount }}</div>
                <div class="grid-item">{{ item.furniture }}</div>
                <div class="grid-item">
                    <button class="custom-button" @click="downloadInvoice(item.id)">{{ content.download }}</button>
                </div>
            </div>
        </div>
    </div>
    <div id="order_history_noOrder" style="display: none;">{{ content.noOrders }}</div>
</template>

<script>
import {isLogged} from "public/js/checkLogin";
import fr from "/src/lang/fr.json";
import en from "/src/lang/en.json";
import Navbar from "~/components/Navbar.vue";

export default {
    name: "FavFurniture",
    components: {
        Navbar
    },
    setup() {
        const route = useRoute();
        return { route };
    },
    data() {
        return {
            orderHistory: [],
            errorMessage: '',
            successMessage: '',
            content: {},
            langPrefix: "/",
            lang: this.route.params.lang
        };
    },
    mounted() {
        // If lang selector is not passed in url, get the user's one or set it to french
        if (this.lang !== 'en' && this.lang !== 'fr') {
            const localStorageLang = localStorage.getItem('lang');
            if (localStorageLang) {
                this.lang = localStorageLang;
            } else {
                this.lang = 'fr';
            }
        }

        console.log(this.lang);

        // Set the content variable to the correct language
        this.content = this.lang === 'en' ? en.orderHistory : fr.orderHistory;

        // Prefix for links
        if (location.href.includes("/fr/")) {
            this.langPrefix = "/fr/";
        } else if (location.href.includes("/en/")) {
            this.langPrefix = "/en/";
        }

        this.checkLogin();
        this.getOrderHistory();
    },
    methods: {
        async checkLogin() {
            const userID = await isLogged();
            if (!userID) {
                location.href = this.langPrefix + "login";
            }
        },

        async getOrderHistory() {
            const response = await fetch('https://api.ardeco.app/order_history/user/2?mode=details', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                console.error("Error on fetching order history");
                this.errorMessage = "Error on fetching order history";
                return;
            }

            const result = await response.json();

            document.getElementById("order_history_loading").style.display = "none";
            if (result.code !== 200) {
                console.error(result);
                this.errorMessage = result.description;
                document.getElementById("order_history_error").style.display = "block";
            } else {
                this.orderHistory = result.data;
                console.log(this.orderHistory);
                if (this.orderHistory.length > 0) {
                    document.getElementById("order_history_table").style.display = "flex";
                } else {
                    document.getElementById("order_history_noOrder").style.display = "block";

                }
            }
        },

        async downloadInvoice(id) {
            this.errorMessage = '';

            const response = await fetch(`https://api.ardeco.app/order_history/invoice/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                console.error("Error on fetching invoice");
                this.errorMessage = "Error on fetching invoice N°" + id;
                return;
            }

            const result = await response.blob();

            if (response.status !== 200) {
                console.error(result);
                alert(result.description);
            } else {
                //const file = new Blob([result], {type: 'application/pdf'});
                response.headers
                const file = URL.createObjectURL(result);
                window.open(file, '_blank');
            }
        }
    }
}
</script>

<style scoped lang="scss">
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 4% 0;
}

.edit-error {
    color: red;
}

.edit-success {
    color: green;
}

.custom-button {
    padding: 5px 20px;
    background-color: #F2EBDF;
    color: rgb(62 64 63);
    border: 2px solid rgb(62 64 63);
    border-radius: 5px;
    cursor: pointer;
}

.grid {
    display: flex;
    flex-direction: column;
    border: 2px solid #000;
    border-radius: 5px;
    width: 95%;
}

.grid-header {
    //min-width: 1400px;
    display: flex;
    font-weight: bold;

}

.grid-row {
    display: flex;
}

.grid-item {
    flex: 1;
    padding: 10px;
    border-right: 1px solid #000;
}

.grid-item:last-child {
    border-right: none;
}

.grid-row:hover {
    background-color: rgb(191, 178, 170);
}

.grid-item {
    flex: 1;
    padding: 12px; /* Adjust padding */
    border-right: 1px solid #ddd; /* Lighter border */
    border-bottom: 1px solid #ddd; /* Add bottom border */
}

.title {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    margin-top: 10%;
}

#order_history_loading {
    text-align: center;
    margin-top: 3%;
}

#order_history_error {
    text-align: center;
    margin-top: 3%;
    color: red;
}

#order_history_noOrder {
    text-align: center;
    margin-top: 3%;
}
</style>
