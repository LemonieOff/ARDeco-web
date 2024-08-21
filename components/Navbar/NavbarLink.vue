<template>
    <NuxtLink no-prefetch :id="id" :to="{ name: pageName, params: { lang: pageLang } }"
              class="navbar-option text-AR-Beige content-center hover:text-black hover:bg-AR-Beige"
              :class="[!mobileDisplay ? 'h-full px-4' : 'w-full py-4 last:rounded-br-2xl', mobileHidden ? 'hidden sm:inline-block' : 'inline-block']">
        <slot></slot>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
    pageName: String,
    pageLang: String,
    id: String,
    image: Boolean,
    mobileDisplay: Boolean,
    mobileHidden: {
        type: Boolean,
        required: false,
        default: false
    }
});
</script>
