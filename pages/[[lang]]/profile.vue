<template>
    <ProfileSettings id="profileSettings" style="display: none"></ProfileSettings>
    <div id="profile-container">
        <div id="profile-loading" class="form" style="top: 10%;">
            {{ content.loading }}
        </div>
        <div class="profile-wrapper" style="display: none;">
            <div class="profile-elements-wrapper">
                <div class="element">{{ content.informations.firstName }}<span id="firstName"></span></div>
                <div class="element2">{{ content.informations.lastName }}<span id="lastName"></span></div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">{{ content.informations.email }}<span id="email"></span></div>
                <div class="element2">{{ content.informations.phone }}<span id="phone"></span></div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">{{ content.informations.city }}<span id="city"></span></div>
                <div class="element2">{{ content.informations.role }}<span id="role"></span></div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">{{ content.informations.savedItems }}<span id="savedItems"></span></div>
                <div class="element2"><a id="yourFavoriteFurnitures" :href="`${langPrefix}orderHistory`" class="button">{{ content.informations.commandsOrdered
                    }}<span id="commandsOrdered"></span></a></div>
            </div>
            <div class="profile-edit-buttons-wrapper">
                <button id="startEditButton" class="editProfileButton" @click="startEdit">{{ content.buttons.update }}
                </button>
                <a id="deleteAccountButton" :href="`${langPrefix}deleteAccount`"
                   class="deleteAccountButton">{{ content.buttons.delete }}</a>
            </div>
        </div>

        <div class="profile-wrapper" style="display: none;">
            <div class="profile-elements-wrapper">
                <div class="element">
                    <label id="firstName2" for="first_name_edit">{{ content.informations.firstName }}</label>
                    <input id="first_name_edit" name="first_name" type="text">
                </div>
                <div class="element2">
                    <label id="lastName2" for="last_name_edit">{{ content.informations.lastName }}</label>
                    <input id="last_name_edit" name="last_name" type="text">
                </div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">
                    <label id="email2" for="email_edit">{{ content.informations.email }}</label>
                    <input id="email_edit" name="email" type="text">
                </div>
                <div class="element2">
                    <label id="phone2" for="phone_edit">{{ content.informations.phone }}</label>
                    <input id="phone_edit" name="phone" type="tel">
                </div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">
                    <label id="city2" for="city_edit">{{ content.informations.city }}</label>
                    <input id="city_edit" name="city" type="text">
                </div>
                <div class="element2">
                    <label id="password2" for="password_edit">{{ content.informations.password }}</label>
                    <input id="password_edit" name="password" type="text">
                </div>
            </div>
            <div class="profile-edit-buttons-wrapper">
                <button id="cancelEditButton" class="editProfileButton" @click="cancelEdit">{{ content.buttons.cancel
                    }}
                </button>
                <button id="editProfile" class="editProfileButton" @click="confirmEdit">{{ content.buttons.confirm }}
                </button>
            </div>
        </div>

        <div class="profile-wrapper-lower-buttons">
            <div class="profile-elements-wrapper">
                <div class="element">
                    <a id="galleryAccess" :href="`${langPrefix}gallery`" class="button">{{ content.gallery }}</a>
                </div>
                <div class="element2">
                    <a id="blockedUsersAccess" :href="`${langPrefix}blockedUsers`"
                       class="button">{{ content.blockedUsers }}</a>
                </div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">
                    <a id="yourFavoriteGalleries" :href="`${langPrefix}favGallery`"
                       class="button">{{ content.yourFavoriteGalleries }}</a>
                </div>
                <div class="element2">
                    <a id="yourFavoriteFurnitures" :href="`${langPrefix}favFurniture`"
                       class="button">{{ content.yourFavoriteFurnitures }}</a>
                </div>
            </div>
        </div>
    </div>
    <Notifications ref="notifications" />
</template>

<script setup>
// TODO : TypeScript
import { isLogged, loggedIn, logout } from "public/ts/checkLogin";
import { onMounted, provide, ref } from "vue";
import ProfileSettings from "@/components/UserProfile/ProfileSettings.vue";
import Notifications from "@/components/Notifications.vue";

