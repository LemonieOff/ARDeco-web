<template>
    <div class="container">
        <div class="text-center font-bold text-xl md:text-4xl my-8 title">{{ content.galleryDetailsTitle }}</div>
        <div style="display: inline-flex; width: 100%; margin-bottom: 20px">
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
            <div style="width: 20%;">
                <div class="stage">
                    <div class="heart" :class="{ 'is-active': isLiked }" @click="handleLike"></div>
                    <div id="numberOfLikes"></div>
                </div>
                <div class="rating" @click="toggleStar">
                    <div class="star" :class="{ 'filled': isStarFilled }"></div>
                </div>
            </div>
        </div>
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
    </div>
    <Notifications ref="notifications"/>
    <CommentSection :galleryId="this.GalleryData.id" :notifications="this.$refs.notifications"/>
</template>

<script>
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
            content: this.$content.gallery,
            notificationsMessages: this.$content.notifications,
            urlLang: this.$urlLang,
            langPrefix: this.$langPrefix,
            isStarFilled: false,
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
        await this.getFavorites();
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
            this.$refs.notifications.showSuccess(this.notificationsMessages.galleryBelongToUser)
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
                document.getElementById('startReportButton').textContent = "Signaler";
            } else {
                this.$refs.notifications.showSuccess(this.notificationsMessages.pleaseReportDetails);
                document.getElementById('reportDescription').hidden = false;
                document.getElementById('confirmReport').hidden = false;
                document.getElementById('startReportButton').textContent = "Annuler";
            }
        },

        async reportGallery() {
            const text = document.querySelector('#reportDescription').value;
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
                    this.$refs.notifications.showError(this.notificationsMessages.galleryAlreadyReportedOrFailed);
                    throw new Error("Failed to report gallery");
                } else {
                    await this.startReport();
                    document.getElementById('reportDescription').textContent = "";
                    this.$refs.notifications.showSuccess(this.notificationsMessages.reportSuccessful);
                }
            } catch (error) {
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
                this.$refs.notifications.showSuccess(this.notificationsMessages.informationsUpdated);
            } else {
                this.$refs.notifications.showError(this.notificationsMessages.informationsUpdateFailed);
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
                this.$refs.notifications.showError(this.notificationsMessages.infoNotReceived);
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
                this.$refs.notifications.showError(this.notificationsMessages.infoNotReceived);
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
                this.$refs.notifications.showError(this.notificationsMessages.couldntLikeOrDislike);
            }
            this.getNumberOfLikes();
            response = null;
        },

        async getFavorites() {
            const response = await fetch('https://api.ardeco.app/favorite/gallery', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();

            for (let singleData of result.data) {
                if (singleData.id === this.GalleryData.id) {
                    this.isStarFilled = true;
                }
            }

            if (result.code === 404) {
                this.isStarFilled = false;
            } else if (result.code != 200) {
                this.$refs.notifications.showError(this.notificationsMessages.infoNotReceived);
            }
        },

        async toggleStar() {
            let response;
            if (this.isStarFilled === false) {
                response = await fetch('https://api.ardeco.app/favorite/gallery/' + this.GalleryData.id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
            } else {
                response = await fetch('https://api.ardeco.app/favorite/gallery/' + this.GalleryData.id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
            }

            const result = await response.json();
            console.log("toggleStar", result);
            if (result.code === 200 || result.code === 201) {
                this.isStarFilled = !this.isStarFilled;
            } else {
                this.$refs.notifications.showError(this.notificationsMessages.couldntAddFavorite);
            }
            await this.getFavorites();
        },
    }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables/ColorVariables.scss';

.title {
    text-align: center;
    font-weight: bold;
}

.container {
    margin-left: 8.5%;
}

.card {
    width: 60%;
    margin-left: 10%;
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
    margin-left: 10%;
    background-color: rgb(191, 178, 170);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1.75vh;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.custom-button:hover {
    background-color: #5d5249; /* Couleur de survol */
}

#reportDescription {
    margin-left: 2.5%;
    width: 33%;
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
    margin-left: 50%;
    margin-top: 25%;
    transform: translate(-50%, -50%);
    display: inline-flex;
}

#numberOfLikes {
    font-size: 1.75vh;
    align-content: center;
}

.rating {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -20px;
}

.star {
    width: 50px;
    height: 50px;
    background: url('https://icones.pro/wp-content/uploads/2021/02/icone-etoile-vide-jaune.png') no-repeat;
    background-size: contain;
    cursor: pointer;
    transition: 0.3s ease;
}

.star.filled {
    background: url('https://cdn1.iconfinder.com/data/icons/essentials-soft-fill-1/60/Star-ui-ux-stars-rating-512.png') no-repeat;
    background-size: contain;
}

</style>
