<template>
    <div class="relative hover:cursor-pointer group mb-8 w-24 h-24" @click="showModal">
        <img alt="Profile picture" class="group-hover:brightness-[.3] transition duration-75" v-bind:src="imageSrc">
        <span
            class="hidden group-hover:block absolute top-1/2 left-1/2 text-[52px] cursor-pointer text-white -translate-x-1/2 -translate-y-1/2">&#9998;</span>
    </div>
    <div v-if="display_modal" ref="profile_picture_modal"
         class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div id="profile_picture_div"
             class="bg-AR-Beige dark:bg-AR-Dark-Grey p-2.5 rounded-sm shadow-xl flex flex-col justify-evenly w-3/4 h-1/2">
            <div id="profile_picture_select"
                 class="flex flex-col md:flex-row justify-around items-center overflow-auto">
                <label v-for="i in 5" :key="i" class="flex flex-row-reverse md:flex-col w-fit">
                    <img :alt="`Profile picture ${i - 1}`"
                         :src="`https://api.ardeco.app/profile_pictures/${i - 1}.png`" class="w-24 h-24" />
                    <input v-model="selected_picture" :value="i - 1" class="mr-2 md:mt-2" name="select_image"
                           type="radio" />
                </label>
            </div>
            <p class="text-center">{{ content.picture.confirmText }}</p>
            <div id="profile_picture_buttons" class="flex flex-row justify-evenly">
                <button id="profile_picture_button_reset"
                        class="text-white rounded-md p-2 bg-[#4a4949] hover:bg-[#333333]"
                        @click="resetSelection">
                    {{ content.buttons.reset }}
                </button>
                <button id="profile_picture_button_cancel"
                        class="text-white rounded-md p-2 bg-[#9e1d1d] hover:bg-[#751717]" @click="hideModal">
                    {{ content.buttons.cancel }}
                </button>
                <button id="profile_picture_button_confirm"
                        class="text-white rounded-md p-2 bg-[#4caf50] hover:bg-[#3b873e]"
                        @click="confirmNewPicture">{{ content.buttons.confirm }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const nuxtApp = useNuxtApp();
const content = nuxtApp.$content.profile;

const props = defineProps({
    profile: {
        type: Object as PropType<{
            id: number,
            email: string,
            firstname: string,
            lastname: string,
            city: string,
            phone: string,
            role: string,
            profile_picture_id: number
        } | undefined>,
        required: true
    }
});

const modal = useTemplateRef("profile_picture_modal");
const display_modal = ref(false);
const imageSrc = ref("https://api.ardeco.app/profile_pictures/0.png");
const selected_picture = ref(props.profile ? props.profile.profile_picture_id : 0);

onMounted(() => {
    window.onclick = function(event) {
        if (event.target === modal.value) {
            hideModal();
        }
    };

    console.debug(props.profile);

    if (props.profile) {
        imageSrc.value = `https://api.ardeco.app/profile_pictures/${props.profile.profile_picture_id}.png`;
    } else {
        selected_picture.value = 0;
    }
});

const showModal = () => {
    display_modal.value = true;
};

const hideModal = () => {
    display_modal.value = false;
    resetSelection();
};

const resetSelection = () => {
    if (props.profile && props.profile.profile_picture_id) {
        selected_picture.value = props.profile.profile_picture_id;
    } else {
        selected_picture.value = 0;
    }
};

const confirmNewPicture = async () => {
    const value = selected_picture.value;
    if (props.profile && value === props.profile.profile_picture_id) {
        hideModal();
        return;
    }

    if (value <= 0 || value > 4) {
        await resetProfilePictureRequest();
        return;
    }

    await changeProfilePictureRequest(value);
};

const resetProfilePictureRequest = async () => {
    const response = await fetch("https://api.ardeco.app/profile_picture/user", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    const result = await response.json();
    console.debug("Reset picture result : " + result);

    location.reload();
};

const changeProfilePictureRequest = async (value: number) => {
    const number = Number(value);
    if (Number.isNaN(number)) {
        await resetProfilePictureRequest();
        return;
    }

    const json = JSON.stringify({
        picture_id: number
    });
    const response = await fetch("https://api.ardeco.app/profile_picture/user", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: json
    });
    const result = await response.json();
    console.debug("Change picture result : " + result);

    location.reload();
};
</script>
