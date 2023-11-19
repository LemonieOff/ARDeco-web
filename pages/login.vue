<script setup>
let loggedIn = false;

onMounted(async () => {
    const userID = localStorage.getItem("userID");
    if (userID) {
        const response = await fetch('https://api.ardeco.app/checkjwt/' + userID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        const result = await response.json();
        loggedIn = result["status"] === "OK";
        if (loggedIn) {
            console.log("Logged in");
            document.getElementById("login-form").style.display = "none";
            document.getElementById("user-form").style.display = "default";
            document.getElementById("user-welcome").innerHTML = "Welcome user N°" + userID + "!";
        } else {
            console.log("Not logged in");
            document.getElementById("login-form").style.display = "default";
            document.getElementById("user-form").style.display = "none";
        }
    } else {
        console.log("No local stored userID, not logged in");
        loggedIn = false;
        document.getElementById("login-form").style.display = "default";
        document.getElementById("user-form").style.display = "none";
    }
    document.getElementById("forms-loading").style.display = "none";
    document.getElementById("forms-wrapper").style.display = "block";
});

const login = async () => {
    const email_field = document.getElementById("email").value;
    const password_field = document.getElementById("password").value;

    const response = await fetch('https://api.ardeco.app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({email: email_field, password: password_field, deleted: false})
    });

    const result = await response.json();
    console.log(result);

    const email_errors = document.getElementById("email_errors");
    const password_errors = document.getElementById("password_errors");
    const general_errors = document.getElementById("general_errors");
    const general_success = document.getElementById("general_success");
    email_errors.innerHTML = "";
    password_errors.innerHTML = "";
    general_errors.innerHTML = "";
    general_success.innerHTML = "";

    if (result.status === "OK") {
        console.log("success");
        const li = document.createElement("li");
        li.innerHTML = result.description;
        general_success.appendChild(li);
        localStorage.setItem("userID", result.data["userID"]);
        location.reload();
    } else {
        console.log("fail");
        if (Array.isArray(result.message)) {
            result.message.forEach(error => {
                const li = document.createElement("li");
                li.innerHTML = error;

                const split = error.split(" ");
                if (split[0] === "email") {
                    email_errors.appendChild(li);
                } else if (split[0] === "password") {
                    password_errors.appendChild(li);
                } else {
                    general_errors.appendChild(li);
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
            general_errors.appendChild(li);
        } else {
            const li = document.createElement("li");
            if (result.message) {
                li.innerHTML = result.message;
            } else if (result.description) {
                li.innerHTML = result.description;
            } else {
                li.innerHTML = "Unknown error";
            }
            general_errors.appendChild(li);
        }
    }
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

    const result = await response.text();
    console.log(result);
    loggedIn = false;
    localStorage.removeItem("userID");
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
                        <label for="email">Email : </label><input type="text" id="email_login" name="email" placeholder="Email">
                        <ul id="email_errors_login" class="login-error"></ul>
                    </div>
                    <div id="password_section_login">
                        <label for="password">Password : </label><input type="password" id="password_login" name="password"
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
                        <label for="email">Email : </label><input type="text" id="email_register" name="email" placeholder="Email">
                        <ul id="email_errors_register" class="login-error"></ul>
                    </div>
                    <div id="password_section_register">
                        <label for="password">Password : </label><input type="password" id="password_register" name="password"
                                                                        placeholder="Password">
                        <ul id="password_errors_register" class="login-error"></ul>
                    </div>
                    <div id="password_confirm_section_register">
                        <label for="password_confirm_register">Password confirm : </label><input type="password" id="password_confirm_register" name="password_confirm"
                                                                        placeholder="Password">
                        <ul id="password_confirm_errors_register" class="login-error"></ul>
                    </div>
                    <div id="first_name_section_register">
                        <label for="first_name_register">First name : </label><input type="text" id="first_name_register" name="first_name" placeholder="Hugo">
                        <ul id="first_name_errors_register" class="login-error"></ul>
                    </div>
                    <div id="last_name_section_register">
                        <label for="last_name_register">Last name : </label><input type="text" id="last_name_register" name="last_name" placeholder="BECART">
                        <ul id="last_name_errors_register" class="login-error"></ul>
                    </div>
                    <div id="city_section_register">
                        <label for="city_register">City : </label><input type="text" id="city_register" name="city" placeholder="Berlin">
                        <ul id="city_errors_register" class="login-error"></ul>
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
