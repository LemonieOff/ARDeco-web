<template>
    <PolicyCard :title="content.title">
        <div>{{ content.duration }}</div>
        <div>{{ content.cancellation }}</div>
        <div>{{ content.deletion }}</div>
        <div>{{ content.responsibility }}</div>
        <div>{{ content.application }}</div>
        <div>{{ content.responsibility2 }}</div>
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
