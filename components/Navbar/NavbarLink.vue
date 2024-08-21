<template>
    <NuxtLink no-prefetch :id="id" :to="{ name: pageName, params: { lang: pageLang } }"
              class="navbar-option inline-block text-AR-Beige h-full content-center px-4 hover:text-black hover:bg-AR-Beige">
        <slot></slot>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
    pageName: String,
    pageLang: String,
    id: String,
    image: Boolean
});
</script>
