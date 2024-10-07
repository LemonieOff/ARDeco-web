<template>
    <div id="profile-container">
        <h1 class="text-center font-bold text-xl md:text-4xl my-8">{{ content.title }}</h1>
        <p class="warning-text">{{ content.text }}</p>
        <div class="profile-wrapper">
            <div class="profile-elements-wrapper">
                <div class="element">{{ content.email }}</div>
                <input id="email" :placeholder="`${content.placeholders.email}`" class="element2" type="email" />
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">{{ content.password }}</div>
                <input id="password" :placeholder="`${content.placeholders.password}`" class="element2"
                       type="password" />
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">{{ content.passwordConfirm }}</div>
                <input id="passwordConfirm" :placeholder="`${content.placeholders.passwordConfirm}`" class="element2"
                       type="password" />
            </div>
            <div id="errors" class="profile-elements-wrapper"></div>
            <div class="delete-actions-buttons-wrapper">
                <button id="cancelButton" class="cancelButton" @click="cancel">{{ content.buttons.cancel }}</button>
                <button id="deleteAccountButton" class="deleteAccountButton" @click="deleteAccount">
                    {{ content.buttons.delete }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { isLogged, loggedIn } from "public/ts/checkLogin";
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import { onMounted, ref } from "vue";

const nuxtApp = useNuxtApp();
let content = ref(nuxtApp.$lang === "en" ? en.deleteAccount : fr.deleteAccount);
let errors = ref(nuxtApp.$lang === "en" ? en.errors : fr.errors);

const cancel = () => {
    location.href = nuxtApp.$langPrefix + "profile";
};

const deleteAccount = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    if (email === "" || password === "" || passwordConfirm === "") {
        document.getElementById("errors").innerHTML = `<p class="error">${errors.value["fields"]["notFullyCompleted"]}</p>`;
        return;
    }

    if (password !== passwordConfirm) {
        document.getElementById("errors").innerHTML = `<p class="error">${errors.value["fields"]["passwordsDoNotMatch"]}</p>`;
        return;
    }

    fetch("https://api.ardeco.app/close", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
            password_confirm: passwordConfirm
        }),
        credentials: "include"
    }).then((response) => response.json()).then((data) => {
        console.log(data);
        if (data.code === 200) {
            location.href = langPrefix.value + "login";
        } else {
            if (data.data) {
                const error = data.data.split("_");
                document.getElementById("errors").innerHTML = `<p class="error">${errors.value[error[0]][error[1]]}</p>`;
            } else if (data.message) {
                document.getElementById("errors").innerHTML = `<p class="error">${data.message}</p>`;
            } else {
                document.getElementById("errors").innerHTML = `<p class="error">${data}</p>`;
            }
        }
    });
};

onMounted(async () => {
    await isLogged();
    if (!loggedIn) {
        location.href = nuxtApp.$langPrefix + "login?redirect=/deleteAccount";
    }
});
</script>

<style lang="scss" scoped>
.title {
    text-align: center;
    margin-top: 4rem;
    font-size: 2rem;
    font-weight: bold;
}

.warning-text {
    text-align: center;
    margin-top: 1.5rem;
}

#errors {
    display: block;
    color: red;
    text-align: center;
}

.profile-wrapper {
    margin-left: 20%;
    margin-top: 2%;
    background-color: #F4F4F4;
    border-radius: 20px;
    width: 60%;
    height: 20%;
}

.profile-elements-wrapper {
    display: flex;
    padding: 1%;
    text-align: center;
}

.delete-actions-buttons-wrapper {
    display: flex;
    justify-content: center;
    padding: 3%;
}

.cancelButton {
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

#cancelButton {
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
