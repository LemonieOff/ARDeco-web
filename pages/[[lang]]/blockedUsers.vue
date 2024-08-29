<template>
    <div>
        <h1 class="text-center font-bold text-xl md:text-4xl my-8">{{ content.title }}</h1>
        <div class="flex flex-wrap justify-center gap-5 dark:text-AR-Beige"
             v-if="userData.length > 0 && errorMessage === ''">
            <div v-for="userData in userData" :key="userData.userId"
                 class="rounded-lg bg-AR-Floral-White dark:bg-AR-Grey"
                 style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
                <div class="flex flex-col p-5 min-w-52 max-w-52 min-h-44 max-h-44">
                    <p class="font-bold">
                        {{ content.firstname }} <span class="font-normal">{{ userData.firstname }}</span>
                    </p>
                    <p class="font-bold">
                        {{ content.lastname }} <span class="font-normal">{{ userData.lastname }}</span>
                    </p>
                    <p class="font-bold">
                        {{ content.id }} <span class="font-normal">{{ userData.userId }}</span>
                    </p>
                    <button class="block bg-AR-Green text-white border-none rounded text-center mt-2.5 py-2.5 px-5"
                            @click="unblockUser(userData.userId)">
                        {{ content.unblock }}
                    </button>
                </div>
            </div>
        </div>
        <p v-else class="text-center italic mt-5 text-AR-Grey dark:text-AR-Beige">
            {{ errorMessage === '' ? content.loading : errorMessage }}
        </p>
    </div>
</template>

<script setup lang="ts">
import {isLogged} from 'public/ts/checkLogin';

interface User {
    firstname: string;
    lastname: string;
    userId: number;
}

const nuxtApp = useNuxtApp();

const userData = ref<User[]>([]);
const errorMessage = ref("");
const notificationMessage = ref("");
const content = ref(nuxtApp.$content.blockedUsers);

onMounted(async () => {
    await checkLogin();
    await getBlocked();
});

async function checkLogin() {
    const userID = await isLogged();
    if (!userID) {
        location.href = '/login';
    }
}

async function getBlocked() {
    const userID = localStorage.getItem('userID');
    if (!userID) {
        console.error('No user found, redirecting to login');
        errorMessage.value = 'No user found, redirecting to login';
        return;
    }

    const response = await fetch('https://api.ardeco.app/blocked_users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        console.error(content.value.fetchError, response);
        errorMessage.value = content.value.fetchError;
        return;
    }

    const result = await response.json();
    console.log(result);

    if (result.data.length === 0) {
        errorMessage.value = content.value.noBlockedUsers;
        return;
    }

    for (let x = 0; result.data[x] !== undefined; x++) {
        await getUserFullName(result.data[x]);
    }
}

async function getUserFullName(userId: number) {
    const response = await fetch(`https://api.ardeco.app/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if (!response.ok) {
        console.error(content.value.fetchError, response);
        errorMessage.value = content.value.fetchError;
        return;
    }
    const userDataResponse = await response.json();
    userDataResponse.data.userId = userId;
    userData.value.push(userDataResponse.data);
}

async function unblockUser(userId: number) {
    const response = await fetch(`https://api.ardeco.app/unblock/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        console.error('Failed to unblock user ' + userId, response);
        notificationMessage.value = 'Failed to unblock user ' + userId;
        return;
    }

    userData.value = userData.value.filter(user => user.userId !== userId);
    notificationMessage.value = `User ${userId} unblocked successfully`;
    if (userData.value.length === 0) errorMessage.value = content.value.noBlockedUsers;
}
</script>
