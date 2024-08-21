<template xmlns="http://www.w3.org/1999/html">
    <div class="flex bg-port-brown flex-row border-AR-Grey border-t-4 pb-8">
        <div class="w-1/3 flex flex-col justify-around mx-auto ml-14">
            <h1 id="stayTuned" class="font-display font-black text-AR-Grey text-3xl mt-4 mb-5">
                {{ content.stayTuned }}</h1>
            <a class="font-display text-AR-Grey text-xl font-bold decoration-0 mb-2 hover:text-white"
               href="https://instagram.com/ardeco_officiel" target="_blank">@ardeco_officiel</a>
            <a class="font-display text-AR-Grey text-xl font-bold decoration-0 mb-2 hover:text-white"
               href="https://linkedin.com/company/ardeco-nice" target="_blank">ARdeco</a>
            <a class="font-display text-AR-Grey text-xl font-bold decoration-0 mb-0 hover:text-white"
               href="mailto:ardeco.officiel@gmail.com" target="_blank">ardeco.officiel@gmail.com</a>
        </div>
        <div class="w-1/3 flex flex-col justify-around ml-14">
            <h1 id="rules" class="font-display font-black text-AR-Grey text-3xl mt-1">{{ content.rules }}</h1>
            <a id="privacyPolicy" class="font-display text-AR-Grey text-xl font-bold decoration-0 hover:text-white"
               :href="`${langPrefix}privacy-policy`">{{ content.privacyPolicy }}</a>
            <a id="cgu" class="font-display text-AR-Grey text-xl font-bold decoration-0 hover:text-white"
               :href="`${langPrefix}cgu`">{{ content.cgu }}</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {
            content: this.$content.navBar,
            langPrefix: this.$langPrefix
        }
    }
}
</script>

<style scoped>

</style>
