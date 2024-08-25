<template>
    <PolicyCard :title="content.title">
        <div>{{ content.collection }}</div>
        <div>{{ content.dataTypeCart }}</div>
        <div>{{ content.dataTypeFavorites }}</div>
        <div>{{ content.dataTypeTickets }}</div>
        <div>{{ content.usage }}</div>
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
