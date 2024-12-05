<template>
    <Head>
        <Title>ARDeco - {{ content.title }}</Title>
    </Head>
    <h1 class="text-center font-bold text-xl md:text-4xl my-8">{{ content.title }}</h1>
    <div class="flex flex-col lg:flex-row justify-evenly content-around items-center lg:items-start mb-8">
        <div class="w-96 mb-8 p-2.5 rounded-xl bg-port-brown bg-opacity-20">
            <div class="flex p-2.5 mx-5 items-center justify-between">
                <div class="flex flex-col">
                    <span class="text-stone-600 dark:text-stone-400">{{ content.notificationsActive }}</span>
                    <span id="notifications_enabled" class="text-sm">{{ content.yes }}</span>
                </div>
                <button class="p-1.5 rounded-md outline outline-1 outline-offset-2 hover:outline-offset-1"
                        @click="setSetting('notifications_enabled', !this.settings.notifications_enabled)">
                    {{ content.edit }}
                </button>
            </div>

            <div class="flex p-2.5 mx-5 items-center justify-between">
                <div class="flex flex-col">
                    <span class="text-stone-600 dark:text-stone-400">{{ content.publicLastName }}</span>
                    <span id="display_lastname_on_public" class="text-sm">{{ content.loading }}</span>
                </div>
                <button class="p-1.5 rounded-md outline outline-1 outline-offset-2 hover:outline-offset-1"
                        @click="setSetting('display_lastname_on_public', !this.settings.display_lastname_on_public)">
                    {{ content.edit }}
                </button>
            </div>

            <div class="flex p-2.5 mx-5 items-center justify-between">
                <div class="flex flex-col">
                    <span class="text-stone-600 dark:text-stone-400">{{ content.publicEmailAddress }}</span>
                    <span id="display_email_on_public" class="text-sm">{{ content.loading }}</span>
                </div>

                <button class="p-1.5 rounded-md outline outline-1 outline-offset-2 hover:outline-offset-1"
                        @click="setSetting('display_email_on_public', !this.settings.display_email_on_public)">
                    {{ content.edit }}
                </button>
            </div>

            <div class="flex p-2.5 mx-5 items-center justify-between">
                <div class="flex flex-col">
                    <span class="text-stone-600 dark:text-stone-400">{{ content.newGalleries }}</span>
                    <span id="automatic_new_gallery_share" class="text-sm">{{ content.loading }}</span>
                </div>
                <button class="p-1.5 rounded-md outline outline-1 outline-offset-2 hover:outline-offset-1"
                        @click="setSetting('automatic_new_gallery_share', !this.settings.automatic_new_gallery_share)">
                    {{ content.edit }}
                </button>
            </div>
        </div>
        <div>
            <div class="flex justify-center mb-4 space-x-4">
                <div style="font-weight: bold;">{{ content.sortBy }}</div>
                <div id="dateFilter" style="cursor: pointer;" @click="handleFilters('dateFilter'); filterByDate()">
                    {{ content.dateFilter }}
                </div>
                <div id="nameFilter" style="cursor: pointer;" @click="handleFilters('nameFilter'); filterByName()">
                    {{ content.nameFilter }}
                </div>
                <div id="roomFilter" style="cursor: pointer;" @click="handleFilters('roomFilter'); filterByRoom()">
                    {{ content.roomFilter }}
                </div>
                <div id="styleFilter" style="cursor: pointer;" @click="handleFilters('styleFilter'); filterByStyle()">
                    {{ content.styleFilter }}
                </div>
                <div id="visibilityFilter" style="cursor: pointer;"
                     @click="handleFilters('visibilityFilter'); filterByVisibility()">
                    {{ content.visibilityFilter }}
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
                        <td class="p-2.5"><span
                            :class="gallery.visibility ? 'bg-AR-Green' : 'bg-red-600'"
                            class="w-2.5 h-2.5 inline-block rounded-full mr-2"></span>{{ gallery.name }}
                        </td>
                        <td class="p-2.5">{{ gallery.room }}</td>
                        <td class="p-2.5">{{ gallery.style }}</td>
                    </tr>
                </tbody>
            </table>
            <p v-else>{{ content.galleryIsEmpty }}</p>
        </div>
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
            values: this.$content.values,
            langPrefix: this.$langPrefix,
            galleryData: [],
            settings: [],
            notificationMessages: this.$content.notifications
        };
    },
    mounted() {
        this.getGallery();
        document.getElementById("dateFilter").style.fontWeight = "bold";
        this.getSettings();
    },
    methods: {
        async setSetting(optionName, optionEffect) {
            await isLogged();
            if (!loggedIn) {
                location.href = `${this.langPrefix}login?redirect=${this.langPrefix}settings`;
            }
            console.log(optionName, optionEffect);

            if (optionName === "notifications_enabled") {
                this.$refs.notifications.showError(this.notificationMessages.forbiddenNotificationChange);
                return;
            }

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
                    document.getElementById([optionName]).textContent = this.content.yes;
                } else {
                    document.getElementById([optionName]).textContent = this.content.no;
                }
            } else {
                this.$refs.notifications.showError(this.notificationMessages.informationsUpdateFailed);
            }
            await this.getSettings();
        },
        async getSettings() {
            await isLogged();
            if (!loggedIn) {
                location.href = `${this.langPrefix}login?redirect=${this.langPrefix}settings`;
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
                /*if (this.settings.notifications_enabled === true) {
                    document.getElementById("notifications_enabled").textContent = this.content.yes;
                } else {
                    document.getElementById("notifications_enabled").textContent = this.content.no;
                }*/
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
                location.href = `${this.langPrefix}login?redirect=${this.langPrefix}settings`;
            }
            const response = await fetch("https://api.ardeco.app/gallery/user/" + `${userID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();
            this.galleryData = result.data.map((item) => ({
                ...item,
                room: this.values.rooms[item.room],
                style: this.values.styles[item.style]
            }));
            console.log("this.galleryData : ", this.galleryData);
            if (result.code === 200 && result.data.length === 0) {
                this.$refs.notifications.showSuccess(this.notificationMessages.emptyGallery);
            } else if (result.code !== 200) {
                this.$refs.notifications.showError(this.notificationMessages.infoNotReceived);
            }
        },

        redirectToGallery(galleryId) {
            this.$router.push(`${this.langPrefix}gallery/` + galleryId);
        },

        handleFilters(id) {
            const dateFilter = document.getElementById("dateFilter");
            const nameFilter = document.getElementById("nameFilter");
            const roomFilter = document.getElementById("roomFilter");
            const styleFilter = document.getElementById("styleFilter");
            const visibilityFilter = document.getElementById("visibilityFilter");
            const div = document.getElementById(id);

            if (id === "dateFilter") {
                div.style.fontWeight = "bold";
                nameFilter.style.fontWeight = "normal";
                roomFilter.style.fontWeight = "normal";
                styleFilter.style.fontWeight = "normal";
                visibilityFilter.style.fontWeight = "normal";
            } else if (id === "nameFilter") {
                div.style.fontWeight = "bold";
                dateFilter.style.fontWeight = "normal";
                roomFilter.style.fontWeight = "normal";
                styleFilter.style.fontWeight = "normal";
                visibilityFilter.style.fontWeight = "normal";
            } else if (id === "roomFilter") {
                div.style.fontWeight = "bold";
                dateFilter.style.fontWeight = "normal";
                nameFilter.style.fontWeight = "normal";
                styleFilter.style.fontWeight = "normal";
                visibilityFilter.style.fontWeight = "normal";
            } else if (id === "styleFilter") {
                div.style.fontWeight = "bold";
                dateFilter.style.fontWeight = "normal";
                nameFilter.style.fontWeight = "normal";
                roomFilter.style.fontWeight = "normal";
                visibilityFilter.style.fontWeight = "normal";
            } else if (id === "visibilityFilter") {
                div.style.fontWeight = "bold";
                dateFilter.style.fontWeight = "normal";
                nameFilter.style.fontWeight = "normal";
                roomFilter.style.fontWeight = "normal";
                styleFilter.style.fontWeight = "normal";
            }
        },

        filterByDate() {
            return this.galleryData.sort((a, b) => a.id - b.id);
        },

        filterByName() {
            this.galleryData.sort((a, b) => a.name.localeCompare(b.name));
        },

        filterByRoom() {
            this.galleryData.sort((a, b) => a.room.localeCompare(b.room));
        },

        filterByStyle() {
            this.galleryData.sort((a, b) => a.style.localeCompare(b.style));
        },

        filterByVisibility() {
            this.galleryData.sort((a, b) => a.visibility - b.visibility);
        }
    }
};
</script>
