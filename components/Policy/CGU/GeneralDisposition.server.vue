<template>
    <PolicyCard :title="content.title">
        <div>{{ content.nullity }}</div>
        <div>{{ content.nonRenunciation }}</div>
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
