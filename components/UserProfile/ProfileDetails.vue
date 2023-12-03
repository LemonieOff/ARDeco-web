<template>
    <div class="profile-details">
        <img class="profile-picture" src="../../assets/images/profile-settings/default-profile-picture.png">
        <div class="first-and-last-names">First and last name</div>
        <br>
        <br>
        <hr>
        <button class="buttonSettings" @click="getSettings">Get user settings</button>
        <button class="buttonSettings" @click="getGallery">Get user gallery</button>
        <div id="reponseText" class="buttonSettingsResponse"></div>
    </div>
</template>

<script>
export default {
    name: "ProfileDetails",
    methods: {
        async getSettings() {
            if (localStorage.getItem('userID') == null) {
                console.log('No user found, redirecting to login');
                window.location.href = 'http://localhost:3000/login';
                return;
            };
            const response = await fetch('https://api.ardeco.app/settings', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            document.getElementById('reponseText').innerHTML = result.description;
        },
        async getGallery() {
            const userID = localStorage.getItem('userID');
            if (userID == null) {
                console.log('No user found, redirecting to login');
                window.location.href = 'http://localhost:3000/login';
                return;
            };
            const response = await fetch('https://api.ardeco.app/gallery/user/' + `${userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            document.getElementById('reponseText').innerHTML = result.description;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/styles/ProfileSettings.scss";

.buttonSettings {
    width: 40%;
    margin-left: 30%;
    margin-top: 5%;
}

.buttonSettingsResponse {
    text-align: center;
    width: 80%;
    margin-left: 10%;
    margin-top: 5%;
}
</style>
