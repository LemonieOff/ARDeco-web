<template>
    <div id="newCommentSection" class="commentSection">
        <NuxtImg width="50" height="50" class="icon" v-bind:src="imageSrc" alt="Own profile picture"/>
        <input id="commentInput" type="text" :placeholder="`${content['writePlaceholder']}`">
        <NuxtImg id="sendComment" class="icon" src="images/icons/send.webp" @click="postComment"/>
    </div>
    <div id="oldCommentSection" class="commentSection">
        <div class="comment" v-for="singleComment in comments.slice().reverse()" :key="singleComment.id">
            <div class="topCommentSection">
                <NuxtImg width="50" height="50" class="icon" v-bind:src="defaultUserPicture" v-if="Number(singleComment.user_id) !== Number(userId)" alt="User profile picture"/>
                <NuxtImg width="50" height="50" class="icon" v-bind:src="imageSrc" v-if="Number(singleComment.user_id) === Number(userId)" alt="Own profile picture"/>
                <div class="userInfoSection">
                    <div id="commentUserName">{{ content.user }} {{ singleComment.user_id }} </div>
                    <div id="commentDate">{{ singleComment.creation_date }}</div>
                </div>
                <NuxtImg id="deleteButton" class="icon" src="images/icons/trash.webp" alt="Delete" v-if="Number(singleComment.user_id) === Number(userId)" @click="deleteComment(singleComment.id)"/>
            </div>
            <div class="bottomCommentSection">{{ singleComment.comment }}</div>
        </div>
    </div>
    <Notifications ref="notifications"/>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import {isLogged, loggedIn} from "public/ts/checkLogin";
import Notifications from "@/components/Notifications.vue";

export default {
    name: "CommentSection",
    components: {
        Notifications,
    },
    props: {
        galleryId: Number | null,
        notifications: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            imageSrc: "https://api.ardeco.app/profile_pictures/0.png",
            content: this.$lang === 'en' ? en.comments : fr.comments,
            notificationMessages: this.$lang === 'en' ? en.notifications : fr.notifications,
            langPrefix: this.$langPrefix,
            comments: [],
            userId: null,
            defaultUserPicture: "https://api.ardeco.app/profile_pictures/0.png"
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userID')
    },
    watch: {
        galleryId() {
            this.getComments()
            this.getUserPicture()
        }
    },
    inject: ["notifications"],
    methods: {
        async getUserPicture() {
            const response = await fetch(`https://api.ardeco.app/profile_picture/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const result = await response.json();
            console.log(result)
            if (result.code == 400) {
                this.notifications.showError(this.notificationMessages.infoNotReceived);
            }
            this.imageSrc = `https://api.ardeco.app/profile_pictures/${result.data.id}.png`
        },
        async getComments() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const response = await fetch('https://api.ardeco.app/gallery/' + `${this.galleryId}` + '/comments', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();

            if (result.code == 400) {
                this.notifications.showError(this.notificationMessages.infoNotReceived);
            }
            this.comments = result.data

            console.log("Comments :", this.comments);
        },
        async postComment() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }

            const value = document.getElementById('commentInput').value;
            const textContent = document.getElementById('commentInput').textContent;
            console.log("value :", value)
            console.log("textContent :", textContent)
            const response = await fetch('https://api.ardeco.app/gallery/' + `${this.galleryId}` + '/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "comment": value
                }),
                credentials: 'include',
            });

            const result = await response.json();

            if (result.code !== 201) {
                this.notifications.showError(this.notificationMessages.failedToPostComment);
            } else {
                await this.getComments()
            }
            console.log("POST :", result);
        },
        async deleteComment(commentId) {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }

            const response = await fetch('https://api.ardeco.app/gallery/' + `${this.galleryId}` + '/comments/' + `${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();

            if (result.code !== 200) {
                this.notifications.showError(this.notificationMessages.failedToDeleteComment);
            } else {
                await this.getComments()
            }
            console.log("DELETE :", result);
        },
    },
};
</script>

<style scoped lang="scss">
@import '@/styles/variables/ColorVariables.scss';

.icon {
    margin: 10px;
    max-height: 50px;
    border-radius: 50%;
    border: 1px outset $primary-black;
}

#newCommentSection {
    margin-top: 2.5%;
    display: flex;
}

#oldCommentSection {
    margin-top: 2.5%;
    width: 45%;
    margin-left: 30%;
}

.commentSection {
    width: 55vw;
    margin-left: 25vw;
}

#commentInput {
    border: 1px outset $primary-black;
    border-radius: 5px;
    width: 70%;
    margin-left: 2.5%;
    margin-top: 10px;
    margin-bottom: 10px;
}

#commentInput::placeholder {
    text-align: center;
}

#sendComment {
    margin: auto auto auto 2.5%;
    padding: 5px;
    max-height: 50px;
    border-radius: 10px;
    background-color: $secondary-white;
}

#sendComment:hover {
    cursor: pointer;
}

.requestReport {
    width: 12.5%;
    font-size: 11px;
    text-align: center;
    margin: auto;
}

#Error {
    color: $primary-red;
}

#Success {
    color: green;
}

.comment {
    margin-bottom: 25px;
}

.topCommentSection {
    width: 40vw;
    display: flex;
}

.userInfoSection {
    text-align: start;
    margin-top: 25px;
    height: 50%;
}

#commentUserName {
    font-size: 11px;
}

#commentDate {
    font-size: 13px;
    color: gray;
}

.bottomCommentSection {
    background-color: $secondary-white;
    width: 80%;
    margin-left: 70px;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    border: 2px outset $primary-black;
}

#deleteButton {
    border-radius: 0;
    max-height: 35px;
    margin-left: 25vw;
    margin-top: 4%;
    border: none;
    cursor: pointer;
}

@media screen and (max-width: 768px) {
    .commentSection {
        margin-left: 5%;
        width: 90%;
    }

    #oldCommentSection {
        margin-top: 2.5%;
        width: 90%;
        margin-left: 5%;
    }

    .topCommentSection {
        width: 100%;
    }

    .userInfoSection {
        margin-top: 25px;
        height: auto;
    }

    #commentUserName {
        font-size: 9px;
    }

    #commentDate {
        font-size: 11px;
        color: gray;
    }

    #deleteButton {
        margin-top: 20px;
        margin-left: 25%;
    }

    .bottomCommentSection {
        width: 90%;
        margin-left: 5%;
        height: auto;
        font-size: 12px;
    }

}

</style>
