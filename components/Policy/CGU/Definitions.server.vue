<template>
    <PolicyCard :title="content.title">
        <div><span class="font-bold">{{ content.userTitle }}</span> :
            {{ content.userText }}
        </div>
        <div><span class="font-bold">{{ content.serviceTitle }}</span> :
            {{ content.serviceText }}
        </div>
        <div><span class="font-bold">{{ content.userContentTitle }}</span> :
            {{ content.userContentText }}
        </div>
        <div><span class="font-bold">{{ content.userAccountTitle }}</span> :
            {{ content.userAccountText }}
        </div>
        <div><span class="font-bold">{{ content.editorTitle }}</span> :
            {{ content.editorText }}
        </div>
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
