<template>
    <PolicyCard :title="content.title">
        <div>{{ content.security }}</div>
        <div>{{ content.limitation }}</div>
        <div>{{ content.content }}</div>
        <div>{{ content.sanctions }}</div>
        <div>{{ content.responsibility }}</div>
        <div>{{ content.userResponsibility }}</div>
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
