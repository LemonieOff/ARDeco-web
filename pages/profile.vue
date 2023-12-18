<template>
    <Navbar></Navbar>
    <ProfileSettings></ProfileSettings>
    <div id="profile-container">
        <div id="profile-loading" class="form">
            Chargement en cours...
        </div>
        <div id="profile-wrapper" style="display: none">
            <div id="profile-retrieve">
                <h1>Profile</h1>
                <div>ID : <span ref="id" id="id"></span></div>
                <div>First name : <span ref="first_name" id="first_name"></span></div>
                <div>Last name : <span ref="last_name" id="last_name"></span></div>
                <div>Email : <span ref="email" id="email"></span></div>
                <div>Phone : <span ref="phone" id="phone"></span></div>
                <div>City : <span ref="city" id="city"></span></div>
                <div>Role : <span ref="role" id="role"></span></div>
                <div>Saved items in gallery : <span ref="gallery_nb" id="gallery_nb"></span></div>
                <div>Commands ordered : <span ref="commands_ordered" id="commands_ordered">0</span></div>
                <!--            <div>Address : <span ref="address"></span></div>
                            <div>State : <span ref="state"></span></div>
                            <div>Zip : <span ref="zip"></span></div>
                            <div>Country : <span ref="country"></span></div>
                            <div>Username : <span ref="username"></span></div>
                            <div>Profile picture : <span ref="profile_picture"></span></div>
                            <div>Created at : <span ref="created_at"></span></div>
                            <div>Updated at : <span ref="updated_at"></span></div>-->
            </div>
        </div>
        <div id="profile-edit">
            <div id="profile-edit-form" class="form">
                <div id="email_section_edit">
                    <label for="email_edit">Email : </label><input type="text" id="email_edit" name="email"
                                                                   placeholder="Email">
                    <ul id="email_errors_edit" class="edit-error"></ul>
                </div>
                <div id="first_name_section_edit">
                    <label for="first_name_edit">First name : </label><input type="text"
                                                                             id="first_name_edit"
                                                                             name="first_name"
                                                                             placeholder="Hugo">
                    <ul id="first_name_errors_edit" class="edit-error"></ul>
                </div>
                <div id="last_name_section_edit">
                    <label for="last_name_edit">Last name : </label><input type="text" id="last_name_edit"
                                                                           name="last_name"
                                                                           placeholder="BECART">
                    <ul id="last_name_errors_edit" class="edit-error"></ul>
                </div>
                <div id="city_section_edit">
                    <label for="city_edit">City : </label><input type="text" id="city_edit" name="city"
                                                                 placeholder="Berlin">
                    <ul id="city_errors_edit" class="edit-error"></ul>
                </div>
                <div id="phone_section_edit">
                    <label for="phone_edit">Phone : </label><input type="tel" id="phone_edit" name="phone"
                                                                   placeholder="+33601020304">
                    <ul id="phone_errors_edit" class="edit-error"></ul>
                </div>
                <div id="general_section_edit">
                    <ul id="general_errors_edit" class="edit-error"></ul>
                    <ul id="general_success_edit" class="edit-success"></ul>
                </div>
                <button @click="edit">Edit profile (only modified fields will be updated, empty ones will be ignored)</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";
import ProfileSettings from "~/components/UserProfile/ProfileSettings.vue";

import {isLogged, loggedIn} from "public/js/checkLogin";

onMounted(async () => {
    const userID = await isLogged();

    if (!loggedIn) {
        location.href = "/login";
    }

    // get profile data
    const response_profile = await fetch(`https://api.ardeco.app/user/${userID}`, {
        method: 'GET',
        credentials: 'include',
    });
    const data_profile = await response_profile.json();
    const result_profile = data_profile.data;

    document.getElementById("id").innerText = result_profile.id;
    document.getElementById("first_name").innerText = result_profile.firstname;
    document.getElementById("last_name").innerText = result_profile.lastname;
    document.getElementById("email").innerText = result_profile.email;
    document.getElementById("phone").innerText = result_profile.phone;
    document.getElementById("city").innerText = result_profile.city;
    document.getElementById("role").innerText = result_profile.role;

    // get gallery number data
    const response_gallery = await fetch(`https://api.ardeco.app/gallery/user/${userID}`, {
        method: 'GET',
        credentials: 'include',
    });
    const data_gallery = await response_gallery.json();
    const result_gallery = data_gallery.data;

    document.getElementById("gallery_nb").innerText = result_gallery.length;

    // Remove loading and display profile
    document.getElementById("profile-loading").style.display = "none";
    document.getElementById("profile-wrapper").style.display = "block";
});

const edit = async () => {
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

    displayHTMLErrors(result, response, "edit");
}

const displayHTMLErrors = (result, response, type) => {
    const errors = {
        "email": document.getElementById(`email_errors_${type}`),
        "first_name": document.getElementById(`first_name_errors_${type}`),
        "last_name": document.getElementById(`last_name_errors_${type}`),
        "city": document.getElementById(`city_errors_${type}`),
        "phone": document.getElementById(`phone_errors_${type}`),
        "general": document.getElementById(`general_errors_${type}`),
        "success": document.getElementById(`general_success_${type}`)
    }
    Object.values(errors).forEach(error => {
        if (error) {
            error.innerHTML = "";
        }
    });

    if (result.status === "OK") {
        console.log("success");
        const li = document.createElement("li");
        li.innerHTML = result.description;
        errors.success.appendChild(li);
        location.reload();
    } else {
        console.log("fail");
        if (Array.isArray(result.message)) {
            result.message.forEach(error => {
                const li = document.createElement("li");
                li.innerHTML = error;

                const split = error.split(" ");

                if (Object.keys(errors).includes(split[0])) {
                    errors[split[0]].appendChild(li);
                } else {
                    errors.general.appendChild(li);
                }
            });
        } else if (response.statusCode === 500 && result.message) {
            const li = document.createElement("li");
            if (result.message) {
                li.innerHTML = result.message;
            } else if (result.description) {
                li.innerHTML = result.description;
            } else {
                li.innerHTML = "Unknown error";
            }
            errors.general.appendChild(li);
        } else {
            const li = document.createElement("li");
            if (result.message) {
                li.innerHTML = result.message;
            } else if (result.description) {
                li.innerHTML = result.description;
            } else {
                li.innerHTML = "Unknown error";
            }
            errors.general.appendChild(li);
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
    margin: 10% 0;
}

.edit-error {
    color: red;
}

.edit-success {
    color: green;
}
</style>
