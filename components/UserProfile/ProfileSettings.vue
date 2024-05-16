<template>
    <div>
        <div class="content">
            <FavoriteThemes :urlLang=urlLang></FavoriteThemes>
            <div @click="showModal" class="image-container profile-picture">
                <img v-bind:src="imageSrc" alt="Profile picture">
                <span class="edit-icon">&#9998;</span>
            </div>
            <RecentPurchases :urlLang=urlLang></RecentPurchases>
        </div>
        <div id="profile_picture_modal">
            <div id="profile_picture_div">sdghjshd</div>
        </div>
    </div>
</template>

<script>
import FavoriteThemes from "~/components/UserProfile/FavoriteThemes.vue"
import RecentPurchases from "~/components/UserProfile/RecentPurchases.vue"
import "assets/images/profile-settings/default-profile-picture.png";

export default {
    name: "ProfileSettings",
    setup() {
        const imageSrc = ref("https://api.ardeco.app/profile_pictures/0.png");

        return {
            imageSrc
        }
    },
    props: {
        urlLang: String | null
    },
    inject: ['profile'],
    components: {
        FavoriteThemes,
        RecentPurchases
    },
    watch: {
        profile() {
            console.log("test");
            if (this.profile) {
                this.imageSrc = `https://api.ardeco.app/profile_pictures/${this.profile.profile_picture_id}.png`;
            }
        }
    },
    mounted() {
        const modal = document.getElementById("profile_picture_modal");
        modal.style.display = "none";

        const hideModal = this.showModal;

        window.onclick = function(event) {
            if (event.target === modal) {
                hideModal();
            }
        };
    },
    methods: {
        showModal() {
            const modal = document.getElementById("profile_picture_modal");

            if (modal.style.display === "none") {
                modal.style.display = "block";
            } else {
                modal.style.display = "none";
            }
        },
        hideModal() {
            const modal = document.getElementById("profile_picture_modal");
            modal.style.display = "none";
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
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.5);
}

#profile_picture_modal #profile_picture_div {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 75%;
    height: 45%;
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
