<template>
    <h1 class="text-center font-bold text-xl md:text-4xl my-8"> {{ content.title }}</h1>
    <div
        class="flex flex-col w-11/12 sm:w-10/12 md:w-8/12 mb-8 justify-self-center bg-AR-Floral-White dark:bg-card-background-dark mt-8 rounded-xl border-2 border-AR-Blue dark:border-AR-Light-Blue">
        <div class="mt-6 text-lg text-center font-bold text-AR-Blue dark:text-AR-Light-Blue">
            {{ content.textEncouragement }}
        </div>
        <div class="mt-7 mx-6 flex items-center">
            <svg class="max-h-5 fill-AR-Blue dark:fill-AR-Light-Blue" viewBox="0 0 512 512"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
            <span class="ml-2.5 font-bold text-AR-Blue dark:text-AR-Light-Blue">
                {{ content.typesChoiceTitle }}
            </span>
        </div>
        <div class="flex mt-4 mx-6 justify-between flex-col items-center sm:flex-row">
            <button v-for="(card, index) in cards" :id="`card${index}`" :key="index"
                    :data-active="index === selectedCard"
                    class="p-2 my-2 first:mt-0 last:mb-0 sm:my-0 w-2/3 sm:w-1/4 border-[1px] rounded-md hover:bg-amber-100 hover:dark:bg-zinc-700 data-[active=true]:bg-AR-Blue dark:data-[active=true]:bg-AR-Light-Blue data-[active=true]:text-white dark:data-[active=true]:text-black border-AR-Blue dark:border-AR-Light-Blue duration-300 transition-colors"
                    @click="changeSelection(index)">
                {{ card.name }}
            </button>
        </div>
        <div class="mt-7 mx-6 flex items-center">
            <svg class="max-h-5 fill-AR-Blue dark:fill-AR-Light-Blue" viewBox="0 0 512 512"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
            </svg>
            <span class="ml-2.5 font-bold text-AR-Blue dark:text-AR-Light-Blue">
                {{ content.inputTitle }}
            </span>
        </div>
        <textarea id="textInput" ref="textInput" :placeholder="`${content.inputPlaceholder}`"
                  class="userInput mt-4 mx-6 w-auto min-h-64 p-3.5 border-[1px] rounded-md border-AR-Blue dark:border-AR-Light-Blue bg-AR-Beige dark:bg-AR-Dark-Grey"></textarea>
        <button
            class="p-3.5 w-32 h-auto my-6 rounded duration-300 text-center self-center bg-AR-Light-Grey text-white hover:bg-zinc-700"
            @click="sendForm">
            {{ content.send }}
        </button>
    </div>
    <Notifications ref="notifications" />
</template>

<script lang="ts" setup>
import Notifications from "~/components/Notifications.vue";
import { isLogged, loggedIn } from "public/ts/checkLogin";

const nuxtApp = useNuxtApp();

const notifications = useTemplateRef("notifications");
const textInput = useTemplateRef("textInput");

const cards = [
    { name: "Feedback" },
    { name: "Suggestion" },
    { name: "Bug" }
];
const selectedCard = ref(0);
const content = nuxtApp.$content.feedback;
const notificationsMessages = nuxtApp.$content.notifications;
const langPrefix = nuxtApp.$langPrefix;
const userID = ref<number>();

onMounted(() => {
    checkIfLogged();
});

async function checkIfLogged() {
    const userId = await isLogged();
    if (!loggedIn || userId === null) {
        location.href = `${langPrefix}login?redirect=${langPrefix}feedback`;
        return;
    }
    userID.value = userId;
}

async function changeSelection(index: number) {
    selectedCard.value = index;
}

async function sendForm() {
    let feedbackType = null;
    const date = new Date();
    const todaysDate = date.toDateString();

    if (textInput.value === null) {
        if (notifications.value) notifications.value.showError(notificationsMessages.missingInformations);
        return;
    }

    const feedbackContent = textInput.value.value;

    if (feedbackContent == "") {
        if (notifications.value) notifications.value.showError(notificationsMessages.missingInformations);
        return;
    }

    console.log("selectedCard : ", selectedCard.value);

    switch (selectedCard.value) {
        case 0:
            feedbackType = "feedback";
            break;
        case 1:
            feedbackType = "suggestion";
            break;
        case 2:
            feedbackType = "bug";
            break;
        default:
            feedbackType = "feedback";
    }

    console.log("user_id : ", userID);
    console.log("feedback : ", feedbackContent);
    console.log("type : ", feedbackType);
    console.log("date : ", todaysDate);
    console.log("processed : ", false);
    console.log("process_date : ", null);

    const response = await fetch("https://api.ardeco.app/feedbacks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_id": userID,
            "feedback": feedbackContent,
            "type": feedbackType,
            "date": todaysDate,
            "processed": false,
            "process_date": null
        }),
        credentials: "include"
    });

    const result = await response.json();
    console.log(result);

    if (result.code != 201) {
        if (notifications.value) notifications.value.showError(notificationsMessages.failedToSendForm);
    } else {
        if (notifications.value) notifications.value.showSuccess(notificationsMessages.formSent);
        textInput.value.value = "";
    }

}
</script>

<style lang="scss" scoped>
@import '@/styles/variables/ColorVariables.scss';

</style>
