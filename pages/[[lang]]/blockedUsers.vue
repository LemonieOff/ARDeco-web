<template>
    <Head>
        <Title>ARDeco - {{ content.title }}</Title>
    </Head>
    <h1 class="text-center font-bold text-xl md:text-4xl my-8">{{ content.title }}</h1>
    <div v-if="userData.length > 0 && errorMessage === ''" class="flex flex-wrap justify-center gap-5">
        <div v-for="userData in userData" :key="userData.blocked_user_id"
             class="rounded-lg bg-AR-Floral-White dark:bg-AR-Grey"
             style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
            <div class="flex flex-col p-5 min-w-52 max-w-52">
                <p><span class="font-bold">{{ userData.blocked_user_id }}</span> - {{ userData.blocked_user.first_name
                    }}
                    {{ userData.blocked_user.last_name }}</p>
                <button class="block bg-AR-Green text-white border-none rounded text-center mt-2.5 py-2.5 px-5"
                        @click="unblockUser(userData.blocked_user_id)">
                    {{ content.unblock }}
                </button>
            </div>
        </div>
    </div>
    <p v-else class="text-center italic mt-5">
        {{ errorMessage === "" ? content.loading : errorMessage }}
    </p>
    <Notifications ref="notifications" />
</template>

<script lang="ts" setup>
import { isLogged, userID } from "public/ts/checkLogin";

interface User {
    id: number;
    user_id: number;
    blocked_user_id: number;
    blocked_user: {
        id: number;
        first_name: string,
        last_name: string
    };
}

const nuxtApp = useNuxtApp();

const notifications = useTemplateRef("notifications");

const userData = ref<User[]>([]);
const errorMessage = ref("");
const content = nuxtApp.$content.blockedUsers;
const langPrefix = nuxtApp.$langPrefix;
const userId = ref(0);

onMounted(async () => {
    await checkLogin();
    await getBlocked();
});

async function checkLogin() {
    if (!userID) {
        let userID_tmp = await isLogged();
        if (!userID_tmp) {
            location.href = `${langPrefix}login?redirect=${langPrefix}blockedUsers`;
            return;
        }
        userId.value = userID_tmp;
    } else {
        userId.value = userID;
    }
}

async function getBlocked() {
    const response = await fetch("https://api.ardeco.app/blocked_users?user_details", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    if (!response.ok) {
        console.error(content.fetchError, response);
        errorMessage.value = content.fetchError;
        return;
    }

    const result = await response.json();
    console.debug(result);

    if (result.data.length === 0) {
        errorMessage.value = content.noBlockedUsers;
        return;
    }

    userData.value = result.data;
}

async function unblockUser(userId: number) {
    const response = await fetch(`https://api.ardeco.app/unblock/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    if (!response.ok) {
        console.error("Failed to unblock user " + userId, response);
        notifications.value!.showError(content.failedUnblocking);
        return;
    }

    notifications.value!.showSuccess(content.successfulUnblocking);
    userData.value = userData.value.filter(user => user.blocked_user_id !== userId);
    if (userData.value.length === 0) errorMessage.value = content.noBlockedUsers;
}
</script>
