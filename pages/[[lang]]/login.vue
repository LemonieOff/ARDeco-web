<template>
    <div class="mt-8 mb-4">
        <div v-if="loading"
             class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-6 w-1/3 mx-auto text-center rounded-lg">
            {{ content.loading }}
        </div>
        <div v-else-if="userID" id="user-form">
            <div id="user-welcome">{{ content.welcome }}<span>{{ userID }}</span>!</div>
            <button id="logout" @click="logout">{{ content.logout }}</button>
        </div>
        <div v-else class="flex items-center justify-center">
            <div
                class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-8 rounded-lg shadow-md w-80 md:w-[32rem] lg:w-[48rem]">
                <div class="w-full inline-flex items-center justify-evenly pb-8">
                    <span class="pr-8">{{ content.loginTitle }}</span>
                    <label for="formSwitcher" class="relative inline-flex justify-center cursor-pointe">
                        <input id="formSwitcher" type="checkbox" class="sr-only peer" v-model="activeForm"
                               true-value="register" false-value="login" />
                        <span
                            class="relative w-[3.25rem] h-7 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></span>
                    </label>
                    <span class="pl-8">{{ content.registerTitle }}</span>
                </div>

                <div class="mb-4">
                    <label for="loginEmail" class="block text-sm font-bold mb-2">
                        {{ content.email }} <span class="text-red-500">*</span>
                    </label>
                    <input type="email"
                           id="loginEmail"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           :placeholder="content.placeholders.email"
                           required
                           ref="fieldEmail" />
                </div>
                <div class="mb-4">
                    <label for="loginPassword" class="block text-sm font-bold mb-2">
                        {{ content.password }} <span class="text-red-500">*</span>
                    </label>
                    <input type="password"
                           id="loginPassword"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           :placeholder="content.placeholders.password"
                           required
                           ref="fieldPassword" />
                </div>
                <div class="mb-4" v-show="activeForm === 'login'">
                    <input type="checkbox" id="rememberMe" class="mr-2" ref="loginFieldRememberMe" />
                    <label for="rememberMe" class="text-sm">Remember me</label>
                </div>
                <div class="flex justify-center">
                    <button v-show="activeForm === 'login'" @click="login"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {{ content.login }}
                    </button>
                </div>
                <div class="mb-4" v-show="activeForm === 'register'">
                    <label for="firstName" class="block text-sm font-bold mb-2">
                        {{ content.firstName }} <span class="text-red-500">*</span>
                    </label>
                    <input type="text"
                           id="firstName"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           :placeholder="content.placeholders.firstName"
                           ref="fieldFirstName"
                           required />
                </div>
                <div class="mb-4" v-show="activeForm === 'register'">
                    <label for="lastName" class="block text-sm font-bold mb-2">{{ content.lastName }}</label>
                    <input type="text"
                           id="lastName"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           :placeholder="content.placeholders.lastName"
                           ref="fieldLastName" />
                </div>
                <div class="mb-4" v-show="activeForm === 'register'">
                    <label for="city" class="block text-sm font-bold mb-2">{{ content.city }}</label>
                    <input type="text"
                           id="city"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           :placeholder="content.placeholders.city"
                           ref="fieldCity" />
                </div>
                <div class="mb-4" v-show="activeForm === 'register'">
                    <label for="phoneNumber" class="block text-sm font-bold mb-2">{{ content.phone }}</label>
                    <input type="tel"
                           id="phoneNumber"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           :placeholder="content.placeholders.phone"
                           ref="fieldPhone" />
                </div>
                <div class="mb-4" v-show="activeForm === 'register'">
                    <input type="checkbox" id="privacyConsent" class="mr-2" required ref="fieldPrivacy" />
                    <label for="privacyConsent" class="text-sm">
                        I agree to the <a href="#" class="text-blue-500 hover:underline">Privacy Policy</a>
                    </label>
                </div>
                <div class="mb-4" v-show="activeForm === 'register'">
                    <input type="checkbox" id="tosConsent" class="mr-2" required ref="fieldCgu" />
                    <label for="tosConsent" class="text-sm">
                        I agree to the <a href="#" class="text-blue-500 hover:underline">Terms of Service</a>
                    </label>
                </div>
                <div v-if="activeForm === 'register' && noConsent" class="text-red-600">
                    {{ content.consentNotGiven }}
                </div>
                <input type="hidden" ref="fieldBot" />
                <div class="flex justify-center">
                    <button @click="register" v-show="activeForm === 'register'"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {{ content.register }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { disconnect, isLogged } from "public/ts/checkLogin";
import type { ShallowRef } from "vue";

const nuxtApp = useNuxtApp();
const content = ref(nuxtApp.$content.login);
const langPrefix = ref(nuxtApp.$langPrefix);
const userID = ref<number | null>();
const loading = ref(true);

const activeForm = ref("login");

const fieldEmail: ShallowRef<HTMLInputElement | null> = useTemplateRef("fieldEmail");
const fieldPassword: ShallowRef<HTMLInputElement | null> = useTemplateRef("fieldPassword");
const fieldFirstName: ShallowRef<HTMLInputElement | null> = useTemplateRef("fieldFirstName");
const fieldLastName: ShallowRef<HTMLInputElement | null> = useTemplateRef("fieldLastName");
const fieldCity: ShallowRef<HTMLInputElement | null> = useTemplateRef("fieldCity");
const fieldPhone: ShallowRef<HTMLInputElement | null> = useTemplateRef("fieldPhone");
const fieldPrivacy: ShallowRef<HTMLInputElement | null> = useTemplateRef("fieldPrivacy");
const fieldCgu: ShallowRef<HTMLInputElement | null> = useTemplateRef("fieldCgu");
const fieldBot: ShallowRef<HTMLInputElement | null> = useTemplateRef("fieldBot");

const noConsent = ref(false);

onMounted(async () => {
    userID.value = await isLogged();
    loading.value = false;
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
    };
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
};

const validateLogin = (): Boolean => {
    let errors = 0;
    if (!fieldEmail.value?.checkValidity()) errors++;
    if (!fieldPassword.value?.checkValidity()) errors++;
    return errors === 0;
};

const login = async () => {
    if (!validateLogin()) return;

    const response = await fetch("https://api.ardeco.app/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email: fieldEmail.value?.value, password: fieldPassword.value?.value })
    });

    const result = await response.json();
    console.log(result);

    if (result.status === "OK") {
        localStorage.setItem("userID", result.data["userID"]);
        localStorage.setItem("role", result.data["role"]);
        location.reload();
        // location.href = langPrefix.value + "profile";
    }

    // displayHTMLErrors(result, response, "login");
};

