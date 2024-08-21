<template>
    <NuxtLink no-prefetch :id="id" :to="{ name: pageName, params: { lang: pageLang } }"
              class="navbar-option text-AR-Beige h-full content-center px-4 hover:text-black hover:bg-AR-Beige"
              :class="[mobileHidden ? 'hidden sm:inline-block' : 'inline-block']">
        <slot></slot>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
    pageName: String,
    pageLang: String,
    id: String,
    image: Boolean,
    mobileHidden: {
        type: Boolean,
        required: false,
        default: false,
        validator(value, props): boolean {
            if (value === true && props.mobileOnly === true) {
                console.error("This component can't be 'mobileHidden' and 'mobileOnly' at the same time")
                return false;
            }
            return true;
        }
    },
    mobileOnly: {
        type: Boolean,
        required: false,
        default: false
    }
});
</script>
