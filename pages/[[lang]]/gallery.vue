<template>
    <Navbar :urlLang=lang></Navbar>
    <div class="title">{{ content.title }}</div>
    <div class="form">
        <div class="grid">
            <div class="grid-header">
                <div class="grid-item">{{ content.id }}</div>
                <div class="grid-item">{{ content.name }}</div>
                <div class="grid-item">{{ content.roomType }}</div>
                <div class="grid-item">{{ content.author }}</div>
                <div class="grid-item">{{ content.actionSingOrPlu}}</div>
            </div>
            <div v-for="(item) in GalleryData" class="grid-row">
                <div class="grid-item" v-if="item.visibility === true">{{ item.id }}</div>
                <div class="grid-item" v-if="item.visibility === true">{{ item.name }}</div>
                <div class="grid-item" v-if="item.visibility === true">{{ item.room_type }}</div>
                <div class="grid-item" v-if="item.visibility === true">{{ item.user.first_name }} {{
                        item.user.last_name
                    }}
                </div>
                <div class="grid-item">
                    <!-- <router-link :to="{ name: 'VoirDetails', params: { id: 1 }}">Voir Détails</router-link> -->
                    <button class="custom-button" @click="openSidebar(item.id)" v-if="item.visibility === true">
                        {{ content.details }}
                    </button><br />
                    <button v-if="item.user.id !== userID" class="custom-button" @click="blockUser(item.user.id)">
                        {{ content.blockUser }}
                    </button>
                    <div class="sidebar" :id="`sidebar-${item.id}`" style="left: -250px">
                        Sidebar Content
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
const content = ref({});
const GalleryData = ref([]);
const errorMessage = ref("");
const successMessage = ref("");
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

    // Set the content variable to the correct language
    content.value = lang.value === 'en' ? en.gallery : fr.gallery;

    // Prefix for links
    langPrefix.value = lang.value === 'en' ? '/en/' : '/fr/';

    await checkLogin();
    await getGallery();
});

async function checkLogin() {
    const userID_tmp = await isLogged();
    if (!userID_tmp) {
        location.href = "/login";
    }
    userID.value = Number(userID_tmp);
}

async function getGallery() {
    try {
        const response = await fetch('https://api.ardeco.app/gallery?user_details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        GalleryData.value = result.data;
    } catch (error) {
        console.error(error.message);
        errorMessage.value = error.message;
    }
}

async function redirectDetails(id) {
    window.location.href = '/voirDetails/' + id;
}

async function openSidebar(id) {
    /*const all_sidebars = document.getElementsByClassName('.sidebar');
    all_sidebars.forEach(sidebar => {
        if (sidebar.style.left === "0") {
            sidebar.style.left = "-250px";
        }
      });*/

    const sidebar = document.getElementById(`sidebar-${id}`);
    if (sidebar.style.left === "-250px") {
        sidebar.style.left = "0";
    } else {
        sidebar.style.left = "-250px";
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
