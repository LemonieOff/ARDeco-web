<template>
    <PolicyCard :title="content.title">
        <div>{{ content.data }}</div>
        <div>{{ content.usage }}</div>
        <div>{{ content.duration }}</div>
        <div>{{ content.policy }}</div>
        <div>{{ content.opposition }}</div>
        <div>{{ content.deletion }}</div>
        <div>{{ content.responsibility }}</div>
        <div>{{ content.security }}</div>
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
