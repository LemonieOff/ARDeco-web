<template>
    <div id="profile-container">
        <h1 class="text-center font-bold text-xl md:text-4xl my-8">{{ content.title }}</h1>
        <p class="warning-text">{{ content.text }}</p>
        <div class="profile-wrapper">
            <div class="profile-elements-wrapper">
                <div class="element">{{ content.email }}</div>
                <input id="email" ref="fieldEmail" :placeholder="`${content.placeholders.email}`" class="element2"
                       type="email" />
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">{{ content.password }}</div>
                <input id="password" ref="fieldPassword" :placeholder="`${content.placeholders.password}`"
                       class="element2"
                       type="password" />
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">{{ content.passwordConfirm }}</div>
                <input id="passwordConfirm" ref="fieldPasswordConfirm"
                       :placeholder="`${content.placeholders.passwordConfirm}`"
                       class="element2" type="password" />
            </div>
            <div id="errors" ref="errorsDiv" class="profile-elements-wrapper"></div>
            <div class="delete-actions-buttons-wrapper">
                <button id="cancelButton" class="cancelButton" @click="cancel">{{ content.buttons.cancel }}</button>
                <button id="deleteAccountButton" class="deleteAccountButton" @click="deleteAccount">
                    {{ content.buttons.delete }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { isLogged, loggedIn } from "public/ts/checkLogin";
import type { ShallowRef } from "vue";
import fr from "@/src/lang/fr.json";

const nuxtApp = useNuxtApp();
const langPrefix = ref(nuxtApp.$langPrefix);
let content = ref(nuxtApp.$content.deleteAccount);
let errors = ref(nuxtApp.$content.errors);

const fieldEmail: ShallowRef<HTMLInputElement | null> = useTemplateRef("fieldEmail");
const fieldPassword: ShallowRef<HTMLInputElement | null> = useTemplateRef("fieldPassword");
const fieldPasswordConfirm: ShallowRef<HTMLInputElement | null> = useTemplateRef("fieldPasswordConfirm");
const errorsDiv: ShallowRef<HTMLDivElement> = useTemplateRef("errorsDiv") as ShallowRef<HTMLDivElement>;

const cancel = () => {
    location.href = nuxtApp.$langPrefix + "profile";
};

const deleteAccount = () => {
    const email = fieldEmail.value ? fieldEmail.value.value : "";
    const password = fieldPassword.value ? fieldPassword.value.value : "";
    const passwordConfirm = fieldPasswordConfirm.value ? fieldPasswordConfirm.value.value : "";

    if (email === "" || password === "" || passwordConfirm === "") {
        errorsDiv.value.innerHTML = `<p class="error">${errors.value.fields.notFullyCompleted}</p>`;
        return;
    }

    if (password !== passwordConfirm) {
        errorsDiv.value.innerHTML = `<p class="error">${errors.value.fields.passwordsDoNotMatch}</p>`;
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
                const [key, error]: ["user", keyof typeof fr.errors.user] = data["data"].split("_");
                errorsDiv.value.innerHTML = `<p class="error">${errors.value[key][error]}</p>`;
            } else if (data.message) {
                errorsDiv.value.innerHTML = `<p class="error">${data.message}</p>`;
            } else {
                errorsDiv.value.innerHTML = `<p class="error">${data}</p>`;
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
