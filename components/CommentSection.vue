<template>
    <div id="newCommentSection" class="commentSection">
        <img id="profileImage" class="icon" v-bind:src="imageSrc" alt="P"/>
        <input id="commentInput" type="text" placeholder="Écrivez un commentaire">
        <img id="sendComment" class="icon" src="~/../../assets/images/icons/send.png" @click="postComment">
        <div id="Error" class="requestReport" hidden></div>
        <div id="Success" class="requestReport" hidden></div>
    </div>
    <div id="oldCommentSection" class="commentSection">
        <div class="comment" v-for="singleComment in comments.slice().reverse()" :key="singleComment.id">
            <div class="topCommentSection">
                <img id="profileImage" class="icon" v-bind:src="defaultUserPicture" alt="P"/>
                <div class="userInfoSection">
                    <div id="commentUserName">Utilisateur {{ singleComment.user_id }} </div>
                    <div id="commentDate">{{ singleComment.creation_date }}</div>
                </div>
            </div>
            <div class="bottomCommentSection">{{ singleComment.comment }}</div>
        </div>
    </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";
import {isLogged, loggedIn} from "public/js/checkLogin";

export default {
    name: "CommentSection",
    props: {
        urlLang: String | null,
        galleryId: Number | null
    },
    data() {
        return {
            imageSrc: "https://api.ardeco.app/profile_pictures/0.png",
            content: {},
            langPrefix: "/",
            comments: [],
            // usersThatCommended: [],
            defaultUserPicture: "https://api.ardeco.app/profile_pictures/0.png"
        }
    },
    mounted() {
        const body = document.body
        body.style.backgroundColor = "#F4F4F4";
        let lang = this.urlLang

        if (lang !== 'en' && lang !== 'fr') {
            if (localStorage.getItem('lang')) {
                lang = localStorage.getItem('lang');
            } else {
                lang = 'fr';
            }
        }

        this.getComments();
        this.getUserPicture();
        // this.content = lang === 'en' ? en.comments : fr.comments;
    },
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
            this.imageSrc = `https://api.ardeco.app/profile_pictures/${result.data}.png`
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

            if (result.code != 201) {
                this.showError(result.description)
            } else {
                this.showSuccess(result.description)
                this.getComments()
            }
            console.log("POST :", result);
        },
        // async deleteComment() {
        //     await isLogged();
        //     if (!loggedIn) {
        //         location.href = this.langPrefix + "login";
        //     }

        //     const text = document.getElementById('commentInput').textContent;
        //     const commentId = 0;
        //     const response = await fetch('https://api.ardeco.app/gallery/' + `${this.galleryId}` + '/comments' + `${commentId}`, {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         credentials: 'include',
        //     });

        // if (!response.ok) {
        //     this.showError(response.description)
        // } else {
        //     this.showSuccess(response.description)
        // }

        //     const result = await response.json();
        //     console.log(result);furnitureName
        // },
        async showError(errorExplanation) {
            const error = document.getElementById('Error');
            const success = document.getElementById('Success');

            success.hidden = true;
            error.hidden = false;
            error.textContent = errorExplanation;
        },
        async showSuccess(successExplanation) {
            const error = document.getElementById('Error');
            const success = document.getElementById('Success');
            const textArea = document.getElementById('commentInput');

            success.hidden = false;
            error.hidden = true;
            success.textContent = successExplanation;
            textArea.value = "";
        }
    },
};
</script>

<style scoped lang="scss">
@import '~/styles/variables/ColorVariables.scss';

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
    width: 55%;
    margin-left: 25%;
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
    margin: auto;
    margin-left: 2.5%;
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
    margin-left: 12%;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    border: 2px outset $primary-black;
}

</style>
