<template>
    <div class="w-3/5 ml-[20%] rounded-xl border-2 border-[#846700] dark:border-[#D8DF81] bg-[#F5DBAF] dark:bg-[#4E360E] text-AR-Grey dark:text-[#DECDC3] text-center mb-12">
        <h2 class="text-3xl text-black dark:text-AR-Beige border-b-2 border-[#846700] dark:border-[#D8DF81] underline py-1">{{ title }}</h2>
        <div class="*:p-4 text-xl">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        required: true,
        type: String
    }
});
</script>
