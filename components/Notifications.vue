<template>
    <div class="flex flex-col fixed top-20 left-2.5 z-0">
        <TransitionGroup name="message">
            <div v-for="message in messages" :key="message.id" :class="message.type === 'success' ? 'success' : 'error'"
                 class="w-60 text-white rounded p-1 text-center mb-2">
                {{ message.message }}
            </div>
        </TransitionGroup>
    </div>
</template>

<script lang="ts" setup>
const messages = ref<{ id: number, type: "success" | "error", message: string }[]>([]);
const latestId = ref(0);

const showError = (message: string) => {
    messages.value.push({
        id: latestId.value++,
        type: "error",
        message: message
    });
    setTimeout(() => {
        messages.value.shift();
    }, 3000);
};

const showSuccess = (message: string) => {
    messages.value?.push({
        id: latestId.value++,
        type: "success",
        message: message
    });
    setTimeout(() => {
        messages.value?.shift();
    }, 3000);
};

defineExpose({
    showError,
    showSuccess
});
</script>

<style lang="scss" scoped>
@use '@/styles/variables/ColorVariables.scss';

.message-move,
.message-enter-active,
.message-leave-active {
    transition: all 0.5s ease;
}

.message-enter-from,
.message-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}

.success {
    background: ColorVariables.$primary-green;
}

.error {
    background: ColorVariables.$primary-red;
}
</style>
