<script setup>
import {isLogged, loggedIn, disconnect} from "public/js/checkLogin";

onMounted(async () => {
    const userID = await isLogged();
    if (userID) {
        if (loggedIn) {
            document.getElementById("login-register-wrapper").style.display = "none";
            document.getElementById("user-form").style.display = "default";
            document.getElementById("user-welcome").innerHTML = "Welcome user N°" + userID + "!";
        } else {
            document.getElementById("login-register-wrapper").style.display = "default";
            document.getElementById("user-form").style.display = "none";
        }
    } else {
        document.getElementById("login-register-wrapper").style.display = "default";
        document.getElementById("user-form").style.display = "none";
    }
    document.getElementById("forms-loading").style.display = "none";
    document.getElementById("forms-wrapper").style.display = "block";
});

const displayHTMLErrors = (result, response, type) => {
    const errors = {
        "email": document.getElementById(`email_errors_${type}`),
        "password": document.getElementById(`password_errors_${type}`),
        "password_confirm": document.getElementById(`password_confirm_errors_${type}`),
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
        if (type === "login") {
            localStorage.setItem("userID", result.data["userID"]);
        } else {
            localStorage.setItem("userID", result.data["id"]);
        }
        localStorage.setItem("role", result.data["role"]);
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

const login = async () => {
    const email_field = document.getElementById("email_login").value;
    const password_field = document.getElementById("password_login").value;

    const response = await fetch('https://api.ardeco.app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({email: email_field, password: password_field})
    });

    const result = await response.json();
    console.log(result);

    displayHTMLErrors(result, response, "login");
}

const register = async () => {
    const email_field = document.getElementById("email_register").value;
    const password_field = document.getElementById("password_register").value;
    const password_confirm_field = document.getElementById("password_confirm_register").value;
    const first_name_field = document.getElementById("first_name_register").value;
    const last_name_field = document.getElementById("last_name_register").value;
    const city_field = document.getElementById("city_register").value;
    const phone_field = document.getElementById("phone_register").value;

    const response = await fetch('https://api.ardeco.app/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            email: email_field,
            password: password_field,
            password_confirm: password_confirm_field,
            first_name: first_name_field,
            last_name: last_name_field,
            city: city_field,
            phone: phone_field
        })
    });

    const result = await response.json();
    console.log(result);

    displayHTMLErrors(result, response, "register");
}

const getSettings = async () => {
    const response = await fetch('https://api.ardeco.app/settings', {
        method: 'GET',
        credentials: 'include',
    });

    const result = await response.json();
    console.log(result);
}

const logout = async () => {
    const response = await fetch('https://api.ardeco.app/logout', {
        method: 'GET',
        credentials: 'include',
    });
    await disconnect();
    const result = await response.text();
    console.log(result);
    location.reload();
}
</script>

<template>
    <div id="forms-container">
        <div id="forms-loading" class="form">
            Chargement en cours...
        </div>
        <div id="forms-wrapper" style="display: none">
            <div id="login-register-wrapper" class="login-register-wrapper">
                <div id="login-form" class="form">
                    <div id="email_section_login">
                        <label for="email">Email : </label><input type="text" id="email_login" name="email"
                                                                  placeholder="Email">
                        <ul id="email_errors_login" class="login-error"></ul>
                    </div>
                    <div id="password_section_login">
                        <label for="password">Password : </label><input type="password" id="password_login"
                                                                        name="password"
                                                                        placeholder="Password">
                        <ul id="password_errors_login" class="login-error"></ul>
                    </div>
                    <div id="general_section_login">
                        <ul id="general_errors_login" class="login-error"></ul>
                        <ul id="general_success_login" class="login-success"></ul>
                    </div>
                    <button @click="login">Login</button>
                </div>
                <div id="register-form" class="form">
                    <div id="email_section_register">
                        <label for="email">Email : </label><input type="text" id="email_register" name="email"
                                                                  placeholder="Email">
                        <ul id="email_errors_register" class="login-error"></ul>
                    </div>
                    <div id="password_section_register">
                        <label for="password">Password : </label><input type="password" id="password_register"
                                                                        name="password"
                                                                        placeholder="Password">
                        <ul id="password_errors_register" class="login-error"></ul>
                    </div>
                    <div id="password_confirm_section_register">
                        <label for="password_confirm_register">Password confirm : </label><input type="password"
                                                                                                 id="password_confirm_register"
                                                                                                 name="password_confirm"
                                                                                                 placeholder="Password">
                        <ul id="password_confirm_errors_register" class="login-error"></ul>
                    </div>
                    <div id="first_name_section_register">
                        <label for="first_name_register">First name : </label><input type="text"
                                                                                     id="first_name_register"
                                                                                     name="first_name"
                                                                                     placeholder="Hugo">
                        <ul id="first_name_errors_register" class="login-error"></ul>
                    </div>
                    <div id="last_name_section_register">
                        <label for="last_name_register">Last name : </label><input type="text" id="last_name_register"
                                                                                   name="last_name"
                                                                                   placeholder="BECART">
                        <ul id="last_name_errors_register" class="login-error"></ul>
                    </div>
                    <div id="city_section_register">
                        <label for="city_register">City : </label><input type="text" id="city_register" name="city"
                                                                         placeholder="Berlin">
                        <ul id="city_errors_register" class="login-error"></ul>
                    </div>
                    <div id="phone_section_register">
                        <label for="phone_register">Phone : </label><input type="tel" id="phone_register" name="phone"
                                                                           placeholder="+33601020304">
                        <ul id="phone_errors_register" class="login-error"></ul>
                    </div>
                    <div id="general_section_register">
                        <ul id="general_errors_register" class="login-error"></ul>
                        <ul id="general_success_register" class="login-success"></ul>
                    </div>
                    <button @click="register">Register</button>
                </div>
            </div>
            <div id="user-form" class="form">
                <div id="user-welcome"></div>
                <button @click="getSettings">Get settings</button>
                <button @click="logout">Logout</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10% 0;
}

.login-register-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .form {
        padding: 0 25px;
    }
}

.login-error {
    color: red;
}

.login-success {
    color: green;
}
</style>
