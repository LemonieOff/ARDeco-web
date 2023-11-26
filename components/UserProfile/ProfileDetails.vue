<template>
    <div class="profile-details">
        <img class="profile-picture" src="../../assets/images/profile-settings/default-profile-picture.png">
        <div class="first-and-last-names">First and last name</div>
        <button @click="getSettings">Get user settings</button>
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
                    'Cookie': 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImVtYWlsIjoidG90b0BnbWFpbC5jb20iLCJpYXQiOjE3MDA5NTkzMzAsImV4cCI6MTcwMTA0NTczMH0.VIETut94ViiIDE7MCHGmD034CUbI7VgUndpq7b0VOUI; Path=/; Domain=api.ardeco.app;'
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/styles/ProfileSettings.scss";
</style>
