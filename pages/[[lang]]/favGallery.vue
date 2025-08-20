<template>
    <Head>
        <Title>ARDeco - {{ content.title }}</Title>
    </Head>
    <h1 class="text-center font-bold text-xl md:text-4xl my-8">{{ content.title }}</h1>
    <div v-if="galleryData.length > 0 && errorMessage === ''" class="flex flex-wrap justify-center gap-5 mb-8">
        <div v-for="data in galleryData" :key="data.user.id"
             class="rounded-lg bg-AR-Floral-White dark:bg-AR-Grey h-fit flex flex-col p-5 min-w-56 max-w-56 sm:min-w-96 sm:max-w-96"
             style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
            <div class="flex flex-row justify-between items-center mb-2">
                <a v-if="!blockedUsers.includes(data.user.id)" :href="`${langPrefix}gallery/${data.id}`"
                   class="font-bold underline text-xl cursor-pointer hover:opacity-75">{{ data.name }}</a>
                <span v-else class="font-bold underline text-xl cursor-not-allowed">{{ data.name }}</span>
                <Icon class="cursor-pointer text-amber-300 hover:text-AR-Extra-Light-Grey" mode="svg"
                      name="material-symbols:star"
                      size="24"
                      tabindex="0"
                      @click="deleteGallery(data.id)" />
            </div>
            <span class="mb-6 italic">{{ data.description }}</span>
            <div class="flex flex-col sm:flex-row justify-between mb-2">
                    <span class="inline-flex items-center"><svg height="1.25em" viewBox="0 0 36 36"
                                                                width="1.25em"
                                                                xmlns="http://www.w3.org/2000/svg"><path
                        d="M9.344 14.702h-2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5"
                        fill="#a0041e" /><path
                        d="M5 16L18 3l13 13v17H5z" fill="#ffe8b6" /><path d="M18 16h1v16h-1z" fill="#ffcc4d" /><path
                        d="M31 17a1 1 0 0 1-.707-.293L18 4.414L5.707 16.707a.999.999 0 1 1-1.414-1.414l13-13a1 1 0 0 1 1.414 0l13 13A.999.999 0 0 1 31 17"
                        fill="#66757f" /><path
                        d="M18 17a.999.999 0 0 1-.707-1.707l6.5-6.5a.999.999 0 1 1 1.414 1.414l-6.5 6.5A1 1 0 0 1 18 17"
                        fill="#66757f" /><path
                        d="M10 26h4v6h-4z" fill="#c1694f" /><path d="M10 17h4v4h-4zm12.5 0h4v4h-4zm0 9h4v4h-4z"
                                                                  fill="#55acee" /><path
                        d="M33.5 33.5A1.5 1.5 0 0 1 32 35H4a1.5 1.5 0 0 1 0-3h28a1.5 1.5 0 0 1 1.5 1.5"
                        fill="#5c913b" /></svg><span class="ml-2">{{ values.rooms[data.room] }}</span></span>
                <span class="inline-flex items-center"><svg height="1.25em" viewBox="0 0 36 36"
                                                            width="1.25em"
                                                            xmlns="http://www.w3.org/2000/svg"><path
                    d="M35 30a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h30a2 2 0 0 1 2 2z" fill="#d79e84" /><path
                    d="M33 4H3a2 2 0 0 0-2 2v24c0 .389.116.748.307 1.055l33.33-26.198A2 2 0 0 0 33 4"
                    fill="#bf6952" /><path
                    d="M31 22V9a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v13z" fill="#8ccaf7" /><path
                    d="M6 28h13v-7H5v6a1 1 0 0 0 1 1"
                    fill="#5dadec" /><path
                    d="M19 21v7h11a1 1 0 0 0 1-1v-6z" fill="#292f33" /><path
                    d="M20 19c-.613 0-.852 1.127-1.405 2c-.349.55-.822 1-1.595 1c-2 0-2 3-3 3c-1.256 0-2.512 1.578-3.273 3H19c.879-1.758 1.761-3.514 4-3.913A5.6 5.6 0 0 1 24 24c3 0 3.106-1.553 4-2c1.358-.679 2.251-.437 3-.211V19z"
                    fill="#67757f" /><path
                    d="m25 11l-4 4v4h8v-4z" fill="#e75a70" /><path
                    d="M29 16a1 1 0 0 1-.707-.293L25 12.414l-3.293 3.293a.999.999 0 1 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4A.999.999 0 0 1 29 16"
                    fill="#292f33" /><path
                    d="M23 16h2v3h-2z" fill="#bb1a34" /><path
                    d="M17.219 14.125a1.874 1.874 0 0 0-1.875-1.875c-.079 0-.155.014-.232.023q.043-.193.044-.398A1.874 1.874 0 0 0 13.281 10a1.87 1.87 0 0 0-1.583.878a1.9 1.9 0 0 0-.667-.128a1.87 1.87 0 0 0-1.851 1.632a1.9 1.9 0 0 0-.68-.132a1.874 1.874 0 1 0 0 3.75c.041 0 .08-.01.121-.012l.004.012h6.75v-.003a1.873 1.873 0 0 0 1.844-1.872"
                    fill="#fff" /></svg><span class="ml-2">{{ values.styles[data.style] }}</span></span>
            </div>
            <div class="flex flex-col sm:flex-row justify-between mb-2">
                    <span>{{ data.model_data.length
                        }} {{ data.model_data.length > 1 ? `${content.furnitureMul}` : `${content.furnitureSing}` }}
                    </span>
                <span class="opacity-50">{{ content.by }} {{ data.user.first_name
                    }}{{ data.user.last_name.trim() === "" ? "" : ` ${data.user.last_name}` }}</span>
            </div>
            <a v-if="!blockedUsers.includes(data.user.id)" :href="`${langPrefix}gallery/${data.id}`"
               class="block text-[#086100] dark:text-[#ade5a8] border-2 border-[#086100] dark:border-[#ade5a8] hover:bg-AR-Beige hover:dark:bg-AR-Dark-Grey rounded text-center mt-2.5 py-2.5 px-5 duration-100 transition-colors">
                {{ content.accessDetails }}
            </a>
            <div v-else
                 class="block text-[#a91a1a] dark:text-[#ffc7c7] border-2 border-[#a91a1a] dark:border-[#ffc7c7] cursor-not-allowed rounded text-center mt-2.5 py-2.5 px-5 duration-100 transition-colors">
                {{ content.blockedUser }}
            </div>
        </div>
    </div>
    <p v-else class="text-center italic mt-5">
        {{ errorMessage === "" ? content.loading : errorMessage }}
    </p>
