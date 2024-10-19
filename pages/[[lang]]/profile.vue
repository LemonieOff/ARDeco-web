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
                           :placeholder="content.placeholders.email"
                           :value="profile ? profile.email : ''"
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
                           :placeholder="content.placeholders.firstName"
                           :value="profile ? profile.firstname : ''"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           required
                           type="text" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="lastName">{{ content.informations.lastName
                        }}</label>
                    <input id="lastName"
                           ref="fieldLastName"
                           :placeholder="content.placeholders.lastName"
                           :value="profile ? profile.lastname : ''"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           type="text" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="city">{{ content.informations.city }}</label>
                    <input id="city"
                           ref="fieldCity"
                           :placeholder="content.placeholders.city"
                           :value="profile ? profile.city : ''"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           type="text" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="phoneNumber">{{ content.informations.phone
                        }}</label>
                    <input id="phoneNumber"
                           ref="fieldPhone"
                           :placeholder="content.placeholders.phone"
                           :value="profile ? profile.phone : ''"
                           class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:invalid:outline-red-500 invalid:border-red-500"
                           type="tel" />
                </div>
                <div class="flex justify-evenly">
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
                <div class="flex justify-evenly">
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
const fieldPassword = useTemplateRef("fieldPassword");
const fieldFirstName = useTemplateRef("fieldFirstName");
const fieldLastName = useTemplateRef("fieldLastName");
const fieldCity = useTemplateRef("fieldCity");
const fieldPhone = useTemplateRef("fieldPhone");

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

    if (fieldEmail.value) fieldEmail.value.value = result_profile.email;
    else console.error(result_profile.email);

    document.getElementById("role").innerText = result_profile.role;
    document.getElementById("savedItems").innerHTML = result_gallery.length;
    document.getElementById("commandsOrdered").innerHTML = result_order_history;
};

const confirmEdit = async () => {
    document.getElementsByClassName("profile-wrapper")[0].style.display = "block";
    document.getElementsByClassName("profile-wrapper")[1].style.display = "none";
    document.getElementsByClassName("profile-wrapper-lower-buttons")[0].style.display = "block";
    const email_field = document.getElementById("email_edit").value;
    const first_name_field = document.getElementById("first_name_edit").value;
    const last_name_field = document.getElementById("last_name_edit").value;
    const city_field = document.getElementById("city_edit").value;
    const phone_field = document.getElementById("phone_edit").value;
    const password_field = document.getElementById("password_edit").value;

    let isPasswordChanged = false;
    let json = {};
    if (email_field !== "") json.email = email_field;
    if (first_name_field !== "") json.first_name = first_name_field;
    if (last_name_field !== "") json.last_name = last_name_field;
    if (city_field !== "") json.city = city_field;
    if (phone_field !== "") json.phone = phone_field;
    if (password_field !== "") {
        json.password = password_field;
        isPasswordChanged = true;
    }

    console.log(json.length);
    const response = await fetch(`https://api.ardeco.app/user/${localStorage.getItem("userID")}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(json)
    });

    const result = await response.json();
    console.log(result);

    if (result.code === 200) {
        notifications.value.showSuccess("Informations modifiées avec succès");
        if (isPasswordChanged) {
            logout();
            location.reload();
        } else {
            await getProfileElements();
        }
    } else {
        notifications.value.showError("Error: Impossible de modifier les informations pour le moment, réessayez plus tard.");
    }
};

const validatePersonalData = (): Boolean => {
    const errors = [];
    if (!fieldEmail.value?.checkValidity()) errors.push("Une adresse email doit être renseignée");
    if (!fieldFirstName.value?.checkValidity()) errors.push("Un prénom doit être renseigné");
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
    if (fieldEmail.value && (fieldEmail.value.value !== profile.value?.email)) json.email = fieldEmail.value.value;
    if (fieldFirstName.value && (fieldFirstName.value.value !== profile.value?.firstname)) json.first_name = fieldFirstName.value.value;
    if (fieldLastName.value && fieldLastName.value.value !== profile.value?.lastname) json.last_name = fieldLastName.value.value;
    if (fieldCity.value && fieldCity.value.value !== profile.value?.city) json.city = fieldCity.value.value;
    if (fieldPhone.value && fieldPhone.value.value !== profile.value?.phone) json.phone = fieldPhone.value.value;

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
            if (notifications.value) notifications.value.showSuccess(result.description);
        } else {
            if (notifications.value) notifications.value.showError(result.description);
        }
    }
};

const resetPersonalData = async () => {
    const values = profile.value ? profile.value : undefined;

    if (fieldEmail.value) fieldEmail.value.value = values ? values.email : "";
    if (fieldFirstName.value) fieldFirstName.value.value = values ? values.firstname : "";
    if (fieldLastName.value) fieldLastName.value.value = values ? values.lastname : "";
    if (fieldCity.value) fieldCity.value.value = values ? values.city : "";
    if (fieldPhone.value) fieldPhone.value.value = values ? values.phone : "";
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
