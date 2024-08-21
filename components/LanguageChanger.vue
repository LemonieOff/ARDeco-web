<template>
    <button id="languageChanger" class="text-AR-Beige fixed right-12 bottom-12 rounded-lg bg-violet-900 min-w-36 min-h-8" @click="changeLanguage">{{ content }}</button>
</template>

<script>
export default {
    name: "LanguageChanger",
    data() {
        return {
            content: this.$content.languageChangerText
        }
    },
    methods: {
        changeLanguage() {
            if (this.$langPrefix !== "/") {
                if (this.$lang === "fr") {
                    location.href = location.href.replace(/\/fr\/?/, "/en/");
                } else if (this.$lang === "en") {
                    location.href = location.href.replace(/\/en\/?/, "/fr/");
                }
            } else {
                this.$changeLang("toggle");
                location.reload();
            }
        }
    },
};
</script>
