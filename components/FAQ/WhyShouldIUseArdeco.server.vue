<template>
    <PolicyCard :title="content.whyUseArdecoTitle" id="why-choose-ardeco" class="scroll-mt-14">
        <div id="whyUseArdecoText">{{ content.whyUseArdecoText }}</div>
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
