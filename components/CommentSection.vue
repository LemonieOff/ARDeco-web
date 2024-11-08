<template>
    <div id="newCommentSection" class="commentSection">
        <NuxtImg alt="Own profile picture" class="icon" height="50" v-bind:src="imageSrc" width="50" />
        <input id="commentInput" :placeholder="`${content['writePlaceholder']}`" type="text">
        <NuxtImg id="sendComment" class="icon" src="images/icons/send.webp" @click="postComment" />
    </div>
    <div id="oldCommentSection" class="commentSection text-AR-Grey">
        <div v-for="singleComment in comments.slice().reverse()" :key="singleComment.id" class="comment">
            <div class="topCommentSection">
                <NuxtImg :src="`https://api.ardeco.app/profile_pictures/${singleComment.user.profile_picture_id}.png`"
                         alt="Author profile picture"
                         class="icon"
                         height="50" width="50" />
                <div class="userInfoSection">
                    <div id="commentUserName">{{ singleComment.user.first_name }} {{ singleComment.user.last_name }}
                        ({{ singleComment.user_id }})
                    </div>
                    <div id="commentDate">{{ singleComment.creation_date }}</div>
                </div>
                <NuxtImg v-if="Number(singleComment.user_id) === Number(userId)"
                         :id="'modifyButton_' + singleComment.id"
                         alt="Modify" class="icon modifyButton"
                         src="https://img.icons8.com/color/200/edit.png"
                         @click="modifyComment(singleComment.id)" />
                <NuxtImg v-if="Number(singleComment.user_id) === Number(userId)"
                         :id="'finishModifyButton_' + singleComment.id"
                         alt="Modify" class="icon modifyButton"
                         hidden
                         src="https://cdn-icons-png.flaticon.com/512/1538/1538471.png"
                         @click="modifyComment(singleComment.id)" />
                <NuxtImg v-if="Number(singleComment.user_id) === Number(userId)" id="deleteButton" alt="Delete"
                         class="icon deleteButton"
                         src="images/icons/trash.webp"
                         @click="deleteComment(singleComment.id)" />
            </div>
            <div :id="'existingComment_' + singleComment.id" class="bottomCommentSection">{{ singleComment.comment }}
            </div>
            <input :id="'modifiedComment_' + singleComment.id" :placeholder="`${singleComment.comment}`"
                   class="bottomCommentSection" hidden>
        </div>
    </div>
    <Notifications ref="notifications" />
</template>

<script>
import { isLogged, loggedIn } from "public/ts/checkLogin";

export default {
    name: "CommentSection",
    props: {
        galleryId: Number | null
    },
    data() {
        return {
            imageSrc: "https://api.ardeco.app/profile_pictures/0.png",
            content: this.$content.comments,
            notificationMessages: this.$content.notifications,
            langPrefix: this.$langPrefix,
            comments: [],
            userId: null,
            defaultUserPicture: "https://api.ardeco.app/profile_pictures/0.png"
        };
    },
    mounted() {
        this.userId = localStorage.getItem("userID");
    },
    watch: {
        galleryId() {
            this.getComments();
            this.getUserPicture();
        }
    },
    methods: {
        async getUserPicture() {
            const response = await fetch(`https://api.ardeco.app/profile_picture/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const result = await response.json();
            console.log(result);
            if (result.code == 400) {
                this.$refs.notifications.showError(this.notificationMessages.infoNotReceived);
            }
            this.imageSrc = `https://api.ardeco.app/profile_pictures/${result.data.id}.png`;
        },
        async getComments() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const response = await fetch("https://api.ardeco.app/gallery/" + `${this.galleryId}` + "/comments", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();

            if (result.code == 400) {
                this.$refs.notifications.showError(this.notificationMessages.infoNotReceived);
            }
            this.comments = result.data;

            console.log("Comments :", this.comments);
        },
        async postComment() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }

            const textInput = document.getElementById("commentInput");
            const value = textInput.value;
            const response = await fetch("https://api.ardeco.app/gallery/" + `${this.galleryId}` + "/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "comment": value
                }),
                credentials: "include"
            });

            const result = await response.json();

            if (result.code !== 201) {
                this.$refs.notifications.showError(this.notificationMessages.failedToPostComment);
            } else {
                textInput.value = "";
                this.$refs.notifications.showSuccess(this.notificationMessages.sentComment);
                await this.getComments();
            }
            console.log("POST :", result);
        },
        async deleteComment(commentId) {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }

            const response = await fetch("https://api.ardeco.app/gallery/" + `${this.galleryId}` + "/comments/" + `${commentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();

            if (result.code !== 200) {
                this.$refs.notifications.showError(this.notificationMessages.failedToDeleteComment);
            } else {
                this.$refs.notifications.showSuccess(this.notificationMessages.deletedComment);
                await this.getComments();
            }
            console.log("DELETE :", result);
        },

        async modifyComment(commentId) {
            const modifyButton = document.getElementById("modifyButton_" + commentId);
            const finishModifyButton = document.getElementById("finishModifyButton_" + commentId);
            const existingComment = document.getElementById("existingComment_" + commentId);
            const modifiedComment = document.getElementById("modifiedComment_" + commentId);
            const newMessage = modifiedComment.value;
            if (existingComment.hidden === false) {
                modifiedComment.hidden = false;
                existingComment.hidden = true;
                modifyButton.hidden = true;
                finishModifyButton.hidden = false;
            } else {
                if (newMessage.length != 0) {
                    const response = await fetch("https://api.ardeco.app/gallery/" + `${this.galleryId}` + "/comments/" + `${commentId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "comment": newMessage
                        }),
                        credentials: "include"
                    });

                    const result = await response.json();

                    if (result.code !== 200) {
                        this.$refs.notifications.showError(this.notificationMessages.failedToModifyComment);
                    } else {
                        this.$refs.notifications.showSuccess(this.notificationMessages.modifiedComment);
                        await this.getComments();
                    }
                }
                modifiedComment.hidden = true;
                existingComment.hidden = false;
                modifyButton.hidden = false;
                finishModifyButton.hidden = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
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

.deleteButton {
    border-radius: 0;
    max-height: 35px;
    margin-top: 4%;
    border: none;
    cursor: pointer;
}

.modifyButton {
    border-radius: 0;
    max-height: 35px;
    margin-left: 20vw;
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
