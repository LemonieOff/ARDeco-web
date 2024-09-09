<template>
    <PolicyCard :title="content.inAppPurchaseTitle" id="in-app-purchases" class="scroll-mt-14">
        <div id="inAppPurchaseText">{{ content.inAppPurchaseText }}</div>
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
