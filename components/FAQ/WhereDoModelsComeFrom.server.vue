<template>
    <PolicyCard :title="content.modelsOriginsTitle" id="where-are-models-from" class="scroll-mt-14">
        <div id="modelsOriginsText">{{ content.modelsOriginsText }}</div>
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
