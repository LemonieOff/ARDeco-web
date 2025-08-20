<template>
    <Head>
        <Title>ARDeco - {{ content.title }}</Title>
    </Head>
    <div class="flex flex-col items-center justify-center">
        <h1 class="text-center font-bold text-xl md:text-4xl my-8">{{ content.title }}</h1>
        <p class="text-center mb-8">{{ content.text }}</p>
        <div
            class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-8 rounded-lg shadow-md w-80 sm:w-[32rem] lg:w-[48rem] mb-8">
            <div class="mb-4">
                <label class="block text-sm font-bold mb-2" for="email">
                    {{ content.email }} <span class="text-red-500">*</span>
                </label>
                <input id="email"
                       ref="fieldEmail"
                       v-model="emailVal"
                       :placeholder="content.placeholders.email"
                       class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight"
                       required
                       type="email"
                       @input="event => inputValidity(event.target! as HTMLInputElement)" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-bold mb-2" for="password">
                    {{ content.password }} <span class="text-red-500">*</span>
                </label>
                <div class="flex">
                    <input id="password"
                           ref="fieldPassword"
                           v-model="passwordVal"
                           :placeholder="content.placeholders.password"
                           :type="showPassword ? 'text' : 'password'"
                           class="shadow appearance-none border rounded w-11/12 py-2 px-3 leading-tight"
                           required
                           @input="event => inputValidity(event.target! as HTMLInputElement)" />
                    <Icon :name="`material-symbols:visibility-${showPassword ? '' : 'off-'}outline-rounded`"
                          class="inline-flex w-1/12 justify-center self-center cursor-pointer ml-2"
                          size="24"
                          @click="showPassword = !showPassword"
                    />
                </div>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-bold mb-2" for="passwordConfirm">
                    {{ content.passwordConfirm }} <span class="text-red-500">*</span>
                </label>
                <div class="flex">
                    <input id="passwordConfirm"
                           ref="fieldPasswordConfirm"
                           v-model="passwordConfirmVal"
                           :placeholder="content.placeholders.passwordConfirm"
                           :type="showPasswordConfirm ? 'text' : 'password'"
                           class="shadow appearance-none border rounded w-11/12 py-2 px-3 leading-tight"
                           required
                           @input="event => inputValidity(event.target! as HTMLInputElement)" />
                    <Icon :name="`material-symbols:visibility-${showPasswordConfirm ? '' : 'off-'}outline-rounded`"
                          class="inline-flex w-1/12 justify-center self-center cursor-pointer ml-2"
                          size="24"
                          @click="showPasswordConfirm = !showPasswordConfirm"
                    />
                </div>
            </div>
            <div class="flex justify-evenly">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click="cancel">
                    {{ content.buttons.cancel }}
                </button>
                <button
                    class="bg-[#9e1d1d] hover:bg-[#751717] text-white border-[#751717] font-bold py-2 px-4 rounded"
                    @click="deleteAccount">
                    {{ content.buttons.delete }}
                </button>
            </div>
        </div>
        <Notifications ref="notifications" />
    </div>
</template>

<script lang="ts" setup>
import Notifications from "@/components/Notifications.vue";
import { isLogged, loggedIn } from "@/public/ts/checkLogin";

const nuxtApp = useNuxtApp();
const langPrefix = nuxtApp.$langPrefix;
const content = nuxtApp.$content.deleteAccount;
const errors = nuxtApp.$content.errors;

const notifications = useTemplateRef("notifications");

const emailRef = useTemplateRef("fieldEmail");
const passwordRef = useTemplateRef("fieldPassword");
const passwordConfirmRef = useTemplateRef("fieldPasswordConfirm");

const emailVal = ref("");
const passwordVal = ref("");
const passwordConfirmVal = ref("");

const showPassword = ref(false);
const showPasswordConfirm = ref(false);

onMounted(async () => {
    await isLogged();
    if (!loggedIn) {
        location.href = langPrefix + "login?redirect=/deleteAccount";
    }
});

const inputValidity = (target: HTMLInputElement) => {
    target.checkValidity() ? target.classList.remove("invalid") : target.classList.add("invalid");
};

const cancel = () => {
    location.href = langPrefix + "profile";
};

const deleteAccount = () => {
    let errorsCount = 0;

    if (emailVal.value === "" || passwordVal.value === "" || passwordConfirmVal.value === "") {
        notifications.value?.showError(errors.fields.notFullyCompleted);
        errorsCount++;
    }

    if (passwordVal.value !== passwordConfirmVal.value) {
        notifications.value?.showError(errors.fields.passwordsDoNotMatch);
        errorsCount++;
    }

    if (!emailRef.value?.checkValidity()) {
        notifications.value?.showError(errors.fields.badFormattedEmail);
        errorsCount++;
    }

    if (errorsCount > 0) return;

    fetch("https://api.ardeco.app/close", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailVal.value,
            password: passwordVal.value,
            password_confirm: passwordConfirmVal.value
        }),
        credentials: "include"
    }).then((response) => response.json()).then((data) => {
        console.debug(data);
        if (data.code === 200) {
            location.href = langPrefix + "login";
        } else {
            if (data.data) {
                const [key, error]: ["user", keyof typeof errors.user] = data["data"].split("_");
                notifications.value?.showError(errors[key][error]);
            } else if (data.message) {
                notifications.value?.showError(data.message);
            } else {
                notifications.value?.showError(data);
            }
        }
    });
};
</script>
