<template>
    <li :id="id" class="list-none py-3 px-0 border-t first:border-0 border-t-black/5 flex">
        <slot></slot>
    </li>
</template>

<script setup lang="ts">
defineProps({
    id: String,
})
</script>
