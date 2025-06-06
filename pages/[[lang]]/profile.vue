<template>
    <Head>
        <Title>ARDeco - {{ content.title.profile }}</Title>
    </Head>
    <div class="mt-8 mb-4">
        <div v-if="loading"
             class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-6 w-1/3 mx-auto text-center rounded-lg">
            {{ content.loading }}
        </div>
        <div v-else class="flex flex-col items-center justify-center">
            <ProfilePicture :profile=profile />

            <div
                class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-8 rounded-lg shadow-md w-80 sm:w-[32rem] lg:w-[48rem] mb-8">
                <h2 class="mb-4 font-bold text-xl">{{ content.title.personalInformation }}</h2>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="email">
                        {{ content.informations.email }} <span class="text-red-500">*</span>
                    </label>
                    <input id="email"
                           ref="fieldEmail"
                           v-model="emailVal"
                           :placeholder="content.placeholders.email"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           required
                           type="email" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="firstName">
                        {{ content.informations.firstName }} <span class="text-red-500">*</span>
                    </label>
                    <input id="firstName"
                           ref="fieldFirstName"
                           v-model="firstNameVal"
                           :placeholder="content.placeholders.firstName"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           required
                           type="text" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="lastName">{{ content.informations.lastName
                        }}</label>
                    <input id="lastName"
                           ref="fieldLastName"
                           v-model="lastNameVal"
                           :placeholder="content.placeholders.lastName"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           type="text" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="city">{{ content.informations.city }}</label>
                    <input id="city"
                           ref="fieldCity"
                           v-model="cityVal"
                           :placeholder="content.placeholders.city"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           type="text" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="phoneNumber">{{ content.informations.phone
                        }}</label>
                    <input id="phoneNumber"
                           ref="fieldPhone"
                           v-model="phoneVal"
                           :placeholder="content.placeholders.phone"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           type="tel" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2"
                           for="fieldRole">{{ content.informations.role }}</label>
                    <input
                        id="fieldRole"
                        :value="roleVal"
                        class="shadow appearance-none border rounded min-w-full py-2 px-3 leading-tight cursor-not-allowed"
                        disabled readonly />
                </div>
                <div v-show="showPersonalInfoButtons" class="flex justify-evenly">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        @click="resetPersonalData">
                        {{ content.buttons.reset }}
                    </button>
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        @click="editPersonalData">
                        {{ content.buttons.confirm }}
                    </button>
                </div>
            </div>
            <div
                class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-8 rounded-lg shadow-md w-80 sm:w-[32rem] lg:w-[48rem] mb-8">
                <h2 class="mb-4 font-bold text-xl">{{ content.title.galleries }}</h2>
                <div class="mb-4 flex flex-col md:flex-row justify-between">
                    <div class="flex flex-col md:w-5/12 mb-4 md:mb-0">
                        <span class="block text-sm font-bold mb-2">
                        {{ content.gallery.personal }}
                        </span>
                        <!--<a :href="`${langPrefix}personalGallery`"
                               class="shadow border border-card-border dark:border-card-border-dark rounded py-2 px-3 leading-tight max-w-full text-nowrap overflow-hidden text-ellipsis bg-card-background dark:bg-card-background-dark text-AR-Grey dark:text-card-text-dark transition transform hover:bg-AR-Light-Blue dark:hover:bg-AR-Blue hover:-translate-y-1 hover:shadow-xl">
                                personal
                        </a>-->
                        <span
                            class="shadow border border-card-border dark:border-card-border-dark rounded py-2 px-3 leading-tight max-w-full text-nowrap overflow-hidden text-ellipsis">
                            {{ personalGalleries }}
                        </span>
                    </div>
                    <div class="flex flex-col md:w-5/12">
                        <span class="block text-sm font-bold mb-2">
                        {{ content.gallery.public }}
                        </span>
                        <a :href="`${langPrefix}gallery`"
                           class="shadow border border-card-border dark:border-card-border-dark rounded py-2 px-3 leading-tight max-w-full text-nowrap overflow-hidden text-ellipsis bg-card-background dark:bg-card-background-dark text-AR-Grey dark:text-card-text-dark transition transform hover:bg-AR-Light-Blue dark:hover:bg-AR-Blue hover:-translate-y-1 hover:shadow-xl">
                            {{ content.buttons.access }}
                        </a>
                    </div>
                </div>
            </div>
            <div
                class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-8 rounded-lg shadow-md w-80 sm:w-[32rem] lg:w-[48rem] mb-8">
                <h2 class="mb-4 font-bold text-xl">{{ content.title.favorites }}</h2>
                <div class="mb-4 flex flex-col md:flex-row justify-between">
                    <div class="flex flex-col md:w-5/12 mb-4 md:mb-0">
                        <span class="block text-sm font-bold mb-2">
                        {{ content.favorite.gallery }}
                        </span>
                        <a :href="`${langPrefix}favGallery`"
                           class="shadow border border-card-border dark:border-card-border-dark rounded py-2 px-3 leading-tight max-w-full text-nowrap overflow-hidden text-ellipsis bg-card-background dark:bg-card-background-dark text-AR-Grey dark:text-card-text-dark transition transform hover:bg-AR-Light-Blue dark:hover:bg-AR-Blue hover:-translate-y-1 hover:shadow-xl">
                            {{ content.buttons.access }}
                        </a>
                    </div>
                    <div class="flex flex-col md:w-5/12">
                        <span class="block text-sm font-bold mb-2">
                        {{ content.favorite.furniture }}
                        </span>
                        <a :href="`${langPrefix}favFurniture`"
                           class="shadow border border-card-border dark:border-card-border-dark rounded py-2 px-3 leading-tight max-w-full text-nowrap overflow-hidden text-ellipsis bg-card-background dark:bg-card-background-dark text-AR-Grey dark:text-card-text-dark transition transform hover:bg-AR-Light-Blue dark:hover:bg-AR-Blue hover:-translate-y-1 hover:shadow-xl">
                            {{ content.buttons.access }}
                        </a>
                    </div>
                </div>
            </div>
            <div
                class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-8 rounded-lg shadow-md w-80 sm:w-[32rem] lg:w-[48rem] mb-8">
                <h2 class="mb-4 font-bold text-xl">{{ content.title.orders }}</h2>
                <div class="flex flex-col w-12/12 mb-4 md:mb-0">
                        <span class="block text-sm font-bold mb-2">
                        {{ content.orderHistory }}
                        </span>
                    <a :href="`${langPrefix}orderHistory`"
                       class="shadow border border-card-border dark:border-card-border-dark rounded py-2 px-3 leading-tight max-w-full text-nowrap overflow-hidden text-ellipsis bg-card-background dark:bg-card-background-dark text-AR-Grey dark:text-card-text-dark transition transform hover:bg-AR-Light-Blue dark:hover:bg-AR-Blue hover:-translate-y-1 hover:shadow-xl">
                        {{ orders }} {{ orders > 1 ? content.orderMul : content.orderSing }}
                    </a>
                </div>
            </div>
            <div
                class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-8 rounded-lg shadow-md w-80 sm:w-[32rem] lg:w-[48rem] mb-8">
                <h2 class="mb-4 font-bold text-xl">{{ content.title.changePassword }}</h2>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="password">
                        {{ content.informations.password }}
                    </label>
                    <div class="flex">
                        <input id="password"
                               ref="fieldPassword"
                               v-model="passwordVal"
                               :placeholder="content.placeholders.password"
                               :type="hiddenPassword ? 'password' : 'text'"
                               class="shadow appearance-none border rounded w-11/12 py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500" />
                        <Icon :name="`material-symbols:visibility-${hiddenPassword ? 'off-' : ''}outline-rounded`"
                              class="inline-flex w-1/12 justify-center self-center cursor-pointer ml-2"
                              size="24"
                              @click="hiddenPassword = !hiddenPassword"
                        />
                    </div>
                </div>
                <div v-show="passwordVal.length > 0" class="flex justify-evenly">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        @click="passwordVal = ''">
                        {{ content.buttons.cancel }}
                    </button>
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        @click="editPassword">
                        {{ content.buttons.confirm }}
                    </button>
                </div>
            </div>
            <div
                class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-8 rounded-lg shadow-md w-80 sm:w-[32rem] lg:w-[48rem]">
                <h2 class="mb-4 font-bold text-xl">{{ content.title.confidentiality }}</h2>
                <div class="mb-4 flex flex-col md:flex-row justify-between">
                    <div class="flex flex-col md:w-5/12 mb-4 md:mb-0">
                        <span class="block text-sm font-bold mb-2">
                        {{ content.blockedUsers }}
                        </span>
                        <a :href="`${langPrefix}blockedUsers`"
                           class="shadow border border-card-border dark:border-card-border-dark rounded py-2 px-3 leading-tight max-w-full text-nowrap overflow-hidden text-ellipsis bg-card-background dark:bg-card-background-dark text-AR-Grey dark:text-card-text-dark transition transform hover:bg-AR-Light-Blue dark:hover:bg-AR-Blue hover:-translate-y-1 hover:shadow-xl">
                            {{ content.buttons.access }}
                        </a>
                    </div>
                    <div class="flex flex-col md:w-5/12">
                        <span class="block text-sm font-bold mb-2">
                        {{ content.buttons.delete }}
                        </span>
                        <a :href="`${langPrefix}deleteAccount`"
                           class="shadow border border-card-border dark:border-card-border-dark rounded py-2 px-3 leading-tight max-w-full text-nowrap overflow-hidden text-ellipsis bg-red-200 dark:bg-red-300 text-red-800 dark:text-red-900 transition transform hover:bg-red-300 dark:hover:bg-red-400 hover:-translate-y-1 hover:shadow-xl">
                            {{ content.buttons.access }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Notifications ref="notifications" />
</template>

<script lang="ts" setup>
import { isLogged, logout, userID } from "public/ts/checkLogin";
import Notifications from "@/components/Notifications.vue";
import ProfilePicture from "~/components/UserProfile/ProfilePicture.vue";

const nuxtApp = useNuxtApp();

const content = nuxtApp.$content.profile;
const notificationsMessages = nuxtApp.$content.notifications;
const roles = nuxtApp.$content.values.roles;
const userId = ref(0);
const loading = ref(true);
const hiddenPassword = ref(true);
const langPrefix = nuxtApp.$langPrefix;
const profile = ref<{
    id: number;
    email: string,
    firstname: string,
    lastname: string,
    city: string,
    phone: string,
    role: string,
    profile_picture_id: number
}>();

const notifications = useTemplateRef("notifications");
const fieldEmail = useTemplateRef("fieldEmail");
const fieldFirstName = useTemplateRef("fieldFirstName");

const emailVal = ref("");
const firstNameVal = ref("");
const lastNameVal = ref("");
const cityVal = ref("");
const phoneVal = ref("");
const roleVal = ref("");

const passwordVal = ref("");

const showPersonalInfoButtons = computed(() => {
    return emailVal.value !== profile.value?.email
        || firstNameVal.value !== profile.value.firstname
        || lastNameVal.value !== profile.value.lastname
        || cityVal.value !== profile.value.city
        || phoneVal.value !== profile.value.phone;
});

const personalGalleries = ref(0);
const orders = ref(0);

onMounted(async () => {
    if (!userID) {
        let userID_tmp = await isLogged();
        if (!userID_tmp) {
            location.href = `${langPrefix}login?redirect=${langPrefix}profile`;
            return;
        }
        userId.value = userID_tmp;
    } else {
        userId.value = userID;
    }

    await getProfileElements();
    loading.value = false;
});

const getProfileElements = async () => {
    const response_profile = await fetch(`https://api.ardeco.app/user/${userID}`, {
        method: "GET",
        credentials: "include"
    });
    const data_profile = await response_profile.json();
    const result_profile = data_profile.data;
    profile.value = result_profile;
    emailVal.value = result_profile.email;
    firstNameVal.value = result_profile.firstname;
    lastNameVal.value = result_profile.lastname;
    cityVal.value = result_profile.city;
    phoneVal.value = result_profile.phone;

    const response_gallery = await fetch(`https://api.ardeco.app/gallery/user/${userID}`, {
        method: "GET",
        credentials: "include"
    });
    const data_gallery = await response_gallery.json();
    const result_gallery = data_gallery.data;

    const response_order_history = await fetch(`https://api.ardeco.app/order_history/user/${userID}`, {
        method: "GET",
        credentials: "include"
    });
    const data_order_history = await response_order_history.json();
    const result_order_history = data_order_history.data;

    roleVal.value = roles[result_profile.role as keyof typeof roles];
    personalGalleries.value = result_gallery.length;
    orders.value = result_order_history;
};

const validatePersonalData = (): Boolean => {
    const errors = [];
    if (!fieldEmail.value?.checkValidity()) errors.push(content.errors.email);
    if (!fieldFirstName.value?.checkValidity()) errors.push(content.errors.firstName);
    if (errors.length > 0) {
        errors.forEach(value => {
            if (notifications.value) {
                notifications.value.showError(value);
            }
        });
        return false;
    } else return true;
};

const editPersonalData = async () => {
    if (!validatePersonalData()) return;

    let json: {
        email?: string,
        first_name?: string,
        last_name?: string,
        city?: string,
        phone?: string
    } = {};

    if (emailVal.value !== profile.value?.email) json.email = emailVal.value;
    if (firstNameVal.value !== profile.value?.firstname) json.first_name = firstNameVal.value;
    if (lastNameVal.value !== profile.value?.lastname) json.last_name = lastNameVal.value;
    if (cityVal.value !== profile.value?.city) json.city = cityVal.value;
    if (phoneVal.value !== profile.value?.phone) json.phone = phoneVal.value;

    if (Object.keys(json).length > 0) {
        const response = await fetch(`https://api.ardeco.app/user/${userId.value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(json)
        });

        const result = await response.json();
        console.log(result);

        if (result.status === "OK") {
            profile.value = {
                id: profile.value!.id,
                email: emailVal.value,
                firstname: firstNameVal.value,
                lastname: lastNameVal.value,
                city: cityVal.value,
                phone: phoneVal.value
            }; // Temporary update values with local ones
            if (notifications.value) {
                notifications.value.showSuccess(notificationsMessages.informationsUpdated);
            }
            await getProfileElements(); // Make sure all values are up to date
        } else {
            if (notifications.value) notifications.value.showError(notificationsMessages.informationsUpdateFailed);
        }
    }
};

const resetPersonalData = async () => {
    const values = profile.value ? profile.value : undefined;

    emailVal.value = values ? values.email : "";
    firstNameVal.value = values ? values.firstname : "";
    lastNameVal.value = values ? values.lastname : "";
    cityVal.value = values ? values.city : "";
    phoneVal.value = values ? values.phone : "";
};

const editPassword = async () => {
    if (passwordVal.value.length === 0) {
        if (notifications.value) notifications.value.showError(notificationsMessages.passwordCantBeEmpty);
        return;
    }

    const response = await fetch(`https://api.ardeco.app/user/${userId.value}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            password: passwordVal.value
        })
    });

    const result = await response.json();
    console.log(result);

    if (result.status === "OK") {
        if (notifications.value) {
            notifications.value.showSuccess(notificationsMessages.informationsUpdated);
        }
        logout();
        location.href = `${langPrefix}login?redirect=${langPrefix}profile`;
    } else {
        if (notifications.value) notifications.value.showError(notificationsMessages.informationsUpdateFailed);
    }
};
</script>
