<template>
</template>

<script lang="ts" setup>
import { isLogged, userID } from "public/ts/checkLogin";

const nuxtApp = useNuxtApp();
// const notificationMessage = ref("");
// const content = ref(nuxtApp.$content.cart);
const langPrefix = nuxtApp.$langPrefix;
const userId = ref(0);

onMounted(async () => {
    await checkLogin();
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
</script>
