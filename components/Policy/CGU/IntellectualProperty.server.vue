<template>
    <PolicyCard :title="content.title">
        <div>{{ content.content }}</div>
        <div>{{ content.license }}</div>
        <div>{{ content.sanctions }}</div>
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
