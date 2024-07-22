<template>
    <div id="error" class="notificationBubble">
        {{ message }}
    </div>
    <div id="success" class="notificationBubble">
        {{ message }}
    </div>
</template>
  
<script>
  export default {
    data() {
        return {
            message: ''
        }
    },
    methods: {
        showError(message) {
            const bubble = document.getElementById('error');
            bubble.classList.toggle('visible');
            this.message = message
            setTimeout(() => {
                bubble.classList.remove('visible');
            }, 3000)
        },
        showSuccess(message) {
            const bubble = document.getElementById('success');
            bubble.classList.toggle('visible');
            this.message = message
            setTimeout(() => {
                bubble.classList.remove('visible');
            }, 3000)
        }
    }
  }
</script>
  
<style scoped lang="scss">
@import '~/styles/variables/ColorVariables.scss';

.visible {
    animation: movein 0.5s ease forwards, moveout 0.5s 3s ease forwards;
}

.notificationBubble {
    width: 250px;
    color: white;
    border-radius: 3px;
    font-size: 16px;
    padding: 5px;

    position: fixed;
    text-align: center;
    align-items: center;

    top: 100px;
    left: -300px;
}

#success {
    background: $primary-green;
}

#error {
    background: $primary-red;
}

@keyframes movein {
  from { left: -300px; }
  to   { left: 10px; }
}

@keyframes moveout {
  from { left: 10px; }
  to   { left: -300px; }
}


@media screen and (max-width: 768px) {

    .notificationBubble {
        font-size: 14px;

        top: 45px;
        left: -300px;
    }
}


</style>
  