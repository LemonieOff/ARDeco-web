<template>
    <Head>
        <Title>ARDeco - {{ content.loginTitle }}</Title>
    </Head>
    <div class="mt-8 mb-4">
        <div v-if="loading"
             class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-6 w-1/3 mx-auto text-center rounded-lg">
            {{ content.loading }}
        </div>
        <div v-else-if="userID" id="user-form">
            <div id="user-welcome">{{ content.welcome }}<span>{{ userID }}</span>!</div>
            <button id="logout" @click="logoutUser">{{ content.logout }}</button>
        </div>
        <div v-else class="flex items-center justify-center">
            <div
                class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-8 rounded-lg shadow-md w-80 md:w-[32rem] lg:w-[48rem]">
                <div class="w-full inline-flex items-center justify-evenly pb-8">
                    <span :class="activeForm === 'login' ? 'font-extrabold underline' : 'cursor-pointer'" class="pr-8"
                          @click="activeForm = 'login'">
                        {{ content.loginTitle }}
                    </span>
                    <label class="relative inline-flex justify-center cursor-pointe" for="formSwitcher">
                        <input id="formSwitcher" v-model="activeForm" class="sr-only peer" false-value="login"
                               true-value="register" type="checkbox" />
                        <span
                            class="relative w-[3.25rem] h-7 bg-teal-600 hover:bg-teal-700 peer-focus:outline-0 peer-focus:ring-transparent rounded-full transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-pink-500 hover:peer-checked:bg-pink-600"></span>
                    </label>
                    <span :class="activeForm === 'register' ? 'font-extrabold underline' : 'cursor-pointer'"
                          class="pl-8"
                          @click="activeForm = 'register'">
                        {{ content.registerTitle }}
                    </span>
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="loginEmail">
                        {{ content.email }} <span class="text-red-500">*</span>
                    </label>
                    <input id="loginEmail"
                           ref="fieldEmail"
                           :placeholder="content.placeholders.email"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight"
                           required
                           type="email"
                           @input="event => inputValidity(event.target! as HTMLInputElement)" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="loginPassword">
                        {{ content.password }} <span class="text-red-500">*</span>
                    </label>
                    <div class="flex">
                        <input id="loginPassword"
                               ref="fieldPassword"
                               :placeholder="content.placeholders.password"
                               :type="hiddenPassword ? 'password' : 'text'"
                               class="shadow appearance-none border rounded w-11/12 py-2 px-3 leading-tight"
                               required
                               @input="event => inputValidity(event.target! as HTMLInputElement)" />
                        <Icon :name="`material-symbols:visibility-${hiddenPassword ? 'off-' : ''}outline-rounded`"
                              class="inline-flex w-1/12 justify-center self-center cursor-pointer ml-2"
                              size="24"
                              @click="hiddenPassword = !hiddenPassword"
                        />
                    </div>
                </div>
                <div v-show="activeForm === 'login'" class="mb-4">
                    <input id="rememberMe" ref="loginFieldRememberMe" class="mr-2" type="checkbox" />
                    <label class="text-sm" for="rememberMe">{{ content.rememberMe }}</label>
                </div>
                <div class="flex justify-center">
                    <button v-show="activeForm === 'login'"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            @click="login">
                        {{ content.login }}
                    </button>
                </div>
                <div v-show="activeForm === 'register'" class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="firstName">
                        {{ content.firstName }} <span class="text-red-500">*</span>
                    </label>
                    <input id="firstName"
                           ref="fieldFirstName"
                           :placeholder="content.placeholders.firstName"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight"
                           required
                           type="text"
                           @input="event => inputValidity(event.target! as HTMLInputElement)" />
                </div>
                <div v-show="activeForm === 'register'" class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="lastName">{{ content.lastName }}</label>
                    <input id="lastName"
                           ref="fieldLastName"
                           :placeholder="content.placeholders.lastName"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           type="text" />
                </div>
                <div v-show="activeForm === 'register'" class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="city">{{ content.city }}</label>
                    <input id="city"
                           ref="fieldCity"
                           :placeholder="content.placeholders.city"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           type="text" />
                </div>
                <div v-show="activeForm === 'register'" class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="phoneNumber">{{ content.phone }}</label>
                    <input id="phoneNumber"
                           ref="fieldPhone"
                           :placeholder="content.placeholders.phone"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           type="tel" />
                </div>
                <div v-show="activeForm === 'register'" class="mb-4">
                    <input id="tosConsent" ref="fieldCgu" class="mr-2" required type="checkbox" />
                    <label class="text-sm" for="tosConsent">
                        {{ content.agreementCgu[0] }} <a :href="`${langPrefix}cgu`"
                                                         class="text-blue-500 hover:underline"
                                                         target="_blank">{{ content.agreementCgu[1]
                        }}</a> <span class="text-red-500">*</span>
                    </label>
                </div>
                <div v-show="activeForm === 'register'" class="mb-4">
                    <input id="privacyConsent" ref="fieldPrivacy" class="mr-2" required type="checkbox" />
                    <label class="text-sm" for="privacyConsent">
                        {{ content.agreementPrivacy[0] }} <a :href="`${langPrefix}privacy-policy`"
                                                             class="text-blue-500 hover:underline"
                                                             target="_blank">{{ content.agreementPrivacy[1]
                        }}</a> <span class="text-red-500">*</span>
                    </label>
                </div>
                <div v-if="activeForm === 'register' && noConsent" class="text-red-600">
                    {{ content.consentNotGiven }}
                </div>
                <input ref="fieldBot" type="hidden" />
                <div class="flex justify-center">
                    <button v-show="activeForm === 'register'"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            @click="register">
                        {{ content.register }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <Notifications ref="notifications" />
</template>

<script lang="ts" setup>
import { isLogged, logout } from "@/public/ts/checkLogin";
import Notifications from "@/components/Notifications.vue";

const nuxtApp = useNuxtApp();
const content = nuxtApp.$content.login;
const notificationsContent = nuxtApp.$content.notifications;
const langPrefix = nuxtApp.$langPrefix;
const userID = ref<number | null>();
const loading = ref(true);

const activeForm = ref("login");

const notifications = ref();

const fieldEmail = useTemplateRef("fieldEmail");
const fieldPassword = useTemplateRef("fieldPassword");
const fieldFirstName = useTemplateRef("fieldFirstName");
const fieldLastName = useTemplateRef("fieldLastName");
const fieldCity = useTemplateRef("fieldCity");
const fieldPhone = useTemplateRef("fieldPhone");
const fieldPrivacy = useTemplateRef("fieldPrivacy");
const fieldCgu = useTemplateRef("fieldCgu");
const fieldBot = useTemplateRef("fieldBot");

const noConsent = ref(false);
const hiddenPassword = ref(true);

const route = useRoute();
const redirectUrl = ref(langPrefix + "profile");

onMounted(async () => {
    userID.value = await isLogged();
    loading.value = false;

    if (route.query["redirect"] && route.query["redirect"] !== "") {
        redirectUrl.value = route.query["redirect"] as string;
    }
    console.debug("redirect", redirectUrl);
});

const inputValidity = (target: HTMLInputElement) => {
    target.checkValidity() ? target.classList.remove("invalid") : target.classList.add("invalid");
};

const validateLogin = (): Boolean => {
    let errors = 0;
    if (!fieldEmail.value?.checkValidity()) {
        notifications.value?.showError(notificationsContent.login.missingEmail);
        errors++;
    }
    if (!fieldPassword.value?.checkValidity()) {
        notifications.value?.showError(notificationsContent.login.missingPassword);
        errors++;
    }
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
    console.debug(result);

    try {
        if (result.status === "OK") {
            localStorage.setItem("userID", result.data["userID"]);
            localStorage.setItem("role", result.data["role"]);
            location.href = redirectUrl.value;
            return;
        }
        if (result.description === "Wrong email or password") {
            notifications.value?.showError(notificationsContent.login.invalid);
            return;
        }
        notifications.value?.showError(notificationsContent.loginFailed);
    } catch (e) {
        console.error(e);
        notifications.value?.showError(notificationsContent.loginFailed);
    }
};

const validateRegister = (): Boolean => {
    let errors = 0;
    if (!fieldEmail.value?.checkValidity()) {
        notifications.value?.showError(notificationsContent.register.missingEmail);
        errors++;
    }
    if (!fieldPassword.value?.checkValidity()) {
        notifications.value?.showError(notificationsContent.register.missingPassword);
        errors++;
    }
    if (!fieldFirstName.value?.checkValidity()) {
        notifications.value?.showError(notificationsContent.register.missingFirstName);
        errors++;
    }
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
    console.debug(result);

    try {
        if (result.status === "OK") {
            localStorage.setItem("userID", result.data["id"]);
            localStorage.setItem("role", result.data["role"]);
            location.reload();
            location.href = redirectUrl.value;
            return;
        }
        if (result.description === "E-mail already in use") {
            notifications.value?.showError(notificationsContent.register.emailAlreadyInUse);
            return;
        }
        notifications.value?.showError(notificationsContent.registrationFailed);
    } catch (e) {
        console.error(e);
        notifications.value?.showError(notificationsContent.registrationFailed);
    }
};

const logoutUser = async () => {
    await fetch("https://api.ardeco.app/logout", {
        method: "GET",
        credentials: "include"
    });
    logout();
    location.reload();
};
</script>

<style lang="scss" scoped>
#logout {
    outline-style: solid;
    outline-width: thin;
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
</style>
