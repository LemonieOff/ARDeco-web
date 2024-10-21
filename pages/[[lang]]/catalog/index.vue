<template>
    <div class="text-center font-bold text-xl md:text-4xl my-8">{{ content.title }}</div>
    <div class="form">
        <div class="grid">
            <div class="grid-header">
                <div class="grid-item">{{ content.id }}</div>
                <div class="grid-item">{{ content.name }}</div>
                <div class="grid-item">{{ content.roomType }}</div>
                <div class="grid-item">{{ content.styles }}</div>
                <div class="grid-item">{{ content.actionSingOrPlu }}</div>
            </div>
            <div v-for="(item) in CatalogData" class="grid-row">
                <div v-if="item.active === true" class="grid-item">{{ item.id }}</div>
                <div v-if="item.active === true" class="grid-item">{{ item.name }}, {{
                        item.company_name
                    }}
                </div>
                <div v-if="item.active === true" class="grid-item">{{ item.rooms }}</div>
                <div v-if="item.active === true" class="grid-item">{{ item.styles }}</div>
                <div class="grid-item">
                    <a v-if="item.active === true" :href="`${langPrefix}catalog/${item.id}`"
                       class="custom-button">{{ content.details }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { isLogged } from "public/ts/checkLogin";

const nuxtApp = useNuxtApp();

const route = useRoute();
let lang = ref(route.params.lang);
const content = ref(nuxtApp.$content.catalog);
const CatalogData = ref([]);
const errorMessage = ref("");
const successMessage = ref("");
const langPrefix = ref("/");
const userID = ref(0);

onMounted(async () => {
    await checkLogin();
    await getCatalog();
    console.log(CatalogData.value);
});

async function checkLogin() {
    const userID_tmp = await isLogged();
    if (!userID_tmp) {
        location.href = "/login";
    }
    userID.value = Number(userID_tmp);
}

async function getCatalog() {
    try {
        const response = await fetch("https://api.ardeco.app/catalog", {
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
        CatalogData.value = result.data;
    } catch (error) {
        console.error(error.message);
        errorMessage.value = error.message;
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 20px;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 15px 0;
}

.edit-error {
    color: red;
}

.edit-success {
    color: green;
}

.custom-button {
    display: inline-block;
    padding: 10px 25px;
    background-color: #F2EBDF;
    color: rgb(62, 64, 63);
    border: 2px solid rgb(62, 64, 63);
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.custom-button:hover {
    background-color: #e0d8c6;
    color: rgb(35, 37, 36);
    border-color: rgb(35, 37, 36);
}

.custom-button:active {
    transform: translateY(2px);
}

.grid {
    display: flex;
    flex-direction: column;
    border: 2px solid #000;
    border-radius: 5px;
}

.grid-header {
    min-width: 1400px;
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
    padding: 12px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    align-content: center;
}

.container {
    padding-top: 90px;
}

.sidebar {
    position: fixed;
    top: 0;
    left: -250px; /* Caché par défaut */
    width: 250px;
    height: 100%;
    background-color: #333;
    color: #fff;
    padding: 20px;
    transition: left 0.3s ease;
}
</style>
