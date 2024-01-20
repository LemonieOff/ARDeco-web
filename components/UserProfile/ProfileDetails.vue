<template>
    <div class="profile-details">
        <img class="profile-picture" src="../../assets/images/profile-settings/default-profile-picture.png">
        <div class="first-and-last-names">First and last name</div>
        <br>
        <br>
        <hr>
        <button class="buttonSettings" @click="getSettings">Get user settings</button>
        <div class="switches">
            Language: ENG
            <label class="switch">
                <input id="lang" type="checkbox">
                <span class="slider round"></span>
            </label>FR
            <br>
            Notifications: OFF
            <label class="switch">
                <input id="notif" type="checkbox">
                <span class="slider round"></span>
            </label>
            ON
            <br>
            Audio: OFF
            <label class="switch">
                <input id="audio" type="checkbox">
                <span class="slider round"></span>
            </label>
            ON
        </div>
        <button class="buttonSettings" @click="setSettings">Set user settings</button>
        <button class="buttonSettings" @click="getGallery">Get user gallery</button>
        <button class="buttonSettings" @click="setItemVisibility">Change gallery item visibility</button>
        <input class="buttonSettings" id="itemInputID" placeholder="Item ID">
        <div style="text-align: center;">
            <button id="visibilityButton" style="background-color: green;" @click="changeVisibility">Visible</button>
            <br>
        </div>
        <button class="buttonSettings" @click="getArchive">Get compagny archive</button>
        <button class="buttonSettings" @click="deleteArchive">Empty compagny archive</button>
        <button class="buttonSettings" @click="getApiToken">Reset company API key</button>
        <div id="reponseText" class="buttonSettingsResponse"></div>
    </div>
</template>

<script>
export default {
    name: "ProfileDetails",
    methods: {
        async deleteArchive() {
            if (localStorage.getItem('userID') == null) {
                console.log('No user found, redirecting to login');
                window.location.href = 'http://localhost:3000/login';
                return;
            };
            const userID = localStorage.getItem('userID');
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const response = await fetch('https://api.ardeco.app/archive/' + `${userID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200) {
                document.getElementById('reponseText').innerHTML = 'Archive cleared';
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
        },
        async getArchive() {
            if (localStorage.getItem('userID') == null) {
                console.log('No user found, redirecting to login');
                window.location.href = 'http://localhost:3000/login';
                return;
            };
            const userID = localStorage.getItem('userID');
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const response = await fetch('https://api.ardeco.app/archive/' + `${userID}` + '?company_api_key=' + `${COMPANY_API_TOKEN}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            document.getElementById('reponseText').innerHTML = '';
            if (result.code == 200 && result.data.length == 0) {
                document.getElementById('reponseText').innerHTML = 'Archive empty';
            } else if (result.code == 200) {
                for (let i = 0; i < result.data.length; i++) {
                    document.getElementById('reponseText').innerHTML += 
                        '<p>' + (i + 1) + '. ' + `${result.data[i].company_name}` +
                        ' - ' + `${result.data[i].name}` + 
                        ' - ' + `${result.data[i].rooms}` +
                        ' - ' + `${result.data[i].styles}` +
                        ' - ' + `${result.data[i].price}` + '€' +  '</p>';
                }
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
        },
        async setSettings() {
            if (localStorage.getItem('userID') == null) {
                console.log('No user found, redirecting to login');
                window.location.href = 'http://localhost:3000/login';
                return;
            };
            const userID = localStorage.getItem('userID');
            let lang = 'en';
            const notifs = document.querySelector('#notif').checked;
            const audio = document.querySelector('#audio').checked;
            if (document.querySelector('#lang').checked) {
                lang = 'fr';
            }
            console.log(lang, notifs, audio, userID, 'https://api.ardeco.app/settings');
            const response = await fetch('https://api.ardeco.app/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "language": lang,
                    "notifications_enabled": notifs,
                    "sounds_enabled": audio
                }),
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200) {
                document.getElementById('reponseText').innerHTML = result.description;
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
        },
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
            if (result.code == 200) {
                document.getElementById('reponseText').innerHTML =
                    'Language: ' + `${result.data.language}` +
                    '<br>Notifications: ' + `${result.data.notifications_enabled}` + 
                    '<br>Audio: ' + `${result.data.sounds_enabled}`;
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
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
            document.getElementById('reponseText').innerHTML = '';
            if (result.code == 200 && result.data.length == 0) {
                document.getElementById('reponseText').innerHTML = 'Gallery empty';
            } else {
                for (let i = 0; i < result.data.length; i++) {
                    document.getElementById('reponseText').innerHTML += 
                        '<p>' + (i + 1) + '. ' + `${result.data[i].name}` +
                        ' - ' + `${result.data[i].room_type}` + 
                        ' - ' + `${result.data[i].description}` +
                        ' - ' + `${result.data[i].id}` + '</p>';
                }
            }
        },
        async setItemVisibility() {
            if (localStorage.getItem('userID') == null) {
                console.log('No user found, redirecting to login');
                window.location.href = 'http://localhost:3000/login';
                return;
            } else if (document.getElementById('itemInputID').value == "") {
                document.getElementById('reponseText').innerHTML = "Please precise the id of the item you want to change.";
                return;
            }
            let bool = false;
            if (document.getElementById('visibilityButton').innerHTML == 'Visible') {
                bool = true;
            }
            const itemInputID = document.getElementById('itemInputID').value;
            console.log('https://api.ardeco.app/gallery/' + itemInputID);
            const response = await fetch('https://api.ardeco.app/gallery/' + itemInputID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "visibility": bool
                }),
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code == 200) {
                document.getElementById('reponseText').innerHTML = result.description;
                document.getElementById('itemInputID').value = "";
            } else {
                document.getElementById('reponseText').innerHTML = result.description;
            }
        },
        async changeVisibility() {
            let content = document.getElementById('visibilityButton').innerHTML;
            if (content == 'Visible') {
                document.getElementById('visibilityButton').innerHTML = 'Invisible';
                document.getElementById('visibilityButton').style = "background-color: red;";
            } else if (content == 'Invisible') {
                document.getElementById('visibilityButton').innerHTML = 'Visible';
                document.getElementById('visibilityButton').style = "background-color: green;";
            }
        },
        async getApiToken() {
            const userID = localStorage.getItem('userID');
            if (userID == null) {
                console.log('No user found, redirecting to login');
                window.location.href = 'http://localhost:3000/login';
                return;
            };
            const response = await fetch('https://api.ardeco.app/company/requestToken', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            localStorage.setItem('COMPANY_API_TOKEN', result.data);
            document.getElementById('reponseText').innerHTML = result.description;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/styles/ProfileSettings.scss";

.buttonSettings {
    width: 60%;
    margin-left: 20%;
    margin-top: 1%;
}

.buttonSettingsResponse {
    text-align: center;
    width: 80%;
    margin-left: 10%;
    margin-top: 5%;
}

.switches {
    margin-top: 5%;
    width: 60%;
    margin-left: 20%;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
