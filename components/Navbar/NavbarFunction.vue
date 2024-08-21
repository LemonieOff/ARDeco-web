<template>
    <button :id="id" @click="finalFun"
            class="navbar-option text-AR-Beige content-center hover:text-black hover:bg-AR-Beige"
            :class="[!mobileDisplay ? 'h-full px-4' : 'w-full py-4 last:rounded-br-2xl', mobileHidden ? 'hidden sm:inline-block' : (mobileOnly ? 'inline-block sm:hidden' : '')]">
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
    mobileDisplay: Boolean,
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
