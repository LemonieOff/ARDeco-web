<template>
    <NavbarMenuItem :id="id">
        <NuxtLink no-prefetch :to="{ name: pageName, params: { lang: pageLang }, query: { redirect: pageRedirect } }" class="flex items-center text-AR font-medium text-[#555] hover:text-[#FF5D94] duration-500 group">
            <NuxtImg width="20" height="20" :src="imageSrc" :alt="imageAlt" loading="lazy" class="inline-block max-w-5 mr-2.5 opacity-50 group-hover:opacity-100 duration-500"/>
            <slot></slot>
        </NuxtLink>
    </NavbarMenuItem>
</template>

<script setup lang="ts">
defineProps({
    pageName: String,
    pageLang: String,
    id: String,
    imageSrc: String,
    imageAlt: String,
    pageRedirect: {
        type: String,
        required: false
    },
});
</script>
