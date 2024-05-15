<template>
    <Navbar :urlLang=lang></Navbar>
    <div class="title">{{ content.title }}</div>
    <div id="fav_furniture_loading">{{ content.loading }}</div>
    <div>
        <div class="form">
            <div class="grid">
                <div class="grid-header">
                    <div class="grid-item cell-id">{{ content.id }}</div>
                    <div class="grid-item cell-name">{{ content.name }}</div>
                    <div class="grid-item cell-desc">{{ content.description }}</div>
                    <div class="grid-item cell-author">{{ content.author }}</div>
                    <div class="grid-item cell-room">{{ content.roomType }}</div>
                    <div class="grid-item cell-furniture">{{ content.furnitureTable }}</div>
                    <div class="grid-item cell-actions">{{ content.actionSingOrPlu }}</div>
                </div>
                <div v-for="(item) in GalleryData" class="grid-row">
                    <div class="grid-item cell-id">{{ item.gallery.id }}</div>
                    <div class="grid-item cell-name">{{ item.gallery.name }}</div>
                    <div class="grid-item cell-desc">{{ item.gallery.description }}</div>
                    <div class="grid-item cell-author">{{ item.user.first_name }} {{ item.user.last_name }}</div>
                    <div class="grid-item cell-room">{{ item.gallery.type }}</div>
                    <div class="grid-item cell-furniture">{{ item.gallery.furniture }}</div>
                    <div class="grid-item cell-actions">
                        <button class="custom-button" @click="deleteGallery(item.gallery.id)">{{ content.delete }}</button><br />
                        <button v-if="item.user.id !== userID" class="custom-button" @click="blockUser(item.user.id)">{{ content.blockUser }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";
import {isLogged} from "public/js/checkLogin";
import {onMounted, ref} from "vue";
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

const route = useRoute();
let lang = ref(route.params.lang);
let content = ref({});
let GalleryData = ref([]);
let errorMessage = ref("");
let successMessage = ref("");
const langPrefix = ref("/");
const userID = ref(0);

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
    content.value = lang.value === 'en' ? en.favorite.gallery : fr.favorite.gallery;

    // Prefix for links
    langPrefix.value = lang.value === 'en' ? '/en/' : '/fr/';

    await checkLogin();
    await getFavGallery();
});

async function checkLogin() {
    const userID_tmp = await isLogged();
    if (!userID_tmp) {
        location.href = "/login";
    }
    userID.value = Number(userID_tmp);
}

async function getFavGallery() {
    try {
        const userID = localStorage.getItem('userID');
        if (!userID) {
            throw new Error('No user found, redirecting to login');
        }

        const response = await fetch('https://api.ardeco.app/favorite/gallery', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        document.getElementById("fav_furniture_loading").style.display = "none";
        const result = await response.json();
        GalleryData.value = result.data;
    } catch (error) {
        console.error(error.message);
        errorMessage.value = error.message;
    }
}

async function deleteGallery(id) {
    try {
        const response = await fetch(`https://api.ardeco.app/favorite/Gallery/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (response.ok) {
            successMessage.value = 'Gallery deleted successfully';
            GalleryData.value = GalleryData.value.filter(item => item.gallery.id !== id);
        } else {
            throw new Error('Failed to delete Gallery');
        }
    } catch (error) {
        console.error(error);
        errorMessage.value = 'An error occurred while deleting the gallery.';
    }
}

async function blockUser(userID) {
    try {
        const response = await fetch(`https://api.ardeco.app/block/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const json = await response.json();
        alert(json.description);
        if (response.ok) {
            successMessage.value = 'User blocked successfully';
            // GalleryData.value = GalleryData.value.filter(item => item.user.id !== userID);
        } else {
            throw new Error('Failed to block user');
        }
    } catch (error) {
        console.error(error);
        errorMessage.value = 'An error occurred while blocking the user.';
    }
}
</script>

<style scoped lang="scss">
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
}

.grid-header {
    min-width: 1400px;
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
    align-content: center;
}

.title {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    margin-top: 5%;
}

#fav_furniture_loading {
    text-align: center;
    margin-top: 5%;
}

.cell-id {
    flex-grow: 0.2;
}
</style>
