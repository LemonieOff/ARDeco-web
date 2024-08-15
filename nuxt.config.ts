// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', "@nuxt/image"],
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
            cssnano: {}
        },
    },
    image: {
        format: ['webp', 'png', 'jpg', 'gif'],
        domains: ['localhost', 'ardeco.app'],
        ipx: {
            maxAge: 60 * 60 * 24 * 365,
        }
    }
})
