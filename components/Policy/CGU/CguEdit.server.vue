<template>
    <PolicyCard :title="content.title">
        <div>{{ content.modification }}</div>
        <div>{{ content.acceptance }}</div>
        <div>{{ content.application }}</div>
        <div>{{ content.opposition }}</div>
        <div>{{ content.previous }}</div>
        <div>{{ content.opposition2 }}</div>
    </PolicyCard>
</template>

<script setup lang="ts">
import PolicyCard from "@/components/Policy/PolicyCard.server.vue"

defineProps({
    content: {
        type: Object,
        required: true
    }
});
</script>
