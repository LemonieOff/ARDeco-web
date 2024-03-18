<template>
    <Navbar urlLang="fr"/>
    <ProfileSettings urlLang="fr"/>
    <div id="profile-container">
        <div id="profile-loading" class="form">
            Chargement en cours...
        </div>
        <div class="profile-wrapper">
            <div class="profile-elements-wrapper">
                <div class="element" id="firstName"></div>
                <div class="element2" id="lastName"></div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element" id="email"></div>
                <div class="element2" id="phone"></div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element" id="city"></div>
                <div class="element2" id="role"></div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element" id="savedItems"></div>
                <div class="element2" id="commandsOrdered"></div>
            </div>
            <div class="profile-edit-buttons-wrapper">
                <button id="startEditButton" class="editProfileButton" @click="startEdit"></button>
            </div>
        </div>

        <div class="profile-wrapper" style="display: none;">
            <div class="profile-elements-wrapper">
                <div class="element">
                    <label id="firstName2" for="first_name_edit"></label>
                    <input type="text" id="first_name_edit" name="first_name">
                </div>
                <div class="element2">
                    <label id="lastName2" for="last_name_edit"></label>
                    <input type="text" id="last_name_edit" name="last_name">
                </div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">
                    <label id="email2" for="email_edit"></label>
                    <input type="text" id="email_edit" name="email">
                </div>
                <div class="element2">
                    <label id="phone2" for="phone_edit"></label>
                    <input type="tel" id="phone_edit" name="phone">
                </div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">
                    <label id="city2" for="city_edit"></label>
                    <input type="text" id="city_edit" name="city">
                </div>
            </div>
            <div class="profile-edit-buttons-wrapper">
                <button id="cancelEditButton" class="editProfileButton" @click="cancelEdit"></button>
                <button id="editProfile" class="editProfileButton" @click="confirmEdit"></button>
            </div>
        </div>

        <div class="profile-wrapper-lower-buttons" style="margin: 2%; margin-left: 35%; width: 30%; background-color: none;">
            <div class="profile-elements-wrapper">
                <div class="element">
                    <a id="yourFavoriteFurnitures" href="/favFourniture" class="button"></a>
                </div>
                <div class="element2">
                    <a id="yourFavoriteGalleries" href="/favGallery" class="button"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";
import ProfileSettings from "~/components/UserProfile/ProfileSettings.vue";
import fr from "~/src/lang/fr.json";

import {isLogged, loggedIn} from "public/js/checkLogin";

onMounted(async () => {
    const userID = await isLogged();
    let lang = localStorage.getItem('lang')

    // get profile data
    const response_profile = await fetch(`https://api.ardeco.app/user/${userID}`, {
        method: 'GET',
        credentials: 'include',
    });
    const data_profile = await response_profile.json();
    const result_profile = data_profile.data;

    // document.getElementById("id").innerText = result_profile.id;
    document.getElementById("role").innerText = "Role : " + result_profile.role;

    // get gallery number data
    const response_gallery = await fetch(`https://api.ardeco.app/gallery/user/${userID}`, {
        method: 'GET',
        credentials: 'include',
    });
    const data_gallery = await response_gallery.json();
    const result_gallery = data_gallery.data;

    // Remove loading and display profile
    document.getElementById("profile-loading").style.display = "none";
    document.getElementsByClassName("profile-wrapper")[0].style.display = "block";

    document.getElementById("firstName").innerHTML = fr.profile.informations.firstName + result_profile.firstname;
    document.getElementById("lastName").innerHTML = fr.profile.informations.lastName + result_profile.lastname;
    document.getElementById("email").innerHTML = fr.profile.informations.email + result_profile.email;
    document.getElementById("phone").innerHTML = fr.profile.informations.phone + result_profile.phone;
    document.getElementById("city").innerHTML = fr.profile.informations.city + result_profile.city;
    document.getElementById("savedItems").innerHTML = fr.profile.informations.savedItems + result_gallery.length;
    document.getElementById("commandsOrdered").innerHTML = fr.profile.informations.commandsOrdered + "0";
    document.getElementById("cancelEditButton").innerHTML = fr.profile.buttons.cancel;
    document.getElementById("startEditButton").innerHTML = fr.profile.buttons.update;
    document.getElementById("editProfile").innerHTML = fr.profile.buttons.confirm;
    document.getElementById("firstName2").innerHTML = fr.profile.informations.firstName;
    document.getElementById("first_name_edit").placeholder = result_profile.firstname;
    document.getElementById("lastName2").innerHTML = fr.profile.informations.lastName;
    document.getElementById("last_name_edit").placeholder = result_profile.lastname;
    document.getElementById("email2").innerHTML = fr.profile.informations.email;
    document.getElementById("email_edit").placeholder = result_profile.email;
    document.getElementById("phone2").innerHTML = fr.profile.informations.phone;
    document.getElementById("phone_edit").placeholder = result_profile.phone;
    document.getElementById("city2").innerHTML = fr.profile.informations.city;
    document.getElementById("city_edit").placeholder = result_profile.city;
    document.getElementById("yourFavoriteFurnitures").innerHTML = fr.profile.yourFavoriteFurnitures;
    document.getElementById("yourFavoriteGalleries").innerHTML = fr.profile.yourFavoriteGalleries;

    if (!loggedIn) {
        location.href = "/login";
    }
});

const confirmEdit = async () => {
    document.getElementsByClassName("profile-wrapper")[0].style.display = 'block';
    document.getElementsByClassName("profile-wrapper-lower-buttons")[0].style.display = 'none'
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
    document.getElementsByClassName("profile-wrapper-lower-buttons")[0].style.display = 'block'
}

const cancelEdit = async () => {
    document.getElementsByClassName("profile-wrapper")[0].style.display = 'block';
    document.getElementsByClassName("profile-wrapper-lower-buttons")[0].style.display = 'none'
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
