<template>
    <div class="mt-8 mb-4">
        <div v-if="loading"
             class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-6 w-1/3 mx-auto text-center rounded-lg">
            {{ content.loading }}
        </div>
        <div v-else class="flex flex-col items-center justify-center">
            <div
                class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-8 rounded-lg shadow-md w-80 md:w-[32rem] lg:w-[48rem] mb-8">
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
                class="bg-port-brown bg-opacity-20 text-AR-Grey dark:text-AR-Beige p-8 rounded-lg shadow-md w-80 md:w-[32rem] lg:w-[48rem]">
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
        </div>
    </div>

    <ProfileSettings id="profileSettings" style="display: none"></ProfileSettings>
    <div id="profile-container">
        <div id="profile-loading" class="form" style="top: 10%;">
            {{ content.loading }}
        </div>
        <div class="profile-wrapper" style="display: none;">
            <div class="profile-elements-wrapper">
                <div class="element2">{{ content.informations.role }}<span id="role"></span></div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">{{ content.informations.savedItems }}<span id="savedItems"></span></div>
                <div class="element2"><a id="yourFavoriteFurnitures" :href="`${langPrefix}orderHistory`" class="button">{{ content.informations.commandsOrdered
                    }}<span id="commandsOrdered"></span></a></div>
            </div>
            <div class="profile-edit-buttons-wrapper">
                <a id="deleteAccountButton" :href="`${langPrefix}deleteAccount`"
                   class="deleteAccountButton">{{ content.buttons.delete }}</a>
            </div>
        </div>

        <div class="profile-wrapper-lower-buttons">
            <div class="profile-elements-wrapper">
                <div class="element">
                    <a id="galleryAccess" :href="`${langPrefix}gallery`" class="button">{{ content.gallery }}</a>
                </div>
                <div class="element2">
                    <a id="blockedUsersAccess" :href="`${langPrefix}blockedUsers`"
                       class="button">{{ content.blockedUsers }}</a>
                </div>
            </div>
            <div class="profile-elements-wrapper">
                <div class="element">
                    <a id="yourFavoriteGalleries" :href="`${langPrefix}favGallery`"
                       class="button">{{ content.yourFavoriteGalleries }}</a>
                </div>
                <div class="element2">
                    <a id="yourFavoriteFurnitures" :href="`${langPrefix}favFurniture`"
                       class="button">{{ content.yourFavoriteFurnitures }}</a>
                </div>
            </div>
        </div>
    </div>
    <Notifications ref="notifications" />
</template>

<script lang="ts" setup>
import { isLogged, logout, userID } from "public/ts/checkLogin";
import ProfileSettings from "@/components/UserProfile/ProfileSettings.vue";
import Notifications from "@/components/Notifications.vue";

const nuxtApp = useNuxtApp();

let content = nuxtApp.$content.profile;
let userId = ref(0);
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
}>();
provide("profile", profile);

const notifications = useTemplateRef("notifications");
const fieldEmail = useTemplateRef("fieldEmail");
const fieldFirstName = useTemplateRef("fieldFirstName");

const emailVal = ref("");
const firstNameVal = ref("");
const lastNameVal = ref("");
const cityVal = ref("");
const phoneVal = ref("");

const passwordVal = ref("");

const showPersonalInfoButtons = computed(() => {
    return emailVal.value !== profile.value?.email
        || firstNameVal.value !== profile.value.firstname
        || lastNameVal.value !== profile.value.lastname
        || cityVal.value !== profile.value.city
        || phoneVal.value !== profile.value.phone;
});

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

    // Remove loading and display profile
    document.getElementById("profile-loading").style.display = "none";
    document.getElementById("profileSettings").style.display = "block";
    document.getElementsByClassName("profile-wrapper")[0].style.display = "block";
    document.getElementsByClassName("profile-wrapper-lower-buttons")[0].style.display = "block";
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

    document.getElementById("role").innerText = result_profile.role;
    document.getElementById("savedItems").innerHTML = result_gallery.length;
    document.getElementById("commandsOrdered").innerHTML = result_order_history;
};

const validatePersonalData = (): Boolean => {
    const errors = [];
    if (!fieldEmail.value?.checkValidity()) errors.push("Une adresse email doit être renseignée"); // TODO : Translate
    if (!fieldFirstName.value?.checkValidity()) errors.push("Un prénom doit être renseigné"); // TODO : Translate
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
                notifications.value.showSuccess(result.description);
            }
            await getProfileElements(); // Make sure all values are up to date
        } else {
            if (notifications.value) notifications.value.showError(result.description);
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
            notifications.value.showSuccess(result.description);
        }
        logout();
        location.href = `${langPrefix}login?redirect=${langPrefix}profile`;
    } else {
        if (notifications.value) notifications.value.showError(result.description);
    }
};
</script>

<style lang="scss" scoped>
#profile-container {
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 5%;
}

.profile-wrapper {
    //margin-left: 20%;
    //margin-top: 5%;
    background-color: #F4F4F4;
    border-radius: 20px;
    width: 90%;
    height: 20%;
}

.profile-wrapper-lower-buttons {
    margin: 2%;
    //margin-left: 35%;
    width: 90%;
    height: 20%;
}

.profile-elements-wrapper {
    display: flex;
    padding: 1%;
    text-align: center;
}

.profile-edit-buttons-wrapper {
    display: flex;
    justify-content: center;
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

.element {
    width: 47.5%;
    text-align: right;
}

.element2 {
    margin-left: 5%;
    width: 45%;
    text-align: left;
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

input {
    @apply bg-AR-Beige dark:bg-AR-Dark-Grey dark:text-port-brown
}
</style>
