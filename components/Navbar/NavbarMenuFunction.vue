<template>
    <NavbarMenuItem :id="id">
        <NuxtLink no-prefetch href="#" :onclick="fun" class="flex items-center text-AR font-medium text-[#555] hover:text-[#FF5D94] duration-500 group">
            <NuxtImg width="20" height="20" :src="imageSrc" :alt="imageAlt" loading="lazy" class="inline-block max-w-5 mr-2.5 opacity-50 group-hover:opacity-100 duration-500"/>
            <slot></slot>
        </NuxtLink>
    </NavbarMenuItem>
</template>

<script setup lang="ts">
import NavbarMenuItem from "~/components/Navbar/NavbarMenuItem.vue";

defineProps({
    fun: Function,
    id: String,
    imageSrc: String,
    imageAlt: String
});
</script>
