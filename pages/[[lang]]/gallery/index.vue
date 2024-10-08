<template>
    <div class="text-center font-bold text-xl md:text-4xl my-8">{{ content.title }}</div>
    <div class="form">
        <div class="grid">
            <div class="grid-header">
                <div class="grid-item">{{ content.name }}</div>
                <div class="grid-item">{{ content.roomType }}</div>
                <div class="grid-item">{{ content.author }}</div>
                <div class="grid-item">{{ content.actionSingOrPlu }}</div>
            </div>
            <div v-for="(item) in GalleryData" class="grid-row">
                <div v-if="item.visibility" class="grid-item">{{ item.name }}</div>
                <div v-if="item.visibility" class="grid-item">{{ item.room }}</div>
                <div v-if="item.visibility" class="grid-item">{{ item.user.first_name }} {{ item.user.last_name }}</div>
                <div class="grid-item">
                    <a v-if="item.visibility" :href="`${langPrefix}gallery/${item.id}`"
                       class="custom-button">{{ content.details
                        }}</a><br />
                    <button v-if="item.user.id !== userID" class="custom-button" @click="blockUser(item.user.id)">
                        {{ content.blockUser }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { isLogged } from "public/ts/checkLogin";

const nuxtApp = useNuxtApp();

const content = ref(nuxtApp.$content.gallery);
const GalleryData = ref<{
    user: { id: number; first_name: string, last_name: string | null },
    room: string,
    name: string,
    description: string | null,
    visibility: boolean,
    id: number
}[]>();
const errorMessage = ref("");
const successMessage = ref("");
const langPrefix = ref(nuxtApp.$langPrefix);
const userID = ref(0);

onMounted(async () => {
    await checkLogin();
    await getGallery();
    console.debug(GalleryData.value);
});

async function checkLogin() {
    const userID_tmp = await isLogged();
    if (!userID_tmp) {
        location.href = "/login";
    }
    userID.value = Number(userID_tmp);
}

async function getGallery() {
    const response = await fetch("https://api.ardeco.app/gallery?user_details", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    if (!response.ok) {
        console.error("Fail to fetch data");
        errorMessage.value = "Fail to fetch data";
    }

    const result = await response.json();
    GalleryData.value = result.data;
}

async function blockUser(userID: number) {
    const response = await fetch(`https://api.ardeco.app/block/${userID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    const json = await response.json();
    alert(json.description); // TODO : Notification system instead of alert
    if (response.ok) {
        successMessage.value = "User blocked successfully";
        if (GalleryData.value) {
            GalleryData.value = GalleryData.value.filter(item => item.user.id !== userID);
        }
    } else {
        console.error(json.description);
        errorMessage.value = "An error occurred while blocking the user.";
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
    min-width: 500px;
    width: 75%;
    display: flex;
    flex-direction: column;
    border: 2px solid #000;
    border-radius: 5px;
}

.grid-header {
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

.title {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    margin-top: 5%;
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
