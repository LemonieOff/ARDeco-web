<template>
    <div>
        <div class="content">
            <FavoriteThemes/>
            <div @click="showModal" class="image-container profile-picture">
                <img v-bind:src="imageSrc" alt="Profile picture">
                <span class="edit-icon">&#9998;</span>
            </div>
            <RecentPurchases/>
        </div>
        <div id="profile_picture_modal">
            <div id="profile_picture_div">
                <div id="profile_picture_select">
                    <label style="display: none">
                        <img src="https://api.ardeco.app/profile_pictures/0.png" alt="Default profile picture"/>
                        <input name="select_image" type="radio" value="0"/>
                    </label>
                    <label>
                        <img src="https://api.ardeco.app/profile_pictures/1.png" alt="Profile picture 1"/>
                        <input name="select_image" type="radio" value="1"/>
                    </label>
                    <label>
                        <img src="https://api.ardeco.app/profile_pictures/2.png" alt="Profile picture 2"/>
                        <input name="select_image" type="radio" value="2"/>
                    </label>
                    <label>
                        <img src="https://api.ardeco.app/profile_pictures/3.png" alt="Profile picture 3"/>
                        <input name="select_image" type="radio" value="3"/>
                    </label>
                    <label>
                        <img src="https://api.ardeco.app/profile_pictures/4.png" alt="Profile picture 4"/>
                        <input name="select_image" type="radio" value="4"/>
                    </label>
                </div>
                <div id="profile_picture_info_text">
                    <p>{{ picture.infoText }}</p><br />
                    <p>{{ picture.confirmText }}</p>
                </div>
                <div id="profile_picture_buttons">
                    <button id="profile_picture_button_reset" @click="resetSelection">{{ buttons.reset }}</button>
                    <button id="profile_picture_button_cancel" @click="hideModal">{{ buttons.cancel }}</button>
                    <button id="profile_picture_button_confirm" @click="confirmNewPicture">{{ buttons.confirm }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FavoriteThemes from "~/components/UserProfile/FavoriteThemes.vue"
import RecentPurchases from "~/components/UserProfile/RecentPurchases.vue"
import "assets/images/profile-settings/default-profile-picture.png";
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
    name: "ProfileSettings",
    data() {
        return {
            imageSrc: "https://api.ardeco.app/profile_pictures/0.png",
            content: {},
            picture: {},
            buttons: {}
        }
    },
    inject: ['profile'],
    components: {
        FavoriteThemes,
        RecentPurchases
    },
    watch: {
        profile() {
            // Set the content variable to the correct language
            this.content = this.urlLang === 'en' ? en.profile : fr.profile;
            this.picture = this.urlLang === 'en' ? en.profile.picture : fr.profile.picture;
            this.buttons = this.urlLang === 'en' ? en.profile.buttons : fr.profile.buttons;

            if (this.profile) {
                this.imageSrc = `https://api.ardeco.app/profile_pictures/${this.profile.profile_picture_id}.png`;
                document.querySelector(`input[name="select_image"][value="${this.profile.profile_picture_id}"]`).checked = true;

                if (this.profile.profile_picture_id === 0) {
                    // document.getElementById("profile_picture_button_reset").style.display = "none";
                }
            } else {
                // document.getElementById("profile_picture_button_reset").style.display = "none";
                document.querySelector('input[name="select_image"][value="0"]').checked = true;
            }
        }
    },
    mounted() {
        const modal = document.getElementById("profile_picture_modal");
        modal.style.display = "none";

        const hideModal = this.hideModal;

        window.onclick = function (event) {
            if (event.target === modal) {
                hideModal();
            }
        };
    },
    methods: {
        toggleModal() {
            const modal = document.getElementById("profile_picture_modal");

            if (modal.style.display === "none") {
                this.showModal();
            } else {
                this.hideModal();
            }
        },
        showModal() {
            const modal = document.getElementById("profile_picture_modal");
            modal.style.display = "block";
        },
        hideModal() {
            const modal = document.getElementById("profile_picture_modal");
            modal.style.display = "none";

            if (this.profile.profile_picture_id) {
                document.querySelector(`input[name="select_image"][value="${this.profile.profile_picture_id}"]`).checked = true;
            } else {
                document.querySelector('input[name="select_image"][value="0"]').checked = true;
            }
        },
        resetSelection() {
            document.getElementsByName("select_image")[0].checked = true;
        },
        async confirmNewPicture() {
            const checked = document.querySelector('input[name="select_image"]:checked');
            if (checked) {
                const value = checked.value;
                if (value <= 0 || value > 4) {
                    await this.resetProfilePictureRequest();
                } else {
                    await this.changeProfilePictureRequest(value);
                }
            } else {
                await this.resetProfilePictureRequest();
            }
        },
        async resetProfilePictureRequest() {
            const response = await fetch(`https://api.ardeco.app/profile_picture/user`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            console.debug("Reset picture result : " + result);

            location.reload();
        },
        async changeProfilePictureRequest(value) {
            const number = Number(value);
            if (Number.isNaN(number)) {
                await this.resetProfilePictureRequest();
                return;
            }

            const json = JSON.stringify({
                "picture_id": Number(value)
            });
            const response = await fetch(`https://api.ardeco.app/profile_picture/user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: json
            });
            const result = await response.json();
            console.debug("Change picture result : " + result);

            location.reload();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "/styles/ProfileSettings.scss";

#profile_picture_modal {
    display: none;
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
