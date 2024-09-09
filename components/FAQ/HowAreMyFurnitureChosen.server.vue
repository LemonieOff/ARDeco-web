<template>
    <PolicyCard :title="content.furnitureChoiceTitle" id="how-are-furniture-chosen" class="scroll-mt-14">
        <div>{{ content.furnitureChoiceText }}</div>
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
