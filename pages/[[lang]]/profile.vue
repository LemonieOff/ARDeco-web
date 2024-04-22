<template>
    <Navbar :urlLang=lang></Navbar>
    <ProfileSettings :urlLang=lang id="profileSettings" style="display: none"></ProfileSettings>
    <div id="profile-container">
        <div id="profile-loading" style="top: 10%;" class="form">
            {{ content.loading }}
        </div>
        <div class="profile-wrapper" style="display: none;">
            <div class="profile-elements-wrapper">
                <div class="element">{{ info.firstName }}<span id="firstName"></span></div>
                <div class="element2">{{ info.lastName }}<span id="lastName"></span></div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">{{ info.email }}<span id="email"></span></div>
                <div class="element2">{{ info.phone }}<span id="phone"></span></div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">{{ info.city }}<span id="city"></span></div>
                <div class="element2">{{ info.role }}<span id="role"></span></div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">{{ info.savedItems }}<span id="savedItems"></span></div>
                <div class="element2"><a id="yourFavoriteFurnitures" :href="`${langPrefix}orderHistory`" class="button">{{ info.commandsOrdered }}<span id="commandsOrdered"></span></a></div>
            </div>
            <div class="profile-edit-buttons-wrapper">
                <button id="startEditButton" class="editProfileButton" @click="startEdit">{{ buttons.update }}</button>
                <a id="deleteAccountButton" class="deleteAccountButton" :href="`${langPrefix}deleteAccount`">{{ buttons.delete }}</a>
            </div>
        </div>

        <div class="profile-wrapper" style="display: none;">
            <div class="profile-elements-wrapper">
                <div class="element">
                    <label id="firstName2" for="first_name_edit">{{ info.firstName }}</label>
                    <input type="text" id="first_name_edit" name="first_name">
                </div>
                <div class="element2">
                    <label id="lastName2" for="last_name_edit">{{ info.lastName }}</label>
                    <input type="text" id="last_name_edit" name="last_name">
                </div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">
                    <label id="email2" for="email_edit">{{ info.email }}</label>
                    <input type="text" id="email_edit" name="email">
                </div>
                <div class="element2">
                    <label id="phone2" for="phone_edit">{{ info.phone }}</label>
                    <input type="tel" id="phone_edit" name="phone">
                </div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">
                    <label id="city2" for="city_edit">{{ info.city }}</label>
                    <input type="text" id="city_edit" name="city">
                </div>
            </div>
            <div class="profile-edit-buttons-wrapper">
                <button id="cancelEditButton" class="editProfileButton" @click="cancelEdit">{{ buttons.cancel }}</button>
                <button id="editProfile" class="editProfileButton" @click="confirmEdit">{{ buttons.confirm }}</button>
            </div>
        </div>

        <div class="profile-wrapper-lower-buttons" style="margin: 2%; margin-left: 35%; width: 30%; background-color: none; display: none">
            <div class="profile-elements-wrapper">
                <div class="element">
                    <a id="yourFavoriteFurnitures" :href="`${langPrefix}favFurniture`" class="button">{{ content.yourFavoriteFurnitures }}</a>
                </div>
                <div class="element2">
                    <a id="yourFavoriteGalleries" :href="`${langPrefix}favGallery`" class="button">{{ content.yourFavoriteGalleries }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";
import ProfileSettings from "~/components/UserProfile/ProfileSettings.vue";
import {isLogged, loggedIn} from "public/js/checkLogin";
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import {onMounted, ref} from "vue";

const route = useRoute();
let lang = ref(route.params.lang);
let content = ref({});
let info = ref({});
let buttons = ref({});
let settings = ref({});
const langPrefix = ref("/");

onMounted(async () => {
    const userID = await isLogged();
    if (!loggedIn) {
        location.href = langPrefix.value + "login";
    }

    console.log(lang.value);
    // If lang selector is not passed in url, get the user's one or set it to french
    if (lang.value !== 'en' && lang.value !== 'fr') {
        const localStorageLang = localStorage.getItem('lang');
        if (localStorageLang) {
            lang.value = localStorageLang;
        } else {
            lang.value = 'fr';
        }
    }
    console.log(lang);

    // Set the content variable to the correct language
    content.value = lang.value === 'en' ? en.profile : fr.profile;
    info.value = lang.value === 'en' ? en.profile.informations : fr.profile.informations;
    buttons.value = lang.value === 'en' ? en.profile.buttons : fr.profile.buttons;
    settings.value = lang.value === 'en' ? en.profile.settings : fr.profile.settings;
    console.log(lang.value === 'en');
    console.log(content.value);

    // Prefix for links
    if (location.href.includes("/fr/")) {
        langPrefix.value = "/fr/";
    } else if (location.href.includes("/en/")) {
        langPrefix.value = "/en/";
    }

    // get profile data
    const response_profile = await fetch(`https://api.ardeco.app/user/${userID}`, {
        method: 'GET',
        credentials: 'include',
    });
    const data_profile = await response_profile.json();
    const result_profile = data_profile.data;

    // get gallery number data
    const response_gallery = await fetch(`https://api.ardeco.app/gallery/user/${userID}`, {
        method: 'GET',
        credentials: 'include',
    });
    const data_gallery = await response_gallery.json();
    const result_gallery = data_gallery.data;

    // get gallery number data
    const response_order_history = await fetch(`https://api.ardeco.app/order_history/user/${userID}`, {
        method: 'GET',
        credentials: 'include',
    });
    const data_order_history = await response_order_history.json();
    const result_order_history = data_order_history.data;

    document.getElementById("role").innerText = result_profile.role;
    document.getElementById("firstName").innerHTML = result_profile.firstname;
    document.getElementById("lastName").innerHTML = result_profile.lastname;
    document.getElementById("email").innerHTML = result_profile.email;
    document.getElementById("phone").innerHTML = result_profile.phone;
    document.getElementById("city").innerHTML = result_profile.city;
    document.getElementById("savedItems").innerHTML = result_gallery.length;
    document.getElementById("commandsOrdered").innerHTML = result_order_history;
    document.getElementById("first_name_edit").placeholder = result_profile.firstname;
    document.getElementById("last_name_edit").placeholder = result_profile.lastname;
    document.getElementById("email_edit").placeholder = result_profile.email;
    document.getElementById("phone_edit").placeholder = result_profile.phone;
    document.getElementById("city_edit").placeholder = result_profile.city;

    // Remove loading and display profile
    document.getElementById("profile-loading").style.display = "none";
    document.getElementById("profileSettings").style.display = "block";
    document.getElementsByClassName("profile-wrapper")[0].style.display = "block";
    document.getElementsByClassName("profile-wrapper-lower-buttons")[0].style.display = 'block'
});

const confirmEdit = async () => {
    document.getElementsByClassName("profile-wrapper")[0].style.display = 'block';
    document.getElementsByClassName("profile-wrapper")[1].style.display = 'none';
    document.getElementsByClassName("profile-wrapper-lower-buttons")[0].style.display = 'block';
    const email_field = document.getElementById("email_edit").value;
    const first_name_field = document.getElementById("first_name_edit").value;
    const last_name_field = document.getElementById("last_name_edit").value;
    const city_field = document.getElementById("city_edit").value;
    const phone_field = document.getElementById("phone_edit").value;

    let json = {};
    if (email_field !== "") json.email = email_field;
    if (first_name_field !== "") json.first_name = first_name_field;
    if (last_name_field !== "") json.last_name = last_name_field;
    if (city_field !== "") json.city = city_field;
    if (phone_field !== "") json.phone = phone_field;

    const response = await fetch(`https://api.ardeco.app/user/${localStorage.getItem("userID")}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(json)
    });

    const result = await response.json();
    console.log(result);
    location.reload();
}

const startEdit = async () => {
    document.getElementsByClassName("profile-wrapper")[0].style.display = 'none';
    document.getElementsByClassName("profile-wrapper")[1].style.display = 'block';
    document.getElementsByClassName("profile-wrapper-lower-buttons")[0].style.display = 'none'
}

const cancelEdit = async () => {
    document.getElementsByClassName("profile-wrapper")[0].style.display = 'block';
    document.getElementsByClassName("profile-wrapper")[1].style.display = 'none';
    document.getElementsByClassName("profile-wrapper-lower-buttons")[0].style.display = 'block'
}
</script>

<style scoped lang="scss">

.profile-wrapper {
    margin-left: 20%;
    margin-top: 5%;
    background-color: #F4F4F4;
    border-radius: 20px;
    width: 60%;
    height: 20%;
}

.profile-wrapper-lower-buttons {
    margin: 2%;
    margin-left: 35%;
    width: 30%;
    height: 20%;
}

.profile-elements-wrapper {
    display: flex;
    padding: 1%;
    text-align: center;
}

.profile-edit-buttons-wrapper {
    display: flex;
    justify-content: center;
}

.editProfileButton {
    width: 10%;
    border-radius: 5px;
}

.deleteAccountButton {
    width: 20%;
    margin-left: 5%;
    border-radius: 5px;
    background-color: #9e1d1d;
    color: white;
}

#deleteAccountButton {
    text-align: center;
}

#startEditButton {
    width: 20%;
}

.element {
    width: 47.5%;
    text-align: right;
}

.element2 {
    margin-left: 5%;
    width: 45%;
    text-align: left;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10% 0;
}

button {
    outline-style: solid;
    outline-width: thin;
}

.button {
    outline-style: solid;
    outline-width: thin;
    border-radius: 5px;
    padding: 1%;
    background-color: #F4F4F4;
}

</style>
