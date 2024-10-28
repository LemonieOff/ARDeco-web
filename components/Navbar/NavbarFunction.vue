<template>
    <button
        :class="[!mobileDisplay ? 'h-full px-4' : 'w-full py-4 last:rounded-br-2xl inline-flex', mobileHidden ? 'hidden sm:inline-flex' : (mobileOnly ? 'inline-flex sm:hidden' : '')]"
        class="navbar-option text-AR-Beige items-center justify-center hover:text-black hover:bg-AR-Beige"
        @click="finalFun">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
const props = defineProps({
    fun: {
        type: Function,
        required: true
    },
    mobileDisplay: Boolean,
    mobileHidden: {
        type: Boolean,
        required: false,
        default: false,
        validator(value, props): boolean {
            if (value === true && props.mobileOnly === true) {
                console.error("This component can't be 'mobileHidden' and 'mobileOnly' at the same time");
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
