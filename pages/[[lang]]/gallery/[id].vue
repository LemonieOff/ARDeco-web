<template>
    <div class="container">
        <div class="text-center font-bold text-xl md:text-4xl my-8">{{ content.galleryDetailsTitle }}</div>
        <div class="card">
            <div class="card-content">
                <div class="card-item">
                    <strong>{{ content.id }}:</strong> {{ GalleryData.id }}
                </div>
                <div class="card-item">
                    <strong>{{ content.name }}:</strong> {{ GalleryData.name }}
                </div>
                <div class="card-item">
                    <strong>{{ content.description }}:</strong> {{ GalleryData.description }}
                </div>
                <div class="card-item" v-if="GalleryData.user_id">
                    <strong>{{ content.author }}:</strong> {{ UserData.data.lastname }} {{ UserData.data.firstname }}
                </div>
                <div class="card-item">
                    <strong>{{ content.rooms }}:</strong> {{ GalleryData.room_type }}
                </div>
                <div class="card-item">
                    <strong>{{ content.furnitureTable }}:</strong> {{ GalleryData.furniture }}
                </div>
            </div>
        </div>
        <br>
        <button class="custom-button" @click="goToGallery"> {{ content.goBack }}</button>
        <button class="custom-button" id="startReportButton" style="margin-left: 2.5%" @click="startReport">
            {{ content.report }}
        </button>
        <button v-if="this.galleryUserId === this.userID" class="custom-button" style="margin-left: 2.5%" @click="setItemVisibility(this.GalleryData.id, this.GalleryData.visibility)">
            <span v-if="this.GalleryData.visibility === false">{{ content.show }}</span>
            <span v-if="this.GalleryData.visibility === true">{{ content.hide }}</span>
        </button>
        <input type="text" id="reportDescription" placeholder="Décrivez le problème ici (optionnel)" hidden>
        <button id="confirmReport" class="custom-button" style="margin-left: 2.5%" @click="reportGallery" hidden>
            {{ content.confirm }}
        </button>
        <div id="textEncouragement" hidden> {{ content.textReportEncouragement }}</div>
        <div id="errorText" hidden></div>
        <div id="successText"></div>
        <div class="stage">
            <div class="heart" :class="{ 'is-active': isLiked }" @click="handleLike"></div>
            <div id="numberOfLikes"></div>
        </div>
    </div>
    <Notifications ref="notifications"/>
    <CommentSection :galleryId="this.GalleryData.id" :notifications="this.$refs.notifications"/>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import {isLogged, loggedIn} from "public/ts/checkLogin";
import Notifications from "@/components/Notifications.vue";
import CommentSection from "@/components/CommentSection.vue";
import $ from 'jquery';

