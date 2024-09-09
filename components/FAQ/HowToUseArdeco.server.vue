<template>
    <PolicyCard :title="content.howToUseArdecoTitle" id="how-to-use-ardeco" class="scroll-mt-14">
        <div id="howToUseArdecoText">{{ content.howToUseArdecoText }}</div>
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
