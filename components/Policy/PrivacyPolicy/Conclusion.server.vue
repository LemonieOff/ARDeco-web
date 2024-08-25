<template>
    <PolicyCard :title="content.title">
        <div>{{ content.usage }}</div>
        <div>{{ content.share }}</div>
        <div>{{ content.userRights }}</div>
        <div>{{ content.keep }}</div>
        <div>{{ content.acceptance }}</div>
        <div>{{ content.questions }}</div>
        <div>{{ content.update }}</div>
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
