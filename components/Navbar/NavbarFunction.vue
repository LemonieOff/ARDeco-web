<template>
    <button :id="id" @click="finalFun"
            class="navbar-option inline-block text-AR-Beige h-full content-center px-4 hover:text-black hover:bg-AR-Beige">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    fun: {
        type: Function,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

const finalFun = props.fun as () => void; // Just to avoid IDEs generating errors on the button tag
</script>
