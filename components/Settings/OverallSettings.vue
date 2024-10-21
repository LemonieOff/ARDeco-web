<template>
    <h1 class="text-center font-bold text-xl md:text-4xl my-8">{{ content.title }}</h1>
    <div class="flex flex-col lg:flex-row justify-evenly content-around items-center lg:items-start mb-8">
        <div class="w-96 mb-8 p-2.5 rounded-xl bg-port-brown bg-opacity-20">
            <div class="flex p-2.5 mx-5 items-center justify-between">
                <div class="flex flex-col">
                    <span class="text-stone-600 dark:text-stone-400">{{ content.notificationsActive }}</span>
                    <span id="notifications_enabled" class="text-sm">Chargement</span>
                </div>
                <button class="p-1.5 rounded-md outline outline-1 outline-offset-2 hover:outline-offset-1"
                        @click="setSetting('notifications_enabled', !this.settings.notifications_enabled)">
                    Modifier
                </button>
            </div>

            <div class="flex p-2.5 mx-5 items-center justify-between">
                <div class="flex flex-col">
                    <span class="text-stone-600 dark:text-stone-400">{{ content.publicLastName }}</span>
                    <span id="display_lastname_on_public" class="text-sm">Chargement</span>
                </div>
                <button class="p-1.5 rounded-md outline outline-1 outline-offset-2 hover:outline-offset-1"
                        @click="setSetting('display_lastname_on_public', !this.settings.display_lastname_on_public)">
                    Modifier
                </button>
            </div>

            <div class="flex p-2.5 mx-5 items-center justify-between">
                <div class="flex flex-col">
                    <span class="text-stone-600 dark:text-stone-400">{{ content.publicEmailAddress }}</span>
                    <span id="display_email_on_public" class="text-sm">Chargement</span>
                </div>

                <button class="p-1.5 rounded-md outline outline-1 outline-offset-2 hover:outline-offset-1"
                        @click="setSetting('display_email_on_public', !this.settings.display_email_on_public)">
                    Modifier
                </button>
            </div>

            <div class="flex p-2.5 mx-5 items-center justify-between">
                <div class="flex flex-col">
                    <span class="text-stone-600 dark:text-stone-400">{{ content.newGalleries }}</span>
                    <span id="automatic_new_gallery_share" class="text-sm">Chargement</span>
                </div>
                <button class="p-1.5 rounded-md outline outline-1 outline-offset-2 hover:outline-offset-1"
                        @click="setSetting('automatic_new_gallery_share', !this.settings.automatic_new_gallery_share)">
                    Modifier
                </button>
            </div>
        </div>
        <table v-if="galleryData.length" class="w-96 border-[1px] rounded-md border-spacing-0 border-separate">
            <thead>
            <tr>
                <th class="p-2.5">{{ content.name }}</th>
                <th class="p-2.5">{{ content.room }}</th>
                <th class="p-2.5">{{ content.style }}</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="gallery in galleryData" :key="gallery.id"
                    class="cursor-pointer odd:dark:bg-AR-Grey odd:bg-AR-Floral-White"
                    @click="redirectToGallery(gallery.id)">
                    <td class="p-2.5">{{ gallery.name }}</td>
                    <td class="p-2.5">{{ gallery.room }}</td>
                    <td class="p-2.5">{{ gallery.style }}</td>
                </tr>
            </tbody>
        </table>
        <p v-else>{{ content.galleryIsEmpty }}</p>
    </div>
    <Notifications ref="notifications" />
</template>

<script>
import { isLogged, loggedIn } from "public/ts/checkLogin";
import Notifications from "@/components/Notifications.vue";

export default {
    name: "OverallSettings",
    components: {
        Notifications
    },
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: this.$content.settings.users,
            langPrefix: this.$langPrefix,
            galleryData: [],
            settings: [],
            notificationMessages: this.$content.notifications
        };
    },
    mounted() {
        this.getGallery();
        this.getSettings();
    },
    methods: {
        async setSetting(optionName, optionEffect) {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            console.log(optionName, optionEffect);

            const response = await fetch("https://api.ardeco.app/settings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    [optionName]: optionEffect
                }),
                credentials: "include"
            });

            const result = await response.json();
            console.log(result);
            if (result.code === 200) {
                this.$refs.notifications.showSuccess(this.notificationMessages.informationsUpdated);
                if (optionEffect) {
                    document.getElementById([optionName]).textContent = "Oui";
                } else {
                    document.getElementById([optionName]).textContent = "Non";
                }
            } else {
                this.$refs.notifications.showError(this.notificationMessages.informationsUpdateFailed);
            }
            await this.getSettings();
        },
        async getSettings() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const response = await fetch("https://api.ardeco.app/settings", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();
            this.settings = result.data;

            console.log(result);
            if (result.code === 200) {
                if (this.settings.notifications_enabled === true) {
                    document.getElementById("notifications_enabled").textContent = this.content.yes;
                } else {
                    document.getElementById("notifications_enabled").textContent = this.content.no;
                }
                if (this.settings.display_lastname_on_public === true) {
                    document.getElementById("display_lastname_on_public").textContent = this.content.yes;
                } else {
                    document.getElementById("display_lastname_on_public").textContent = this.content.no;
                }
                if (this.settings.display_email_on_public === true) {
                    document.getElementById("display_email_on_public").textContent = this.content.yes;
                } else {
                    document.getElementById("display_email_on_public").textContent = this.content.no;
                }
                if (this.settings.automatic_new_gallery_share === true) {
                    document.getElementById("automatic_new_gallery_share").textContent = this.content.yes;
                } else {
                    document.getElementById("automatic_new_gallery_share").textContent = this.content.no;
                }
            } else {
                this.$refs.notifications.showError(this.notificationMessages.infoNotReceived);
            }
        },
        async getGallery() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const response = await fetch("https://api.ardeco.app/gallery/user/" + `${userID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();
            this.galleryData = result.data;
            console.log("this.galleryData : ", this.galleryData);
            if (result.code === 200 && result.data.length === 0) {
                this.$refs.notifications.showSuccess(this.notificationMessages.emptyGallery);
            } else if (result.code !== 200) {
                this.$refs.notifications.showError(this.notificationMessages.infoNotReceived);
            }
        },
        async redirectToGallery(galleryId) {
            this.$router.push(`${this.langPrefix}gallery/` + galleryId);
        }
    }
};
</script>
