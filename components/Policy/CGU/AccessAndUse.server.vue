<template>
    <PolicyCard :title="content.title">
        <div>{{ content.access }}</div>
        <div>{{ content.account }}</div>
        <div>{{ content.content }}</div>
        <div>{{ content.responsibility }}</div>
        <div>{{ content.moderation }}</div>
        <div>{{ content.data }}</div>
        <div>{{ content.availability }}</div>
        <div>{{ content.responsibility2 }}</div>
        <div>{{ content.cookies }}</div>
        <div>{{ content.proprietary }}</div>
        <div>{{ content.license }}</div>
        <div>{{ content.responsibility3 }}</div>
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
