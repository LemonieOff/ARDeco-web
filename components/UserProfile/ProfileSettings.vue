<template>
    <div class="h-screen">
        <div class="title"> Your profile </div>
        <div class="content">
            <div class="favorite-themes">
                <div class="sub-title">
                    Your favorites themes
                </div>
                <div class="empty-text-content"></div>
            </div>
            <div class="profile-details">
                <img class="profile-picture" src="../../assets/images/profile-settings/default-profile-picture.png">
                <div class="first-and-last-names">First and last name</div>
            </div>
            <div class="recent-purchases">
                <div class="sub-title">Your recent purchases</div>
                <div class="empty-text-content"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileSettings"
}
</script>

<style lang="scss" scoped>

.title {
  display: inline-block;
  font-size: 1.75vw;
  top: 10%;
  text-align: center;
  position: relative;
  left: 40%;
  width: 20%;
}

.content {
    display: flex;
    width: 80%;
    height: 60%;
    margin-top: 10%;
    margin-left: 10%;
}

.favorite-themes {
    width: 30%;
}

.profile-details {
    width: 40%;
}

.recent-purchases {
    width: 30%;
}

.profile-picture {
    margin-top: 5%;
    height: auto;
    width: 60%;

    margin-left: 20%;
}

.first-and-last-names {
    width: 40%;
    height: 5%;

    text-align: center;
    margin-top: 5%;
    margin-left: 30%;
    font-size: 24px;
}

.sub-title {
    color: #7D7C7A;
    text-align: center;
    font-size: 20px;
    font-style: normal;
}

.empty-text-content {
    width: 80%;
    height: 85%;

    margin-left: 10%;
    margin-top: 5%;

    background-color: white;
}

</style>
