<template>
    <div
        class="w-4/5 xl:w-3/5 mx-auto rounded-xl border-2 border-card-border dark:border-card-border-dark bg-card-background dark:bg-card-background-dark text-center mb-12">
        <h2 class="text-xl md:text-3xl text-black dark:text-white border-b-2 border-card-border dark:border-card-border-dark underline py-1">
            {{ title }}
        </h2>
        <div class="*:p-4 md:text-xl">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    title: {
        required: true,
        type: String
    }
});
</script>
