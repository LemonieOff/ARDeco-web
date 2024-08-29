<template>
    <div id="forms-container">
        <div id="forms-loading" class="form">
            {{ content.loading }}
        </div>
        <div id="forms-wrapper" style="display: none">
            <div id="login-register-wrapper" class="login-register-wrapper">
                <div id="login-form" class="form">
                    <span class="typeTitle">{{ content.loginTitle }}</span>
                    <div id="email_section_login">
                        <label id="email" for="email">{{ content.email }}</label>
                        <input type="text" id="email_login" name="email" placeholder="Email">
                        <ul id="email_errors_login" class="login-error"></ul>
                    </div>
                    <div id="password_section_login">
                        <label id="password" for="password">{{ content.password }}</label>
                        <input type="password" id="password_login" name="password" placeholder="Password">
                        <ul id="password_errors_login" class="login-error"></ul>
                    </div>
                    <div id="general_section_login">
                        <ul id="general_errors_login" class="login-error"></ul>
                        <ul id="general_success_login" class="login-success"></ul>
                    </div>
                    <button id="login" @click="login">{{ content.login }}</button>
                </div>
                <div id="register-form" class="form">
                    <span class="typeTitle">{{ content.registerTitle }}</span>
                    <div class="mandatory_fields">
                        <span class="gdpr_indication">{{ content.mandatoryFields }}</span>
                        <div id="email_section_register">
                            <label id="email2" for="email">{{ content.email }}</label>
                            <input type="text" id="email_register" name="email" placeholder="Email">
                            <ul id="email_errors_register" class="login-error"></ul>
                        </div>
                        <div id="password_section_register">
                            <label id="password2" for="password">{{ content.password }}</label>
                            <input type="password" id="password_register" name="password" placeholder="Password">
                            <ul id="password_errors_register" class="login-error"></ul>
                        </div>
                        <div id="password_confirm_section_register">
                            <label id="passwordConfirm" for="password_confirm_register">{{ content.passwordConfirm }}</label>
                            <input type="password" id="password_confirm_register" name="password_confirm" placeholder="Password">
                            <ul id="password_confirm_errors_register" class="login-error"></ul>
                        </div>
                        <div id="first_name_section_register">
                            <label id="firstName" for="first_name_register">{{ content.firstName }}</label>
                            <input type="text" id="first_name_register" name="first_name" placeholder="John">
                            <ul id="first_name_errors_register" class="login-error"></ul>
                        </div>
                    </div>
                    <div class="optional_fields">
                        <span class="gdpr_indication">{{ content.optionalFields }}</span>
                        <div id="last_name_section_register">
                            <label id="lastName" for="last_name_register">{{ content.lastName }}</label>
                            <input type="text" id="last_name_register" name="last_name" placeholder="DOE">
                            <ul id="last_name_errors_register" class="login-error"></ul>
                        </div>
                        <div id="city_section_register">
                            <label id="city" for="city_register">{{ content.city }}</label>
                            <input type="text" id="city_register" name="city" placeholder="Berlin">
                            <ul id="city_errors_register" class="login-error"></ul>
                        </div>
                        <div id="phone_section_register">
                            <label id="phone" for="phone_register">{{ content.phone }}</label>
                            <input type="tel" id="phone_register" name="phone" placeholder="+33601020304">
                            <ul id="phone_errors_register" class="login-error"></ul>
                        </div>
                    </div>
                    <div class="gdpr_consent">
                        <div><input type="checkbox" id="checkPolicy"/><label for="checkPolicy">{{ content.consent }}</label></div>
                        <div><input type="checkbox" id="checkTOS"/><label for="checkTOS">{{ content.hasRead }}</label></div>
                    </div>
                    <div id="general_section_register">
                        <ul id="general_errors_register" class="login-error"></ul>
                        <ul id="general_success_register" class="login-success"></ul>
                    </div>
                    <button id="register" @click="register">{{ content.register }}</button>
                </div>
            </div>
            <div id="user-form" class="form">
                <div id="user-welcome">{{ content.welcome }}<span id="user-welcome-id"></span>!</div>
                <button id="logout" @click="logout">{{ content.logout }}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {isLogged, loggedIn, disconnect} from "public/ts/checkLogin";

const nuxtApp = useNuxtApp();
let content = ref(nuxtApp.$content.login);
const langPrefix = ref(nuxtApp.$langPrefix);

onMounted(async () => {
    const userID = await isLogged();
    if (userID) {
        if (loggedIn) {
            document.getElementById("login-register-wrapper").style.display = "none";
            document.getElementById("user-form").style.display = "default";
            document.getElementById("user-welcome-id").innerHTML = userID;
        } else {
            document.getElementById("login-register-wrapper").style.display = "default";
            document.getElementById("user-form").style.display = "none";
        }
    } else {
        document.getElementById("login-register-wrapper").style.display = "default";
        document.getElementById("user-form").style.display = "none";
    }
    document.getElementById("forms-loading").style.display = "none";
    document.getElementById("forms-wrapper").style.display = "flex";
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
        location.href = langPrefix.value + "profile";
    } else {
        console.log("fail");
        if (Array.isArray(result.message)) {
            result.message.forEach(error => {
                const split = error.split(" ");
                const field = split[0];
                split.shift();

                const li = document.createElement("li");
                li.innerHTML = split.join(" ");

                if (Object.keys(errors).includes(field)) {
                    errors[field].appendChild(li);
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

    if (!document.getElementById("checkPolicy").checked || !document.getElementById("checkTOS").checked) {
        const li = document.createElement("li");
        li.innerHTML = content.value["consentNotGiven"];
        document.getElementById("general_errors_register").replaceChildren(li);
        return;
    }

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

const logout = async () => {
    const response = await fetch('https://api.ardeco.app/logout', {
        method: 'GET',
        credentials: 'include',
    });
    await disconnect();
    localStorage.removeItem('lang');
    const result = await response.text();
    console.log(result);
    location.href = langPrefix.value + "home";
}
</script>

<style scoped lang="scss">
#forms-container {
    margin-top: 4rem;
    margin-bottom: 1rem;
}

button {
    outline-style: solid;
    outline-width: thin;
}

#logout {
    outline-style: solid;
    outline-width: thin;
}

.gdpr_indication {
    text-decoration: underline;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    border-radius: 15px;
    padding: 25px;
    background-color: #f4f4f4;
    width: 30%;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3px;
        margin: 5px 0;
    }

    .typeTitle {
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        margin-top: -15px;
        margin-bottom: 5px;
    }

    .gdpr_consent {
        div {
            display: block;
            /*padding: 3px;
            margin: 5px 0;*/

            label {
                margin-left: 5px;
            }
        }
        margin-top: -3%;
        margin-bottom: -5%;
    }
}

#user-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    width: fit-content;
    align-self: center;

    div {
        display: block;
    }
}

#forms-wrapper {
    display: flex;
    flex-direction: column;
}

.mandatory_fields {
    background-color: #e0e0e0;
    border-radius: 15px;
}

.optional_fields {
    background-color: #e0e0e0;
    border-radius: 15px;
}

.login-register-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
}

.login-error {
    color: red;
}

.login-success {
    color: green;
}
</style>
