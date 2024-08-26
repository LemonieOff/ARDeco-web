<template>
    <div class="bg-port-brown dark:bg-[#544840] border-AR-Grey border-t-4 text-AR-Grey dark:text-[#DECDC3] font-bold flex flex-col sm:flex-row py-2.5">
        <div id="footer-socials" class="w-full">
            <div class="flex flex-col lg:flex-row justify-around items-center">
                <a href="https://instagram.com/ardeco_officiel" target="_blank" class="w-fit flex items-center hover:text-white">
                    <Icon name="uil:instagram" class="mr-1"/>
                    @ardeco_officiel
                </a>
                <a href="https://linkedin.com/company/ardeco-nice" target="_blank" class="w-fit flex items-center hover:text-white">
                    <Icon name="uil:linkedin" class="mr-1"/>
                    ARDeco
                </a>
                <a href="mailto:contact@ardeco.app" target="_blank" class="w-fit flex items-center hover:text-white">
                    <Icon name="uil:envelope" class="mr-1"/>
                    contact@ardeco.app
                </a>
            </div>
        </div>
        <div id="footer-policy" class="w-full my-auto">
            <div class="flex flex-col lg:flex-row justify-around items-center">
                <a :href="`${langPrefix}privacy-policy`" class="w-fit flex items-center hover:text-white">
                    <Icon name="uil:padlock" class="mr-1"/>
                    {{ content.privacyPolicy }}
                </a>
                <a :href="`${langPrefix}cgu`" class="w-fit flex items-center hover:text-white">
                    <Icon name="uil:file-check-alt" class="mr-1"/>
                    {{ content.cgu }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    content: {
        type: Object,
        required: true
    },
    langPrefix: {
        type: String,
        required: true
    }
});
</script>
