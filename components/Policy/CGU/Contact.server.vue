<template>
    <PolicyCard :title="content.title">
        <div>{{ content.contact }}</div>
        <div>{{ content.email }}</div>
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