const nuxtApp = useNuxtApp();

let lang = ref(nuxtApp.$lang);
let content = ref(nuxtApp.$content.profile);
let userID = 0;
const langPrefix = nuxtApp.$langPrefix;
const profile = ref({});
const notifications = ref(null);
provide("profile", profile);

onMounted(async () => {
    userID = await isLogged();
    if (!loggedIn) {
        location.href = langPrefix.value + "login";
    }

    await getProfileElements();

    // Remove loading and display profile
    document.getElementById("profile-loading").style.display = "none";
    document.getElementById("profileSettings").style.display = "block";
    document.getElementsByClassName("profile-wrapper")[0].style.display = "block";
    document.getElementsByClassName("profile-wrapper-lower-buttons")[0].style.display = "block";
});

const getProfileElements = async () => {
    const response_profile = await fetch(`https://api.ardeco.app/user/${userID}`, {
        method: "GET",
        credentials: "include"
    });
    const data_profile = await response_profile.json();
    const result_profile = data_profile.data;
    profile.value = result_profile;


    const response_gallery = await fetch(`https://api.ardeco.app/gallery/user/${userID}`, {
        method: "GET",
        credentials: "include"
    });
    const data_gallery = await response_gallery.json();
    const result_gallery = data_gallery.data;


    const response_order_history = await fetch(`https://api.ardeco.app/order_history/user/${userID}`, {
        method: "GET",
        credentials: "include"
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
};

const confirmEdit = async () => {
    document.getElementsByClassName("profile-wrapper")[0].style.display = "block";
    document.getElementsByClassName("profile-wrapper")[1].style.display = "none";
    document.getElementsByClassName("profile-wrapper-lower-buttons")[0].style.display = "block";
    const email_field = document.getElementById("email_edit").value;
    const first_name_field = document.getElementById("first_name_edit").value;
    const last_name_field = document.getElementById("last_name_edit").value;
    const city_field = document.getElementById("city_edit").value;
    const phone_field = document.getElementById("phone_edit").value;
    const password_field = document.getElementById("password_edit").value;

    let isPasswordChanged = false;
    let json = {};
    if (email_field !== "") json.email = email_field;
    if (first_name_field !== "") json.first_name = first_name_field;
    if (last_name_field !== "") json.last_name = last_name_field;
    if (city_field !== "") json.city = city_field;
    if (phone_field !== "") json.phone = phone_field;
    if (password_field !== "") {
        json.password = password_field;
        isPasswordChanged = true;
    }

    console.log(json.length);
    const response = await fetch(`https://api.ardeco.app/user/${localStorage.getItem("userID")}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(json)
    });

    const result = await response.json();
    console.log(result);

    if (result.code === 200) {
        notifications.value.showSuccess("Informations modifiées avec succès");
        if (isPasswordChanged) {
            logout();
            location.reload();
        } else {
            await getProfileElements();
        }
    } else {
        notifications.value.showError("Error: Impossible de modifier les informations pour le moment, réessayez plus tard.");
    }
};

const startEdit = async () => {
    document.getElementsByClassName("profile-wrapper")[0].style.display = "none";
    document.getElementsByClassName("profile-wrapper")[1].style.display = "block";
    document.getElementsByClassName("profile-wrapper-lower-buttons")[0].style.display = "none";
};

const cancelEdit = async () => {
    document.getElementsByClassName("profile-wrapper")[0].style.display = "block";
    document.getElementsByClassName("profile-wrapper")[1].style.display = "none";
    document.getElementsByClassName("profile-wrapper-lower-buttons")[0].style.display = "block";
};
</script>

<style lang="scss" scoped>
#profile-container {
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 5%;
}

.profile-wrapper {
    //margin-left: 20%;
    //margin-top: 5%;
    background-color: #F4F4F4;
    border-radius: 20px;
    width: 90%;
    height: 20%;
}

.profile-wrapper-lower-buttons {
    margin: 2%;
    //margin-left: 35%;
    width: 90%;
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
