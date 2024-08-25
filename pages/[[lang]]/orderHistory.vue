<template>
    <Navbar :urlLang=lang></Navbar>
    <div class="title">{{ content.title }}</div>
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

<script setup>
import Navbar from "~/components/Navbar.vue";
import {isLogged} from "public/ts/checkLogin";
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import {onMounted, ref} from "vue";

const route = useRoute();
let lang = ref(route.params.lang);
let content = ref({});
let orderHistory = ref([]);
let errorMessage = ref("");
let successMessage = ref("");
const langPrefix = ref("/");
const user_id = ref(0);

onMounted(async () => {
    // If lang selector is not passed in url, get the user's one or set it to french
    if (lang.value !== 'en' && lang.value !== 'fr') {
        const localStorageLang = localStorage.getItem('lang');
        if (localStorageLang) {
            lang.value = localStorageLang;
        } else {
            lang.value = 'fr';
        }
    }

    console.log(lang.value);

    // Set the content variable to the correct language
    content.value = lang.value === 'en' ? en.orderHistory : fr.orderHistory;

    // Prefix for links
    if (location.href.includes("/fr/")) {
        langPrefix.value = "/fr/";
    } else if (location.href.includes("/en/")) {
        langPrefix.value = "/en/";
    }

    await checkLogin();
    await getOrderHistory();
});

async function checkLogin() {
    const userID = await isLogged();
    if (!userID) {
        location.href = langPrefix.value + "login";
    }
    user_id.value = Number(userID);
}

async function getOrderHistory() {
    const response = await fetch(`https://api.ardeco.app/order_history/user/${user_id.value}?mode=details`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        console.error("Error on fetching order history");
        errorMessage.value = "Error on fetching order history";
        return;
    }

    const result = await response.json();

    document.getElementById("order_history_loading").style.display = "none";
    if (result.code !== 200) {
        console.error(result);
        errorMessage.value = result.description;
        document.getElementById("order_history_error").style.display = "block";
    } else {
        orderHistory.value = result.data;
        console.log(orderHistory.value);
        if (orderHistory.value.length > 0) {
            document.getElementById("order_history_table").style.display = "flex";
        } else {
            document.getElementById("order_history_noOrder").style.display = "block";

        }
    }
}

async function downloadInvoice(id) {
    errorMessage.value = '';

    const response = await fetch(`https://api.ardeco.app/order_history/invoice/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/pdf',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        console.error("Error on fetching invoice");
        errorMessage.value = "Error on fetching invoice N°" + id;
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