export default {
    name: "Gallery",
    components: {
        Notifications,
        CommentSection
    },
    data() {
        return {
            galleryUserId: 0,
            userID: 0,
            GalleryData: [],
            UserData: [],
            errorMessage: '',
            successMessage: '',
            isLiked: false,
            content: this.$lang === 'en' ? en.gallery : fr.gallery,
            urlLang: this.$urlLang,
            langPrefix: this.$langPrefix,
        };
    },
    provide() {
        return {
            notifications: this.$refs.notifications,
        };
    },
    async mounted() {
        await this.checkLogin();
        const id = this.$route.params.id;
        await this.getGallery(id);
        await this.getNumberOfLikes();
        await this.getLikeStatus();
        // console.log(this.galleryUserId, "/", this.userID)

        this.$nextTick(() => {
            this.notifications = this.$refs.notifications;
        });

        $(function() {
            $(".heart").on("click", function() {
                $(this).toggleClass("is-active");
            });
        });

        if (this.galleryUserId === this.userID) {
            this.$refs.notifications.showSuccess("You created this gallery !")
        }
    },
    methods: {
        async checkLogin() {
            const userID_TMP = await isLogged();
            if (!loggedIn) {
                location.href = this.$langPrefix + "login";
            }
            this.userID = Number(userID_TMP);
        },

        async getGallery(id) {
            try {
                const userID = localStorage.getItem('userID');
                if (!userID) {
                    throw new Error('No user found, redirecting to login');
                }

                const response = await fetch(`https://api.ardeco.app/gallery/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                // TODO : Divide into better props, and adapt to ?user_details url (with new user result)
                // console.log("RESULT : ", result);
                this.GalleryData = result.data;
                this.galleryUserId = this.GalleryData.user.id;
                // console.log(this.galleryUserId, "/", this.userID)
            } catch (error) {
                console.error(error.message);
                this.errorMessage = error.message;
            }
            await this.getUserFullName(this.GalleryData.user_id);
        },

        async getUserFullName(userId) {
            try {
                const response = await fetch(`https://api.ardeco.app/user/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user information");
                }
                this.UserData = await response.json();
            } catch (error) {
                console.error("Error fetching user information:", error);
                return "Unknown user";
            }
        },

        async goToGallery() {
            this.$router.push(`${this.langPrefix}gallery`);
        },

        async startReport() {
            let active = false;
            if (document.getElementById('reportDescription').hidden === false) {
                active = true;
            }

            if (active) {
                document.getElementById('reportDescription').hidden = true;
                document.getElementById('confirmReport').hidden = true;
                document.getElementById('textEncouragement').hidden = true;
                document.getElementById('startReportButton').textContent = "Signaler";
                document.getElementById('errorText').hidden = true;
            } else {
                document.getElementById('reportDescription').hidden = false;
                document.getElementById('confirmReport').hidden = false;
                document.getElementById('textEncouragement').hidden = false;
                document.getElementById('startReportButton').textContent = "Annuler";
                document.getElementById('successText').hidden = true;
            }
        },

        async reportGallery() {
            const text = document.querySelector('#reportDescription').value;
            const errorDiv = document.getElementById('errorText');
            const successDiv = document.getElementById('successText');
            try {
                const response = await fetch(`https://api.ardeco.app/gallery_report/${this.GalleryData.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify([{
                        "report_text": text
                    }]),
                    credentials: 'include',
                });
                const result = await response.json();
                // console.log(result)
                if (!response.ok) {
                    successDiv.hidden = true;
                    errorDiv.hidden = false;
                    errorDiv.innerText = result.description;
                    throw new Error("Failed to report gallery");
                } else {
                    await this.startReport();
                    document.getElementById('reportDescription').textContent = "";
                    successDiv.hidden = false;
                    errorDiv.hidden = true;
                    successDiv.innerText = result.description;
                }
            } catch (error) {
                successDiv.hidden = true;
                errorDiv.hidden = false;
                errorDiv.innerText = result.description;
                console.error("Error fetching user information:", error);
                return "Unknown user";
            }
        },

        async setItemVisibility(itemInputID, activeOrNot) {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const response = await fetch('https://api.ardeco.app/gallery/' + itemInputID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "visibility": !activeOrNot
                }),
                credentials: 'include',
            });

            const result = await response.json();
            // console.log(result);
            if (result.code === 200) {
                this.$refs.notifications.showSuccess("Successfully changed your gallery's visibility !");
            } else {
                this.$refs.notifications.showError("Error : Failed to hide or show your gallery, try again later.");
            }
            location.reload();
        },

        async getNumberOfLikes() {
            const response = await fetch('https://api.ardeco.app/likes/gallery/' + this.GalleryData.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code === 200) {
                document.getElementById("numberOfLikes").innerHTML = result.data;
            } else {
                this.$refs.notifications.showError("Error: Impossible de récupérer les informations des likes, réessayez plus tard.");
            }
        },

        async getLikeStatus() {
            const response = await fetch('https://api.ardeco.app/likes/user/' + this.userID + '/gallery/' + this.GalleryData.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log("getLikeStatus:", result);
            if (result.code === 200) {
                this.isLiked = result.data === true;
            } else {
                this.$refs.notifications.showError("Error: Impossible de savoir si l'utilisateur a liké cette galerie, réessayez plus tard.");
            }
        },

        async handleLike() {
            let response;
            if (this.isLiked == false) {
                response = await fetch('https://api.ardeco.app/likes/gallery/' + this.GalleryData.id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
            } else {
                response = await fetch('https://api.ardeco.app/likes/gallery/' + this.GalleryData.id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
            }

            const result = await response.json();
            console.log(result);
            if (result.code === 201) {
                this.isLiked = !this.isLiked;
            } else {
                this.$refs.notifications.showError("Error: Impossible de liker ou unlike la galerie, réessayez plus tard.");
            }
            this.getNumberOfLikes();
            response = null;
        },
    }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables/ColorVariables.scss';

.title {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
}

.container {
    width: 80%;
    margin-left: 10%;
}

.card {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background: linear-gradient(to bottom right, #f3f3f3, #e0e0e0);
    color: #333;
}

.card-content {
    padding: 20px;
}

.card-item {
    margin-bottom: 15px;
}

.custom-button {
    background-color: rgb(191, 178, 170);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.custom-button:hover {
    background-color: #5d5249; /* Couleur de survol */
}

#reportDescription {
    margin-left: 2.5%;
    width: 50%;
    height: 5vh;
    border-radius: 5px;
    text-align: center;
}

#confirmReport {
    background-color: $primary-red;
}

#confirmReport:hover {
    background-color: #F4F4F4;
    border: 1px solid $primary-red;
    color: $primary-red;
}

.yourCreation {
    color: green;
    margin-left: 25px;
}

// Animation du like (test)

.heart {
    width: 100px;
    height: 100px;
    background: url("https://cssanimation.rocks/images/posts/steps/heart.png") no-repeat;
    background-position: 0 0;
    cursor: pointer;
    transition: background-position 1s steps(28);
    transition-duration: 0s;
    
    &.is-active {
        transition-duration: 1s;
        background-position: -2800px 0;
    }
}

.stage {
    margin-left: 90%;
    margin-top: -1.5%;
    width: 10%;
    transform: translate(-50%, -50%);
    display: inline-flex;
}

#numberOfLikes {
    font-size: 20px;
    align-content: center;
}

</style>
