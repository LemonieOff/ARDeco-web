<script setup>
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
            <div id="login-form" class="form">
                <div id="email_section">
                    <label for="email">Email : </label><input type="text" id="email" name="email" placeholder="Email">
                    <ul id="email_errors" class="login-error"></ul>
                </div>
                <div id="password_section">
                    <label for="password">Password : </label><input type="password" id="password" name="password"
                                                                    placeholder="Password">
                    <ul id="password_errors" class="login-error"></ul>
                </div>
                <div id="general_section">
                    <ul id="general_errors" class="login-error"></ul>
                    <ul id="general_success" class="login-success"></ul>
                </div>
                <button @click="login">Login</button>
            </div>
            <div id="user-form" class="form">
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

.login-error {
    color: red;
}

.login-success {
    color: green;
}
</style>