const validateRegister = (): Boolean => {
    let errors = 0;
    if (!fieldEmail.value?.checkValidity()) errors++;
    if (!fieldPassword.value?.checkValidity()) errors++;
    if (!fieldPassword.value?.checkValidity()) errors++;
    if (!fieldFirstName.value?.checkValidity()) errors++;
    if (!fieldPrivacy.value?.checkValidity() || !fieldCgu.value?.checkValidity()) {
        noConsent.value = true;
        errors++;
    } else {
        noConsent.value = false;
    }
    return errors === 0;
};

const register = async () => {
    if (!validateRegister()) return;

    const response = await fetch("https://api.ardeco.app/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            email: fieldEmail.value?.value,
            password: fieldPassword.value?.value,
            password_confirm: fieldPassword.value?.value,
            first_name: fieldFirstName.value?.value,
            last_name: fieldLastName.value?.value,
            city: fieldCity.value?.value,
            phone: fieldPhone.value?.value
        })
    });

    const result = await response.json();
    console.log(result);

    if (result.status === "OK") {
        localStorage.setItem("userID", result.data["id"]);
        localStorage.setItem("role", result.data["role"]);
        location.reload();
        // location.href = langPrefix.value + "profile";
    }

    // displayHTMLErrors(result, response, "register");
};

const logout = async () => {
    const response = await fetch("https://api.ardeco.app/logout", {
        method: "GET",
        credentials: "include"
    });
    await disconnect();
    localStorage.removeItem("lang");
    const result = await response.text();
    console.log(result);
    location.href = langPrefix.value + "home";
};
</script>

<style scoped lang="scss">
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

#login-register-wrapper {
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