</template>

<script lang="ts" setup>
import { isLogged, userID } from "@/public/ts/checkLogin";

const nuxtApp = useNuxtApp();

const content = nuxtApp.$content.favorite.gallery;
const values = nuxtApp.$content.values;

const galleryData = ref<{
    id: number,
    user: {
        id: number,
        first_name: string,
        last_name: string
    },
    name: string,
    description: string,
    style: keyof typeof values.styles,
    room: keyof typeof values.rooms,
    model_data: [],
}[]>([]);
const blockedUsers = ref<number[]>([]);
const errorMessage = ref("");
const langPrefix = nuxtApp.$langPrefix;
const userId = ref(0);

onMounted(async () => {
    await checkLogin();
    await getBlockedUsers();
    await getFavGallery();
});

async function checkLogin() {
    if (!userID) {
        let userID_tmp = await isLogged();
        if (!userID_tmp) {
            location.href = `${langPrefix}login?redirect=${langPrefix}favGallery`;
            return;
        }
        userId.value = userID_tmp;
    } else {
        userId.value = userID;
    }
}

async function getBlockedUsers() {
    const response = await fetch("https://api.ardeco.app/blocked_users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    if (response.type === "error") {
        errorMessage.value = "Fail to fetch blocked users, network error";
        return;
    }

    const result = await response.json();
    console.debug(result);

    if (!response.ok) {
        errorMessage.value = "Fail to fetch data";
        return;
    }
    blockedUsers.value = result.data;
}

async function getFavGallery() {
    const response = await fetch("https://api.ardeco.app/favorite/gallery", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    if (response.type === "error") {
        errorMessage.value = "Fail to fetch galeries, network error";
        return;
    }

    const result = await response.json();
    console.debug(result);

    if (!response.ok) {
        if (response.status === 404) {
            errorMessage.value = content.noItems;
        } else {
            errorMessage.value = "Fail to fetch data";
        }
        return;
    }
    galleryData.value = result.data;
}

async function deleteGallery(id: number) {
    const response = await fetch(`https://api.ardeco.app/favorite/Gallery/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    if (response.ok) {
        galleryData.value = galleryData.value.filter(item => item.id !== id);
        if (galleryData.value.length <= 0) errorMessage.value = content.noItems;
    } else {
        console.error("Failed to delete Gallery");
        errorMessage.value = "An error occurred while deleting the gallery.";
    }
}
</script>
