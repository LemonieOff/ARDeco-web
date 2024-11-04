<template>
    <div class="content">
        <div class="image-container profile-picture" @click="showModal">
            <img alt="Profile picture" v-bind:src="imageSrc">
            <span class="edit-icon">&#9998;</span>
        </div>
    </div>
    <div v-if="display_modal" id="profile_picture_modal" ref="profile_picture_modal">
        <div id="profile_picture_div">
            <div id="profile_picture_select">
                <label>
                    <img alt="Default profile picture" src="https://api.ardeco.app/profile_pictures/0.png" />
                    <input v-model="selected_picture" name="select_image" type="radio" value="0" />
                </label>
                <label>
                    <img alt="Profile picture 1" src="https://api.ardeco.app/profile_pictures/1.png" />
                    <input v-model="selected_picture" name="select_image" type="radio" value="1" />
                </label>
                <label>
                    <img alt="Profile picture 2" src="https://api.ardeco.app/profile_pictures/2.png" />
                    <input v-model="selected_picture" name="select_image" type="radio" value="2" />
                </label>
                <label>
                    <img alt="Profile picture 3" src="https://api.ardeco.app/profile_pictures/3.png" />
                    <input v-model="selected_picture" name="select_image" type="radio" value="3" />
                </label>
                <label>
                    <img alt="Profile picture 4" src="https://api.ardeco.app/profile_pictures/4.png" />
                    <input v-model="selected_picture" name="select_image" type="radio" value="4" />
                </label>
            </div>
            <div id="profile_picture_info_text">
                <p>{{ content.picture.infoText }}</p><br />
                <p>{{ content.picture.confirmText }}</p>
            </div>
            <div id="profile_picture_buttons">
                <button id="profile_picture_button_reset" @click="resetSelection">{{ content.buttons.reset }}</button>
                <button id="profile_picture_button_cancel" @click="hideModal">{{ content.buttons.cancel }}</button>
                <button id="profile_picture_button_confirm" @click="confirmNewPicture">{{ content.buttons.confirm }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import "@/assets/images/profile-settings/default-profile-picture.png";

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
            profile_picture_id: number
        }>,
        required: true
    }
});

const modal = useTemplateRef("profile_picture_modal");
const display_modal = ref(false);
const imageSrc = ref("https://api.ardeco.app/profile_pictures/0.png");
const selected_picture = ref(props.profile.profile_picture_id);

onMounted(() => {
    window.onclick = function(event) {
        if (event.target === modal.value) {
            hideModal();
        }
    };
    console.log(props.profile);

    if (props.profile) {
        imageSrc.value = `https://api.ardeco.app/profile_pictures/${props.profile.profile_picture_id}.png`;
        console.log(props.profile.profile_picture_id);
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
    if (props.profile.profile_picture_id) {
        selected_picture.value = props.profile.profile_picture_id;
    } else {
        selected_picture.value = 0;
    }
};

const confirmNewPicture = async () => {
    const value = selected_picture.value;
    if (value === props.profile.profile_picture_id) {
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

<style lang="scss" scoped>
@import "@/styles/ProfileSettings.scss";

#profile_picture_modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.5);
}

#profile_picture_modal #profile_picture_div {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 75%;
    height: 45%;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    #profile_picture_select {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        img {
            width: 100px;
            height: 100px;
        }

        label {
            display: flex;
            flex-direction: column;

            input {
                margin-top: 10px;
            }
        }
    }

    #profile_picture_info_text {
        text-align: center;
    }

    #profile_picture_buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        button {
            border-radius: 5%;
            padding: 7px;
            color: white;

            &#profile_picture_button_confirm {
                background-color: #4caf50;

                &:hover {
                    background-color: #3b873e;
                }
            }

            &#profile_picture_button_cancel {
                background-color: #9e1d1d;

                &:hover {
                    background-color: #751717;
                }
            }

            &#profile_picture_button_reset {
                background-color: #4a4949;

                &:hover {
                    background-color: #333333;
                }
            }
        }
    }
}

.image-container {
    position: relative;
}

.image-container:hover img {
    filter: brightness(0.3); /* Assombrir l'image au survol */
}

.edit-icon {
    display: none; /* Masquer l'icône par défaut */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Centrer l'icône sur l'image */
    font-size: 52px; /* Ajuster la taille de l'icône */
    cursor: pointer; /* Afficher un curseur de pointeur au survol */
    color: white; /* Couleur de l'icône */
}

.image-container:hover .edit-icon {
    display: block; /* Afficher l'icône au survol */
}
</style>
