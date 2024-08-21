<template>
    <button :id="id" @click="finalFun"
            class="navbar-option text-AR-Beige h-full content-center px-4 hover:text-black hover:bg-AR-Beige"
            :class="[mobileHidden ? 'hidden sm:inline-block' : 'inline-block']">
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
    },
    mobileHidden: {
        type: Boolean,
        required: false,
        default: false,
        validator(value, props): boolean {
            if (value === true && props.mobileOnly === true) {
                console.error("This component can't be 'mobileHidden' and 'mobileOnly' at the same time")
                return false;
            }
            return true;
        }
    },
    mobileOnly: {
        type: Boolean,
        required: false,
        default: false
    }
});

const finalFun = props.fun as () => void; // Just to avoid IDEs generating errors on the button tag
</script>
